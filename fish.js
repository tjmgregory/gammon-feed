const { buildFederatedSchema } = require('@apollo/federation')
const { gql, ApolloServer } = require('apollo-server')

const PORT = 4002

const typeDefs = gql`
    type Fish @key(fields: "id") {
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

const fishies = [
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
        __resolveReference: (ref) => fishies.find((fish) => fish.id === ref.id),
        sea: (fish) => ({ __typename: 'Sea', id: fish.sea }),
    },
    Query: {
        fish: (_, { id }) => fishies.find((fish) => fish.id === id),
        fishies: () => fishies,
    },
}

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🐠 O-fish-ally swimming at ${url}.`)
})
