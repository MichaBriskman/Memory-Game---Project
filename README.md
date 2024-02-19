# ex4 dom neviim

# Authors: Micha_Briskman Shlomo_Gulayev


In this exercise we made a memory game.
We made a class of card, and a class of Board that contains the cards.
The program prints the scores of the players.
The score is calculated by this formula:
player.score = Math.max(5, 30 + (player.rows*player.cols/2) + (player.rows*player.cols - steps) - 2*player.delay);
The cards of the board are shuffled with the Fisher–Yates algorithm 