const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function createUser(root, args, context, info) {
    const hashed = await bcrypt.hash(args.password, 12);
    const user = context.prisma.createUser({
        username: args.username,
        password: hashed,
        email: args.email,
        firstname: args.firstname,
        lastname: args.lastname,
        usertype: args.usertype
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    }
}

async function login(root, args, context, info) {
    const user = await context.prisma.user({ username: args.username });
    if (!user) {
        throw new Error("No such user!");
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error("Invalid password!");
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user
    }
}

async function createProperty(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to create property!')
    }
    return context.prisma.createProperty({
        address: args.address,
        city: args.city,
        state: args.state,
        zip: args.zip,
        owner: { connect: { id: userId } }
    })
}

async function editProperty(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to edit this property!');
    }
    return context.prisma.updateProperty({
        where: {
            id: args.id
        },
        data: {
            address: args.address,
            city: args.city,
            state: args.state,
            zip: args.zip
        }
    })
}

async function deleteProperty(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to delete this property!')
    }
    return context.prisma.deleteProperty({
        id: args.id
    })
}

async function createContract(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to create property!');
    }
    return context.prisma.createContract({
        tenant_name: args.tenant_name,
        tenant_phone: args.tenant_phone,
        tenant_email: args.tenant_email,
        starting_date: args.starting_date,
        ending_date: args.ending_date,
        pay_frequency: args.pay_frequency,
        pay_amount: args.pay_amount,
        property: { connect: { id: args.id } }
    })
}

async function editContract(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to edit contract!');
    }
    return context.prisma.updateContract({
        where: {
            id: args.id
        },
        data: {
            tenant_name: args.tenant_name,
            tenant_phone: args.tenant_phone,
            tenant_email: args.tenant_email,
            starting_date: args.starting_date,
            ending_date: args.ending_date,
            pay_frequency: args.pay_frequency,
            pay_amount: args.pay_amount,
        }
    })
}

async function deleteContract(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to delete this contract!')
    }
    return context.prisma.deleteContract({
        id: args.id
    })
}

async function createPayment(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to create payment!')
    }
    return context.prisma.createPayment({
        amount_due: args.amount_due,
        amount_paid: args.amount_paid,
        for_dates: args.for_dates,
        contract: { connect: { id: args.id } }
    })
}

async function editPayment(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to edit payment record!');
    }
    return context.prisma.updatePayment({
        where: {
            id: args.id
        },
        data: {
            amount_due: args.amount_due,
            amount_paid: args.amount_paid,
            for_dates: args.for_dates,
        }
    })
}

async function deletePayment(root, args, context) {
    const userId = await getUserId(context);
    if (!userId) {
        throw new Error('Not authorized to delete this payment record!')
    }
    return context.prisma.deletePayment({
        id: args.id
    })
}

module.exports = {
    createUser,
    login,
    createProperty,
    editProperty,
    deleteProperty,
    createContract,
    editContract,
    deleteContract,
    createPayment,
    editPayment,
    deletePayment
}