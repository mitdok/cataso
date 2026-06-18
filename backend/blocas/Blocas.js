var Room = require('../Room');
var MersenneTwister = require('../MersenneTwister');
var Game = require('./Game');
var Const = require('./Const');
const Redis = require('redis')
const { BLOCK_PATTERN } = require('./Const');
var Option = Const.Option;
var State = Const.State;
var Phase = Const.Phase;
var Sound = Const.Sound;
var Index = Const.Index;
var Pattern = Const.Pattern;
var FONT_COLOR = Const.FONT_COLOR;
var COLOR_NAME = Const.COLOR_NAME;

var Blocas = function (roomId, redis, isAuth = false) {
    this.initialize('l', roomId, redis);
    
    this.game = new Game();
    this.isAuth = isAuth;
    this.mt = new MersenneTwister();

    this.redis.get(`room-${this.roomId}`).then(prev => {
        if (prev) {
            this.isPlaying = JSON.parse(prev).isPlaying;
            Game.copy(this.game, JSON.parse(prev).game);
        } else {
            Game.clear(this.game);
        }
    });
}

Blocas.prototype = new Room();

Blocas.prototype.split = function (source) {
    return source.slice(1).split(' ');
}

Blocas.prototype.reset = function () {
    this.isPlaying = false;

    Game.clear(this.game);

    this.broadcast(JSON.stringify(this.game));
}

Blocas.prototype.onCommand = function (user, message) {
    this.basicCommand(user, message);
}

Blocas.prototype.onChat = function (user, message) {
    var playerList = this.game.playerList;
    var color = 'white';
    
    var i;
    var len1 = playerList.length;
    for (i = 0; i < len1; i++) {
        if (playerList[i].uid === user.uid) {
            color = FONT_COLOR[i];
            break;
        }
    }
    
    this.chat(user.uid, color, (message.split('<').join('&lt;')).split('>').join('&gt;'));
}

