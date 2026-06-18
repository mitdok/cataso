var Const = require('./Const');
var Index = Const.Index;
var Card = Const.Card;
var CARD_SCORE = Const.CARD_SCORE;

var Player = function () { }

Player.clear = function (player) {
    player.uid = '';
    player.hand = [];
    player.defense = [];
    player.hidden = [];
    player.offense = [];
    player.peeping = false;
}
Player.copy = function (player, prev) {
    player.uid = prev.uid || '';
    player.hand = prev.hand || [];
    player.defense = prev.defense || [];
    player.hidden = prev.hidden || [];
    player.offense = prev.offense || [];
    player.peeping = prev.peeping;
}

Player.deal = function (player, deck) {
    player.hand.length = 0;
    player.defense.length = 0;
    player.hidden.length = 0;
    player.offense.length = 0;
    player.peeping = false;

    var hand = player.hand;
    var i;
    for (i = 0; i < 8; i++) {
        hand.push(deck.shift());
    }
}

Player.countPown = function (player) {
    var hand = player.hand;

    var count = 0;
    var i;;
    for (i = 0; i < hand.length; i++) {
        if (hand[i] === Card.POWN) {
            count++;
        }
    }

    return count;
}

Player.maxScoreCard = function (player) {
    var hand = player.hand;

    var max = 0;
    var i;
    for (i = 1; i < hand.length; i++) {
        if (CARD_SCORE[hand[i]] > CARD_SCORE[max]) {
            max = hand[i];
        }
    }

    return max;
}

module.exports = Player;