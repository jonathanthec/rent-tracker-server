const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
require('dotenv').config();
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Property = require('./resolvers/Property');

const resolvers = {
    Query,
    Mutation,
    User,
    Property
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))