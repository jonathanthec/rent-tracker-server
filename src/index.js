const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        feed: (root, args, context, info) => {
            return context.prisma.properties();
        },
    },
    Mutation: {
        createProperty: (root, args, context) => {
            return context.prisma.createProperty({
                address: args.address,
            })
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))