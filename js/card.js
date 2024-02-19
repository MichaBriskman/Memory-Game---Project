class Card {
    index_card;
    #img_str;
    #closed_img_str;
    curr_img_str;
    is_hidden;

    constructor(index) {
        this.index_card = index;
        this.#img_str = "images/" + this.index_card + ".jpg";
        this.#closed_img_str = "images/card.jpg";
        this.curr_img_str = this.#closed_img_str;
        this.is_hidden = true;
    }

    flipCard() {
        this.curr_img_str = (this.curr_img_str === this.#img_str) ? this.#closed_img_str : this.#img_str;
        this.is_hidden = (this.curr_img_str === this.#closed_img_str);
    }
}