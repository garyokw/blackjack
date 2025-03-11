const createDeck = require('../createDeck');

describe('createDeck', () => {
    test('should create a deck of 52 unique cards', () => {
        const deck = createDeck();
        expect(deck.length).toBe(52); // Total cards
        expect(new Set(deck).size).toBe(52); // All cards should be unique
    });

    test('should contain all card values and suits', () => {
        const deck = createDeck();
        const suits = ['♠', '♣', '♦', '♥'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        suits.forEach(suit => {
            values.forEach(value => {
                expect(deck).toContain(`${value}${suit}`); // Check for each card
            });
        });
    });

    test('should not contain any invalid cards', () => {
        const deck = createDeck();
        expect(deck).not.toContain('X♠'); // Invalid card
        expect(deck).not.toContain('11♣'); // Invalid card
    });
});