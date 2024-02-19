class Board {
    rows;
    cols;
    #cards =[]

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        //builds the board
        for(let i = 0; i < rows * cols / 2; i++) {
            this.#cards.push(new Card(i));
            this.#cards.push(new Card(i));
        }
        this.shuffleBoard();
    }

    shuffleBoard() {
        for(let i=0; i < this.#cards.length ; i++) {
            let j = Math.floor(Math.random() * i);
            [this.#cards[j], this.#cards[i]] = [this.#cards[i], this.#cards[j]];
        }
    }

    drawBoard() {
        let board_game = "";
        for(let i = 0; i <this.rows; i++) {
            board_game += "<div class=\"row\">";
            for(let j = 0; j<this.cols; j++) {
                board_game +=
                 "<div class=\"col-2\">" +
                "<img src=\"" + this.#cards[(i * this.cols)+j].curr_img_str + "\" class=\"img-thumbnail\" >" +
                "</div>";
            }
            board_game +="</div>";
        }
        board_game+= "<br>" +
            "<div class=\"row\">" +
                "<div class=\"col-4\">" +
                    "<button type=\"button\" id=\"abandon\" class=\"btn btn-primary\">Abandon</button>" +
                "</div>" +
            "</div>";
        return board_game;
    }

    flipCard(index) {
        this.#cards[index].flipCard();
    }

    getCurrImgStr(index) {
        return this.#cards[index].curr_img_str;
    }

    isCardHidden(index) {
        return this.#cards[index].is_hidden;
    }

    checkFoundAll() {
        for(let i = 0; i < this.#cards.length; i++) {
            if(this.#cards[i].is_hidden) {
                return false;
            }
        }
        return true;
    }

    cardsFound(openedCards) {
        return this.#cards[openedCards[0]].index_card === this.#cards[openedCards[1]].index_card;
    }
}