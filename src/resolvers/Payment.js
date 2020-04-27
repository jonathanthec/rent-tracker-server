function contract(parent, args, context) {
    return context.prisma.payment({ id: parent.id }).contract();
}

module.exports = {
    contract
}