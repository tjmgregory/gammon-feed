const { buildFederatedSchema } = require('@apollo/federation')
const { gql, ApolloServer } = require('apollo-server')

const PORT = 4001

const typeDefs = gql`
    type Sea @key(fields: "id") {
        id: ID!
        name: String
        volume: Int
        containedFish: [Fish]
    }

    extend type Fish @key(fields: "id") {
        id: ID! @external
    }

    extend type Query {
        sea(id: ID!): Sea
        seas: [Sea]
    }
`

const seas = [
    {
        id: '1',
        name: 'Atlantic',
        volume: 24948,
        containedFish: [],
    },
    {
        id: '2',
        name: 'Pacific',
        volume: 88888,
        containedFish: ['1', '2'],
    },
]

const resolvers = {
    Sea: {
        __resolveReference: (ref) => seas.find((sea) => sea.id === ref.id),
        containedFish: (sea) =>
            sea.containedFish.map((fish) => ({
                __typename: 'Fish',
                id: fish,
            })),
    },
    Query: {
        sea: (_, { id }) => seas.find((sea) => sea.id === id),
        seas: () => seas,
    },
}

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🌊 Seas be sailing at ${url}`)
})
