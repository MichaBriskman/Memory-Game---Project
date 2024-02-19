# Memory game

# Authors: Micha_Briskman
</br>
</br>

In this exercise we made a memory game.</br>
There is a class Board that contains the class cards.</br>
The program prints the scores of the players.</br>
The score is calculated by this formula:</br>
player.score = Math.max(5, 30 + (player.rows*player.cols/2) + (player.rows*player.cols - steps) - 2*player.delay); /<br>
The cards of the board are shuffled with the Fisher–Yates algorithm 
