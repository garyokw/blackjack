const dealHand = require('../dealHand');
const createDeck = require('../createDeck');

describe('dealHand', () => {
    test('should deal the correct number of cards', () => {
        const deck = createDeck();
        const hand = dealHand(deck, 2);
        expect(hand.length).toBe(2); // Should deal 2 cards
        expect(deck.length).toBe(50); // Deck should have 50 cards left
    });

    test('should deal unique cards', () => {
        const deck = createDeck();
        const hand = dealHand(deck, 3);
        expect(new Set(hand).size).toBe(3); // All dealt cards should be unique
    });

    test('should throw an error for invalid number of cards', () => {
        const deck = createDeck();
        expect(() => dealHand(deck, 0)).toThrow('Invalid number of cards to deal');
        expect(() => dealHand(deck, 53)).toThrow('Invalid number of cards to deal');
    });

    test('should not modify the deck if an error is thrown', () => {
        const deck = createDeck();
        const originalDeck = [...deck];
        expect(() => dealHand(deck, 53)).toThrow();
        expect(deck).toEqual(originalDeck); // Deck should remain unchanged
    });
});