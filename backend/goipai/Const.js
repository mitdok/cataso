var Const = function () { }

Const.Index = function () { }
Const.Index.NONE = -1;

Const.Value = function () { }
Const.Value.NONE = -1;

Const.Sound = function () { }
Const.Sound.BELL = 0;
Const.Sound.BUILD = 1;
Const.Sound.CHAT = 2;
Const.Sound.DICE = 3;
Const.Sound.ENDING = 4;
Const.Sound.GET = 5;
Const.Sound.JOIN = 6;
Const.Sound.OPENING = 7;
Const.Sound.PASS = 8;
Const.Sound.ROBBER = 9;

Const.State = function () { }
Const.State.READY = 0;
Const.State.PLAYING = 1;

Const.Phase = function () { }
Const.Phase.NONE = -1;
Const.Phase.FIVE_POWN = 0;
Const.Phase.TRY = 1;
Const.Phase.THROW = 2;
Const.Phase.CATCH = 3;
Const.Phase.FINALLY = 4;
Const.Phase.PAUSE = 5;

Const.Card = function () { }
Const.Card.POWN = 0;
Const.Card.LANCE = 1;
Const.Card.KNIGHT = 2;
Const.Card.SILVER = 3;
Const.Card.GOLD = 4;
Const.Card.BISHOP = 5;
Const.Card.ROOK = 6;
Const.Card.KING1 = 7;
Const.Card.KING2 = 8;

Const.CARD_SCORE = [
      10
    , 20
    , 20
    , 30
    , 30
    , 40
    , 40
    , 50
    , 50
];

Const.CARD_NAME = [
      'し'
    , '香'
    , '馬'
    , '銀'
    , '金'
    , '角'
    , '飛'
    , '王'
    , '玉'
];

Const.FONT_COLOR = [
      'yellow'
    , 'lime'
    , 'yellow'
    , 'lime'
];

Const.COLOR_NAME = [
      '黄'
    , '緑'
    , '黄'
    , '緑'
];

module.exports = Const;