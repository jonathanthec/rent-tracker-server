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

async function getContracts(root, args, context, info) {
    const userId = getUserId(context);
    if (!userId) {
        throw new Error('You are not authorized to access these contracts!');
    }
    const contracts = await context.prisma.contracts(
        {
            where: {
                property: {
                    id: args.id
                }
            }
        }
    );
    return contracts;
}

async function getOneContract(root, args, context) {
    const userId = getUserId(context);
    if (!userId) {
        throw new Error('You are not authorized to access this contract!');
    }
    const contract = await context.prisma.contract({
        id: args.id
    })
    return contract;
}

async function getPayments(root, args, context, info) {
    const userId = getUserId(context);
    if (!userId) {
        throw new Error('You are not authorized to access these payment records!');
    }
    const payments = await context.prisma.payments(
        {
            where: {
                contract: {
                    id: args.id
                }
            }
        }
    );
    return payments;
}

async function getOnePayment(root, args, context) {
    const userId = getUserId(context);
    if (!userId) {
        throw new Error('You are not authorized to access this payment record!');
    }
    const payment = await context.prisma.payment({
        id: args.id
    })
    return payment;
}

module.exports = {
    info,
    getProperties,
    getOneProperty,
    getContracts,
    getOneContract,
    getPayments,
    getOnePayment
}