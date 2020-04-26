function properties(parent, args, context) {
    return context.prisma.user({ id: parent.id }).properties();
}

module.exports = {
    properties
}