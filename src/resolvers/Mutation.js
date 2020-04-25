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

module.exports = {
    createUser,
    login
}