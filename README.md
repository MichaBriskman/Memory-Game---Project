# Memory game

# Authors: Micha_Briskman

In this exercise we made a memory game.</br>
First you need to register, there is also an option of choosing the size of the board: </br>
</br>
![](images/registration.png)
</br>
There is a class Board that contains the class cards.</br>
</br>
![](images/theGame.png)
</br>
The program prints the scores of the players.</br>
The score is calculated by this formula:</br>
player.score = Math.max(5, 30 + (player.rows*player.cols/2) + (player.rows*player.cols - steps) - 2*player.delay); /<br>
The cards of the board are shuffled with the Fisher–Yates algorithm 
</br>
![](images/ranks.png)

