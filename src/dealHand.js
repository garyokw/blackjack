function dealHand(deck, n) {
    if (n <= 0 || n > deck.length) {
        throw new Error('Invalid number of cards to deal');
    }
    return deck.splice(0, n);
}

module.exports = dealHand;