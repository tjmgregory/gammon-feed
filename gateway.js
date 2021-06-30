const { ApolloGateway } = require('@apollo/gateway')
const { ApolloServer } = require('apollo-server')

const PORT = 4000

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'seas', url: 'http://localhost:4001' },
        { name: 'fish', url: 'http://localhost:4002' },
    ],
})

const server = new ApolloServer({
    gateway,
    subscriptions: false,
})

server.listen({ port }).then(({ url }) => {
    console.log(`Gateway ready at ${url}`)
})
