const { gql, ApolloServer } = require('apollo-server')

const PORT = 4001

const typeDefs = gql`
    type Sea {
        name: String
        volume: Int
    }

    type Query {
        seas: [Sea]
    }
`

const seas = [
    {
        name: 'Atlantic',
        volume: 24948,
    },
    {
        name: 'Pacific',
        volume: 88888,
    },
]

const resolvers = {
    Query: {
        seas: () => seas,
    },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🌊 Seas be sailing at ${url}`)
})
