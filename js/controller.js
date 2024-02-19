/** listener to events: */
document.addEventListener('DOMContentLoaded', function() {

    /** fades in and fades out the divs:
     * @param  element - a div by id
     */
    function fadeOut(el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .05) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };
    function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .05) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

    let playersList = [];
    let playersNames = [];
    let steps = 0;
    let openedCards = [];
    let click_allowed = true;

    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault();
        let player = {
            name: document.getElementById("name").value.trim(),
            rows: document.getElementById("rows_game").value.trim(),
            cols: document.getElementById("cols_game").value.trim(),
            delay: document.getElementById("delay_game").value.trim(),
            score: 0
        }
        fadeOut(document.getElementById("form"));
        fadeIn(document.getElementById("steps"));
        fadeIn(document.getElementById("board game"));
        addPlayer(player);
        play(player);
    });

    document.getElementById("highScores").addEventListener("click", function () {
        document.getElementById("mod_table").innerHTML = getStrLeaderboard();
    });
    document.getElementById("settings").addEventListener("click", function () {
        document.getElementById("settingsSelected").classList.toggle("d-none");
    });
    document.getElementById("rows_game").addEventListener("change", function () {
        validateRowsCols("rows")}, false);
    document.getElementById("cols_game").addEventListener("change", function () {
        validateRowsCols("cols")}, false);

    /** adds a player to the list of players:
     * @param player a player
     */
    function addPlayer(player) {
        let player_name = player.name.toLowerCase();
        if (!playersNames.includes(player_name)) {
            playersList.push(player);
            playersNames.push(player_name);
        }
    }

    /** Validates rows and cols of the board:
     * @param elementbyid an id of the div that has changed
     * @returns {boolean} true - if the rows*cols is an even number false - else
     */
    function validateRowsCols(changed) {
        let rows = document.getElementById("rows_game").value;
        let cols = document.getElementById("cols_game").value;
        let submit_btn = document.getElementById("submit");
        let error_message = (changed === "rows") ? document.getElementById("error message_1"):
            document.getElementById("error message_2");
        let other_message = (changed !== "rows") ? document.getElementById("error message_1"):
            document.getElementById("error message_2");
        other_message.innerHTML = "";
        error_message.innerHTML = "";
        if (rows * cols % 2 !== 0) {
            error_message.innerHTML +=
                '<p class="text-danger">Number of cards (rows X columns) must be <br> ' +
                'even please correct your choise</p>';
            submit_btn.disabled = true;
            return false;
        }
        submit_btn.disabled = false;
        return true;
    }

    /** controller of the game, prints the board game:
     * @param player object player
     */
    function play(player) {
        steps = 0;
        document.getElementById("steps").innerHTML = '<p id="counter">Steps: ' + steps + '</p>';
        let board_game_innerHtml = document.getElementById("board game");
        let board = new Board(player.rows, player.cols);
        board_game_innerHtml.innerHTML = board.drawBoard();
        let images_arr = document.getElementsByClassName("img-thumbnail");

        for(let i = 0; i < images_arr.length; i++) {
            images_arr[i].addEventListener("mouseover", function () {
                images_arr[i].setAttribute('style',"border:5px outset silver;")
            });
            images_arr[i].addEventListener("mouseout", function () {
                images_arr[i].setAttribute('style',"border:0px")
            });

            images_arr[i].addEventListener("click", function () {
                if (board.isCardHidden(i) && click_allowed) {
                    board.flipCard(i);
                    images_arr[i].setAttribute('src', board.getCurrImgStr(i));
                    steps++;
                    document.getElementById("steps").innerHTML = '<p id="counter">Steps: ' + steps + '</p>';
                    openedCards.push(i);

                    if (steps % 2 === 0) {
                        click_allowed = false;
                        setTimeout(function () {
                            if (!(board.cardsFound(openedCards))) {
                                for (let j = 0; j < openedCards.length; j++) {
                                    board.flipCard(openedCards[j]);
                                    images_arr[openedCards[j]].setAttribute('src', board.getCurrImgStr(openedCards[j]));
                                }
                            }
                            openedCards = [];
                            click_allowed = true;
                        }, player.delay * 1000)
                    }
                    if(board.checkFoundAll()) {
                        winMessage(player);
                    }
                }
            });
        }
        document.getElementById("abandon").addEventListener("click", function () {
            fadeOut(document.getElementById("steps"));
            fadeOut(document.getElementById("board game"));
            fadeIn(document.getElementById("form"));

            //if the player clicks abandon, then delete the player if he doesnt have any score
            playersList = playersList.filter(p_name => (p_name.name.toLowerCase() === player.name.toLowerCase() && player.score === 0));
            playersNames = playersNames.filter(p_name => (p_name.toLowerCase() === player.name.toLowerCase() && player.score === 0));
        });
    }

    /** prints the win message, prints the highscores, calculates the score:
     * @param player object player
     */
    function winMessage(player) {
        let str = "";
        player.score = Math.max(5, 30 + (player.rows*player.cols/2) + (player.rows*player.cols - steps) - 2*player.delay);
        for(let i=0; i < playersList.length; i++) {
            if(playersList[i].name.toLowerCase() === player.name.toLowerCase()) {
                playersList[i].score = Math.max(playersList[i].score, player.score);
            }
        }
        playersList.sort((a, b) => (a.score < b.score) ? 1 : -1);
        fadeOut(document.getElementById("steps"));
        fadeOut(document.getElementById("board game"));
        str = "<h3>Game Over!</h3>" +
            "<p>Number of cards played: " + player.rows*player.cols + "</p>" +
            "<p>Score: " + player.score + " ";

        let i;
        for(i = 0; i < playersList.length; i++) {
            if(player.name === playersList[i].name) {
                break;
            }
        }
        i++;
        if(i <= 3) {
            str += "You are ranked: "+ i + " out of: " + playersList.length + "</p>";
        }
        else {
            str += "Your rank is too low, please play again</p>";
        }
        str += getStrLeaderboard();
        str+="<button type=\"button\" id=\"ok\" class=\"btn btn-primary\">Ok</button>";
        fadeIn(document.getElementById("win"));
        document.getElementById("win").innerHTML = str;

        document.getElementById("ok").addEventListener("click",function () {
            fadeIn(document.getElementById("form"));
            fadeOut(document.getElementById("win"));

        })
    }
    /** return table of highscors as string html:
     * @returns {string} string table of highscors as string html
     */
    function getStrLeaderboard() {
        let str = "";
        str += " <table class=\"table table-striped\">\n" +
            "<thead>\n" +
            "<tr>\n" +
            "<th class=\"col-2\">Rank</th>\n" +
            "<th class=\"col-2\">Player</th>\n" +
            "<th class=\"col-2\">Score</th>\n" +
            "</tr>\n" +
            "<tbody>";
        for(let i=0; i < playersList.length; i++) {
            let rank = i+1;
            str +=
                "    <tr>\n" +
                "      <td>" + rank + "</td>\n" +
                "      <td>" + playersList[i].name + "</td>\n" +
                "      <td>" + playersList[i].score + "</td>\n" +
                "    </tr>";
        }
        str+="</tbody>\n" +
            "</thead>\n" +
             "</table>";
        return str;
    }
});
