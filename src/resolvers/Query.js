const { getUserId } = require('../utils');

function info() {
    return 'Welcome to this API'
}

async function getProperties(root, args, context, info) {
    const userId = getUserId(context);
    if (!userId) {
        throw new Error('You are not authorized to access these properties.');
    }
    const properties = await context.prisma.properties(
        {
            where: {
                owner: {
                    id: userId
                }
            }
        }
    );
    return properties;
}

async function getOneProperty(root, args, context) {
    const userId = getUserId(context);
    if (!userId) {
        throw new Error('You are not authorized to access this property.');
    }
    const property = await context.prisma.property({
        id: args.id
    })
    return property;
}

module.exports = {
    info,
    getProperties,
    getOneProperty
}