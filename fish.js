const { gql, ApolloServer } = require('apollo-server')

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

const server = new ApolloServer({ typeDefs, resolvers, cors: { origin: '*' } })

server.listen().then(({ url }) => {
    console.log(`🐠 Fishes officially swimming at ${url}.`)
})
