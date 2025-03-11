const createDeck = require('./createDeck');
const shuffleDeck = require('./shuffleDeck');
const dealHand = require('./dealHand');
const readline = require('readline');

function computePoints(hand) {
    let points = 0;
    let aces = 0;

    for (let card of hand) {
        const value = card.slice(0, -1); // Get the card value (remove suit)
        if (value === 'A') {
            aces++;
            points += 11; // Initially count Ace as 11
        } else if (['K', 'Q', 'J'].includes(value)) {
            points += 10; // Face cards are worth 10
        } else {
            points += parseInt(value); // Number cards are worth their value
        }
    }

    // Adjust for Aces if points exceed 21
    while (points > 21 && aces > 0) {
        points -= 10; // Count Ace as 1 instead of 11
        aces--;
    }

    return points;
}

function playBlackjack() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let deck = createDeck();
    deck = shuffleDeck(deck);

    // Deal initial hands
    const playerHand = dealHand(deck, 2);
    const dealerHand = dealHand(deck, 2);

    console.log('Your hand:', playerHand);
    console.log('Dealer\'s hand:', dealerHand[0], 'and one hidden card');

    let playerPoints = computePoints(playerHand);
    let dealerPoints = computePoints(dealerHand);

    // Player's turn
    function playerTurn() {
        rl.question('Do you want to hit or stand? (h/s) ', (action) => {
            if (action.toLowerCase() === 'h') {
                const newCard = dealHand(deck, 1);
                playerHand.push(...newCard);
                playerPoints = computePoints(playerHand);
                console.log('Your hand:', playerHand);
                if (playerPoints < 21) {
                    playerTurn(); // Continue player's turn
                } else {
                    endGame();
                }
            } else if (action.toLowerCase() === 's') {
                endGame(); // End player's turn
            } else {
                console.log('Invalid input. Please enter "h" or "s".');
                playerTurn(); // Ask again
            }
        });
    }

    // Dealer's turn and game end logic
    function endGame() {
        console.log('Dealer\'s hand:', dealerHand);
        while (dealerPoints < 17) {
            const newCard = dealHand(deck, 1);
            dealerHand.push(...newCard);
            dealerPoints = computePoints(dealerHand);
            console.log('Dealer\'s hand:', dealerHand);
        }

        // Determine the winner
        console.log('Your points:', playerPoints);
        console.log('Dealer\'s points:', dealerPoints);

        if (playerPoints > 21) {
            console.log('You bust! Dealer wins.');
        } else if (dealerPoints > 21) {
            console.log('Dealer busts! You win!');
        } else if (playerPoints > dealerPoints) {
            console.log('You win!');
        } else if (playerPoints < dealerPoints) {
            console.log('Dealer wins.');
        } else {
            console.log('It\'s a tie!');
        }
        rl.close(); // Close the readline interface
    }

    playerTurn(); // Start the player's turn
}

module.exports = {
    computePoints,
    playBlackjack,
};