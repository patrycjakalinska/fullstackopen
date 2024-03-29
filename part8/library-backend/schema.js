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
    userRecommended: [Book!]!
    me: User
  }
  type Subscription {
    bookAdded: Book!
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
module.exports = typeDefs
