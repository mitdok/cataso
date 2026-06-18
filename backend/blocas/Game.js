var Player = require('./Player');
var Const = require('./Const');
var Index = Const.Index;
var State = Const.State;
var Phase = Const.Phase;
var COLOR_NAME = Const.COLOR_NAME;

var Game = function () { }

Game.suffle = function (source, mt) {
    var tmp = [];
    
    while (source.length > 0) { tmp.push(source.splice(mt.nextInt(source.length), 1)[0]); }
    
    while (tmp.length > 0) { source.push(tmp.splice(mt.nextInt(tmp.length), 1)[0]); }

    while (source.length > 0) { tmp.push(source.splice(mt.nextInt(source.length), 1)[0]); }

    while (tmp.length > 0) { source.push(tmp.splice(mt.nextInt(tmp.length), 1)[0]); }
}

Game.clear = function (game) {
    game.state = State.READY;
    game.sound = '';
    game.playerSize = 4;
    game.phase = Phase.NONE;
    game.active = Index.NONE;
    game.selectingPattern = Index.NONE;
    game.selectingRotate = 0;
    game.selectingReverse = false;
    game.blocks = [];
    game.previous = [];
    
    var playerList = game.playerList = [
          new Player()
        , new Player()
        , new Player()
        , new Player()
    ];

    var len1 = playerList.length;
    for (i = 0; i < len1; i++) { Player.clear(playerList[i]); }
}

Game.copy = function (game, prev) {
    game.state = prev.state;
    game.sound = '';
    game.playerSize = prev.playerSize;
    game.phase = prev.phase;
    game.active = prev.active;
    game.selectingPattern = prev.selectingPattern;
    game.selectingRotate = prev.selectingRotate;
    game.selectingReverse = prev.selectingReverse;
    game.blocks = prev.block || [];
    game.previous = prev.previous || [];
    
    var playerList = game.playerList = [
          new Player()
        , new Player()
        , new Player()
        , new Player()
    ];

    var len1 = playerList.length;
    for (i = 0; i < len1; i++) { Player.copy(playerList[i], prev.playerList[i]); }
}

Game.start = function (game, mt) {
    mt.setSeed((new Date()).getTime());
    game.state = State.PLAYING;
    game.phase = Phase.SETUP;
    game.selectingPattern = Index.NONE;
    game.selectingRotate = 0;
    game.selectingReverse = false;
    game.playerList.forEach(p => Player.start(p));
    game.active = 0;
    game.previous = [];
    for(let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if(j === 0) {
                game.blocks.push([]);
            }
            game.blocks[i][j] = Index.NONE;
        }
    }
    // DEBUG
    // game.blocks[0][0] = 0;
    // game.blocks[0][1] = 0;
    // game.blocks[0][2] = 0;
    // game.blocks[0][3] = 0;
    // game.blocks[0][4] = 0;
    // game.blocks[0][5] = 0;

}

Game.rotateBlock = function(angle, pattern) {
    let result = JSON.parse(JSON.stringify(pattern));
    for(let i = 0; i < angle; i++) {
        result = result[0].map((_, c) => result.map(r => r[c]).reverse());
    }
    return result;
}

Game.reverseBlock = function(pattern) {
    let result = JSON.parse(JSON.stringify(pattern));
    result = result.map(p => p.reverse());
    return result;
}

Game.nextTurn = function (game, that) {
    if(game.phase === Phase.SETUP) {
        if(game.active === game.playerSize - 1) {
            game.phase = Phase.MAIN;
        }
    }
    game.selectingPattern = Index.NONE;
    game.selectingRotate = 0;
    game.selectingReverse = false;
    for(let i = (game.active + 1) % game.playerSize; i !== game.active; i = (i + 1) % game.playerSize) {
        if(!game.playerList[i].finish) {
            game.active = i;
            break;
        }
    }
    that.chat(
        '?'
      , 'orange'
      , '--「' + game.playerList[game.active].uid + '(' + COLOR_NAME[game.active] + ')」ターン--'
    );
}

Game.findWinner = function (game) {
    var highestScore = game.playerList.reduce((p, c) => {
        if(p.score > c.score) {
            return p;
        } else {
            return c;
        }
    });
    let winner = game.playerList.map((p, i) => {
        return {
            player: p,
            index: i
        };
    }).filter(p => p.player.score === highestScore.score);
    return winner;
}

module.exports = Game;