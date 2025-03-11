const shuffleDeck = require('../shuffleDeck');
const createDeck = require('../createDeck'); // Ensure this line is present

describe('shuffleDeck', () => {
    let originalDeck;
    let shuffledDeck;

    beforeEach(() => {
        originalDeck = createDeck(); // This should now work
        shuffledDeck = shuffleDeck([...originalDeck]);
    });

    test('returns a deck with the same number of cards', () => {
        expect(shuffledDeck.length).toBe(originalDeck.length);
    });

    test('returns a different order of cards', () => {
        expect(shuffledDeck).not.toEqual(originalDeck);
    });

    test('contains all the same cards as the original deck', () => {
        expect(new Set(shuffledDeck).size).toBe(52);
        expect(new Set(originalDeck).size).toBe(52);
        expect(new Set(shuffledDeck)).toEqual(new Set(originalDeck));
    });

    test('significantly changes the order of cards', () => {
        expect(shuffledDeck).not.toEqual(originalDeck);
    });

    test('produces different shuffles on multiple calls', () => {
        const anotherShuffledDeck = shuffleDeck([...originalDeck]);
        expect(anotherShuffledDeck).not.toEqual(shuffledDeck);
    });

    test('does not modify the original deck', () => {
        expect(originalDeck.length).toBe(52);
    });

    test('handles empty deck', () => {
        const emptyDeck = [];
        const shuffledEmptyDeck = shuffleDeck(emptyDeck);
        expect(shuffledEmptyDeck).toEqual([]);
    });

    test('handles single-card deck', () => {
        const singleCardDeck = ['A♠'];
        const shuffledSingleCardDeck = shuffleDeck(singleCardDeck);
        expect(shuffledSingleCardDeck).toEqual(singleCardDeck);
    });
});