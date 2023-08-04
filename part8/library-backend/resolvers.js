const { PubSub } = require('graphql-subscriptions')

const { GraphQLError, GraphQLObjectType } = require('graphql')

const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      if (Object.keys(args).length === 0) {
        return await Book.find({}).populate('author')
      }

      const filters = {}
      if (args.genre) filters.genres = args.genre

      try {
        const books = await Book.find(filters).populate('author')
        return books
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
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    userRecommended: async (root, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError('not authenticated.')
      const userFavGenre = context.currentUser.favouriteGenre
      const books = await Book.find({ genres: userFavGenre }).populate('author')
      return books
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new GraphQLError('Not authenticated.')

      const author = await Author.findOne({ name: args.author })

      try {
        const savedAuthor = author
          ? author
          : await new Author({ name: args.author }).save()

        const book = new Book({ ...args, author: savedAuthor.id })
        const savedBook = await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
}
module.exports = resolvers
