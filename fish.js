const { buildFederatedSchema } = require('@apollo/federation')
const { gql, ApolloServer } = require('apollo-server')

const PORT = 4002

const typeDefs = gql`
    type Fish {
        id: ID!
        name: String
        colour: String
        sea: Sea
    }

    extend type Sea @key(fields: "id") {
        id: ID! @external
    }

    extend type Query {
        fish(id: ID!): Fish
        # It pains me to have to pluralise fish, but alas fishies is cutey
        fishies: [Fish]
    }
`

const fish = [
    {
        id: '1',
        name: 'Shark',
        colour: 'Grey',
        sea: '2',
    },
    {
        id: '2',
        name: 'Baracuda',
        // Almost certainly wrong, but I'm not researching fish colours for the sake of some data
        colour: 'Yellow',
        sea: '2',
    },
]

const resolvers = {
    Fish: {
        sea: (fish) => ({ __typename: 'Sea', id: fish.sea }),
    },
    Query: {
        fish: (_, { id }) => fish.find((fish) => fish.id === id),
        fishies: () => fish,
    },
}

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🐠 O-fish-ally swimming at ${url}.`)
})
