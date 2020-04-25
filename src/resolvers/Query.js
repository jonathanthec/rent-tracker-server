function getProperties(root, args, context, info) {
    const properties = context.prisma.properties();
    return {
        properties
    }
}

module.exports = {
    getProperties
}