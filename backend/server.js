const { ApolloServer, gql } = require('apollo-server')

const plants = [
  {
    name: 'Plant 1',
    description: 'Description 1',
    image: 'Image 1',
  },
  {
    name: 'Plant 2',
    description: 'Description 2',
    image: 'Image 2',
  },
]

const typeDefs = gql`
  type Plant {
    name: String
    description: String
    image: String
  }

  type Query {
    plants: [Plant]
  }
`

const resolvers = {
  Query: {
    plants: () => plants,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

