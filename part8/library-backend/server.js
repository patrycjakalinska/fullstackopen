require('./db/mongoose')
const jwt = require('jsonwebtoken')

const { ApolloServer, AuthenticationError } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]
    id: ID!
  }
  type Token {
    value: String!
  }
  type User {
    username: String!,
    favouriteGenre: String!,
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres:[String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      console.log(context)
      if (Object.keys(args).length === 0) {
        return await Book.find({}).populate('author')
      }

      const filters = {}
      if (args.genre) filters.genres = args.genre

      try {
        return Book.find(filters)
      } catch (err) {
        throw new GraphQLError('Error fetching all books.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.genre,
            err,
          },
        })
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not authenticated.')

      const author = await Author.findOne({ name: args.author })

      try {
        const savedAuthor = author
          ? author
          : await new Author({ name: args.author }).save()

        const book = new Book({ ...args, author: savedAuthor.id })
        const savedBook = await book.save()
        return savedBook
      } catch (err) {
        throw new GraphQLError('Saving book failed.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            err,
          },
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not authenticated.')
      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      try {
        author.born = args.setBornTo
        const savedAuthor = await author.save()
        return savedAuthor
      } catch (err) {
        throw new GraphQLError('Failed to edit author.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            err,
          },
        })
      }
    },
    createUser: async (root, { username, favouriteGenre }) => {
      const user = await new User({
        username,
        favouriteGenre,
      })

      try {
        const savedUser = await user.save()
        return savedUser
      } catch (err) {
        throw new GraphQLError('Failed to create user.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            err,
          },
        })
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password != 'secret') {
        throw new GraphQLError('Wrong credentials.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.password,
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
