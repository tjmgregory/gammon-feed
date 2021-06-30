const { gql, ApolloServer } = require('apollo-server')

const PORT = 4002

const typeDefs = gql`
    type Fish {
        name: String
        colour: String
    }

    type Query {
        fish: [Fish]
    }
`

const fish = [
    {
        name: 'Shark',
        colour: 'Grey',
    },
    {
        name: 'Baracuda',
        // Almost certainly wrong, but I'm not researching fish colours for the sake of some data
        colour: 'Yellow',
    },
]

const resolvers = {
    Query: {
        fish: () => fish,
    },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🐠 Fishes officially swimming at ${url}.`)
})
