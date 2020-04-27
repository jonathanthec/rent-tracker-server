function owner(parent, args, context) {
    return context.prisma.property({ id: parent.id }).owner();
}

function contracts(parent, args, context) {
    return context.prisma.property({ id: parent.id }).contracts();
}

module.exports = {
    owner,
    contracts
}