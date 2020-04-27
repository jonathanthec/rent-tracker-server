function property(parent, args, context) {
    return context.prisma.contract({ id: parent.id }).property();
}

function payments(parent, args, context) {
    return context.prisma.contract({ id: parent.id }).payments();
}

module.exports = {
    property,
    payments
}