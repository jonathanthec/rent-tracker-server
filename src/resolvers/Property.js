function owner(parent, args, context) {
    return context.prisma.property({ id: parent.id }).owner();
}

module.exports = {
    owner
}