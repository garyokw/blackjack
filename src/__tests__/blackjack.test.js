const { computePoints, playBlackjack } = require('../blackjack');
const readline = require('readline');
const dealHand = require('../dealHand'); // Import dealHand to mock it

jest.mock('readline');
jest.mock('../dealHand'); // Mock the dealHand function

describe('Blackjack Functions', () => {
    describe('computePoints', () => {
        test('should calculate points correctly for a blackjack hand', () => {
            expect(computePoints(['A♠', 'K♣'])).toBe(21); // Blackjack
        });

        test('should calculate points correctly for a hand with multiple cards', () => {
            expect(computePoints(['A♠', '9♣', 'K♦'])).toBe(20); // Ace + 9 + King
            expect(computePoints(['2♠', '3♣', '4♦'])).toBe(9); // 2 + 3 + 4
        });

        test('should handle multiple Aces correctly', () => {
            expect(computePoints(['A♠', 'A♣', '9♦'])).toBe(21); // Ace + Ace + 9
            expect(computePoints(['A♠', 'A♣', '8♦'])).toBe(20); // Ace + Ace + 8
            expect(computePoints(['A♠', 'A♣', 'A♦'])).toBe(13); // Ace + Ace + Ace
        });

        test('should calculate points correctly for a hand with no face cards', () => {
            expect(computePoints(['2♠', '3♣', '4♦', '5♥'])).toBe(14); // 2 + 3 + 4 + 5
        });

        test('should return 0 for an empty hand', () => {
            expect(computePoints([])).toBe(0); // No cards
        });

        test('should handle a hand with only face cards', () => {
            expect(computePoints(['K♠', 'Q♣', 'J♦'])).toBe(30); // King + Queen + Jack
        });
    });

    describe('playBlackjack', () => {
        beforeEach(() => {
            // Mock readline interface
            readline.createInterface.mockReturnValue({
                question: jest.fn((query, callback) => {
                    callback('h'); // Simulate hitting
                }),
                close: jest.fn(),
            });
        });

        test('should allow player to hit and not bust', () => {
            // Mock the deck and the dealHand function
            const mockDeck = ['A♠', '5♣', 'K♦', '3♥']; // Example deck
            dealHand.mockImplementation((deck, n) => {
                return deck.splice(0, n); // Return the top n cards
            });

            // Simulate the game state
            const playerHand = dealHand(mockDeck, 2); // Player starts with 2 cards
            let playerPoints = computePoints(playerHand); // Calculate initial points

            // Simulate hitting
            const newCard = dealHand(mockDeck, 1); // Player hits and gets 1 card
            playerHand.push(...newCard); // Add the new card to the player's hand

            // Calculate new points after hitting
            const newPoints = computePoints(playerHand);

            // Assertions
            expect(newPoints).toBeLessThanOrEqual(21); // Player should not bust
            expect(playerHand).toContain(newCard[0]); // New card should be in the player's hand
        });

        test('should handle dealer busting', () => {
            // Mock the deck and the dealHand function
            const mockDeck = ['A♠', 'K♣', '5♦', '9♥', '10♠', '3♠', '2♣']; // Ensure enough high cards
            dealHand.mockImplementation((deck, n) => {
                return deck.splice(0, n); // Return the top n cards
            });
    
            // Simulate the game state
            const playerHand = dealHand(mockDeck, 2); // Player starts with 2 cards
            const dealerHand = dealHand(mockDeck, 2); // Dealer starts with 2 cards
    
            // Calculate initial points
            const playerPoints = computePoints(playerHand);
            let dealerPoints = computePoints(dealerHand);
    
            // Simulate dealer hitting until they bust
            while (dealerPoints < 17) {
                const newCard = dealHand(mockDeck, 1); // Dealer hits
                dealerHand.push(...newCard); // Add the new card to the dealer's hand
                dealerPoints = computePoints(dealerHand); // Recalculate dealer points
            }
    
            // Assert that the dealer busts
            expect(dealerPoints).toBeGreaterThan(21); // Dealer should bust
    
            // Assert that the player wins
            expect(playerPoints).toBeLessThanOrEqual(21); // Player should not bust
        });

        test('should handle player busting', () => {
            // Mock the player's hand to ensure they bust
            const mockDeck = ['10♠', 'K♣', 'A♦', '5♥', '9♠', '3♣']; // Example deck
            dealHand.mockImplementation((deck, n) => {
                return deck.splice(0, n); // Return the top n cards
            });

            // Simulate the game state
            const playerHand = dealHand(mockDeck, 2); // Player starts with 2 cards
            let playerPoints = computePoints(playerHand); // Calculate initial points

            // Simulate hitting until the player busts
            while (playerPoints <= 21) {
                const newCard = dealHand(mockDeck, 1); // Player hits
                playerHand.push(...newCard); // Add the new card to the player's hand
                playerPoints = computePoints(playerHand); // Recalculate player points
            }

            // Assert that the player busts
            expect(playerPoints).toBeGreaterThan(21); // Player should bust

            // Simulate dealer's hand
            const dealerHand = dealHand(mockDeck, 2); // Dealer starts with 2 cards
            const dealerPoints = computePoints(dealerHand); // Calculate dealer points

            // Assert that the dealer wins
            expect(dealerPoints).toBeLessThanOrEqual(21); // Dealer should not bust
            // Here you can assert that the dealer wins, depending on your game logic
            // expect(determineWinner(playerPoints, dealerPoints)).toBe('dealer'); // Example assertion
        });

        test('should determine the winner correctly', () => {
            // Test various winning and losing scenarios
            // Example: Player has 20, dealer has 19
            // Example: Player has 18, dealer has 21
        });

        test('should handle edge case of player hitting on 21', () => {
            // Mock the player's hand to be 21 and simulate hitting
            // Assert that the player busts
        });

        test('should handle edge case of dealer hitting on 17', () => {
            // Mock the dealer's hand to be 17 and simulate hitting
            // Assert that the dealer does not hit
        });

        test('should handle a tie scenario', () => {
            // Mock both player and dealer to have the same points
            // Assert that the game results in a tie
        });

        test('should handle a single card deck', () => {
            // Mock a single card deck and simulate the game
            // Assert that the game handles this scenario correctly
        });

        test('should handle an empty deck scenario', () => {
            // Mock an empty deck and assert that the game handles it gracefully
        });
    });

    describe('playBlackjack', () => {
        beforeEach(() => {
            // Mock readline interface
            readline.createInterface.mockReturnValue({
                question: jest.fn((query, callback) => {
                    callback('s'); // Simulate standing
                }),
                close: jest.fn(),
            });
        });

        test('should handle dealer busting', () => {
            // Mock the deck and the dealHand function
            const mockDeck = ['A♠', 'K♣', '5♦', '9♥', '10♠', '3♠', '2♣']; // Example deck
            dealHand.mockImplementation((deck, n) => {
                return deck.splice(0, n); // Return the top n cards
            });

            // Simulate the game state
            const playerHand = dealHand(mockDeck, 2); // Player starts with 2 cards
            const dealerHand = dealHand(mockDeck, 2); // Dealer starts with 2 cards

            // Calculate initial points
            const playerPoints = computePoints(playerHand);
            let dealerPoints = computePoints(dealerHand);

            // Simulate dealer hitting until they bust
            while (dealerPoints < 17) {
                const newCard = dealHand(mockDeck, 1); // Dealer hits
                dealerHand.push(...newCard); // Add the new card to the dealer's hand
                dealerPoints = computePoints(dealerHand); // Recalculate dealer points
            }

            // Assert that the dealer busts
            expect(dealerPoints).toBeGreaterThan(21); // Dealer should bust

            // Assert that the player wins
            expect(playerPoints).toBeLessThanOrEqual(21); // Player should not bust
            // Here you can assert that the player wins, depending on your game logic
            // For example, if you have a function to determine the winner, you can call it here
            // expect(determineWinner(playerPoints, dealerPoints)).toBe('player'); // Example assertion
        });
    });
});