Blocas.prototype.onMessage = function (uid, message) {
    if (message[0] === 'a') {
        this.unicast(uid, JSON.stringify(this.game));
    } else {
        if (this.game.state === State.READY) {
            switch (message[0]) {
                // join the game (着席押下時)
                case 'b':
                    (function (that) {
                        var game = that.game;
                        var playerList = game.playerList;

                        var i;
                        var len1 = playerList.length;
                        for (i = 0; i < len1; i++) {
                            var player = playerList[i];
                            
                            if (player.uid === '') {
                                player.uid = uid;
                                game.sound = Sound.JOIN;
                                break;
                            }
                        }
                    })(this);
                    break;
                // leave the game (離席押下時)
                case 'c':
                    (function (that) {
                        var playerList = that.game.playerList;

                        var i;
                        var len1 = playerList.length;
                        for (i = 0; i < len1; i++) {
                            var player = playerList[i];
                            
                            if (player.uid === uid) { player.uid = ''; }
                        }
                    })(this);
                    break;
                // start the game
                case 'd':
                    (function (that) {
                        var game = that.game;
                        var mt = that.mt;
                        var playerList = game.playerList;
                        
                        if (
                               playerList[0].uid !== ''
                            && playerList[1].uid !== ''
                            && playerList[2].uid !== ''
                        ) {
                            Game.start(game, mt);

                            var active = game.active;
                            
                            that.chat(
                                  '?'
                                , 'orange'
                                , '--「' + playerList[active].uid + '(' + COLOR_NAME[active] + ')」ターン--'
                            );
                            
                            that.isPlaying = true;
                            game.sound = Sound.OPENING;
                        }
                    })(this);
                    break;
            }
        } else {
            switch (message[0]) {
                case 'e':
                case 'f':
                    (function (that) {
                        var game = that.game;
                        var index = parseInt(that.split(message)[0]);
                        game.selectingPattern = index;
                        game.selectingRotate = 0;
                    })(this);
                    break;
                case 'g':
                    (function (that) {
                        var game = that.game;
                        game.selectingRotate++;
                    })(this);
                    break;
                case 'h':
                    (function (that) {
                        var game = that.game;
                        game.selectingReverse = !game.selectingReverse;
                    })(this);
                    break;                    
                case 'i':
                    (function (that) {
                        var game = that.game;
                        var param = that.split(message);
                        var indexX = parseInt(param[0]);
                        var indexY = parseInt(param[1]);
                        var offsetX = parseInt(param[2]);
                        var offsetY = parseInt(param[3]);
                        var currentPattern = BLOCK_PATTERN[game.selectingPattern];
                        game.previous = [];
                        currentPattern = Game.rotateBlock(game.selectingRotate, currentPattern);
                        if(game.selectingReverse) {
                            currentPattern = Game.reverseBlock(currentPattern);
                        }
                        for(let i = 0; i < currentPattern.length; i++) {
                            for(let j = 0; j < currentPattern[i].length; j++) {
                                var posX = indexX - offsetX + j;
                                var posY = indexY - offsetY + i;
                                if (currentPattern[i][j] === Pattern.BLOCK) { 
                                    game.blocks[posY][posX] = game.active;
                                    game.previous.push({posX, posY});
                                }
                            }
                        }
                        game.playerList[game.active].blocks = game.playerList[game.active].blocks.filter(b => b !== game.selectingPattern);
                        game.playerList[game.active].score += that.point(game.selectingPattern);
                        if(game.playerList[game.active].blocks.length === 0) {
                            if(game.selectingPattern === 0) {
                                game.playerList[game.active].score += 5;
                            }
                            game.playerList[game.active].finish = true;
                            game.sound = Sound.GET;
                        } else {
                            game.sound = Sound.PASS;
                        }
                        if(game.playerList.filter(p => !p.finish).length === 0) {
                            that.ending(that);
                        } else {
                            Game.nextTurn(game, that);
                        }
                    })(this);
                    break;                    
                case 'j':
                    (function (that) {
                        var game = that.game;
                        game.playerList[game.active].finish = true;
                        game.sound = Sound.PASS;
                        if(game.playerList.filter(p => !p.finish).length === 0) {
                            that.ending(that);
                        } else {
                            Game.nextTurn(game, that);
                        }
                    })(this);
                    break;                     
                case 'k':
                case 'l':
                case 'm':
                case 'n':
                case 'o':
                case 'p':
                case 'q':
                case 'r':
                case 's':
                case 't':
                case 'u':
                case 'N':
                case 'v':
                case 'w':
                case 'x':
                case 'O':
                case 'y':
                case 'z':
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                case 'G':
                case 'H':
                case 'I':
                case 'J':
                case 'K':
                case 'L':
                case 'M':
                default:
                    break;
            }
        }
        
        this.broadcast(JSON.stringify(this.game));
        this.game.sound = '';
    }
}

Blocas.prototype.point = function (block) {
    switch(block) {
        case 0:
            return 1;
        case 1:
            return 2;
        case 2:
        case 3:
            return 3;
        case 4: 
        case 5: 
        case 6: 
        case 7: 
        case 8:
            return 4;
        default:
            return 5; 
    }    
}

Blocas.prototype.ending = function (that) {
    var game = that.game;
    that.chat(
        '?'
      , 'deeppink'
      , '++勝利 おめでとう++'
    );

    var playerList = game.playerList;
    var winner = Game.findWinner(game);
    var winnerStr = winner.map(w => `${w.player.uid}(${COLOR_NAME[w.index]})`);

    that.chat(
            '?'
        , 'deeppink'
        , `${winnerStr.join(',')}`
    );

    var i;
    for (i = 0; i < game.playerSize; i++) { playerList[i].uid = ''; }
    game.playerSize = 4;
    game.state = State.READY;
    that.isPlaying = false;
    game.sound = Sound.ENDING;
}

module.exports = Blocas;