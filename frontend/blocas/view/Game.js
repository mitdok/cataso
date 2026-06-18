enchant();

var Game = function () { }

Game.isOpen = false;
Game.canSend = true;
Game.core = null;
Game.candidate = [];
Game.candidatePos = [];

Game.send = function (message) {
    if (this.canSend) {
        send(message);
        this.canSend = false;
    }
}

Game.sendCommand = function (message, can = true) {
    if (can) {
        sendCommand(message);
    }
}

Game.addLabel = function (text, x, y, font, color) {
    if (!font) {
        font = '14px "メイリオ",Meiryo';
    } else {
        font += ' ' + '"メイリオ",Meiryo';
    }

    var label = new Label(text);

    label.x = x;
    label.y = y;
    label.font = font;

    if (color || color === 0) { label.color = color; }

    this.core.rootScene.addChild(label);

    return label;
}

Game.addSprite = function (image, frame, x, y, width, height, onTouch, opacity) {
    var sprite = new Sprite(width, height);

    sprite.image = this.core.assets[image];
    sprite.frame = frame;
    sprite.x = x;
    sprite.y = y;

    if (onTouch) { sprite.addEventListener('touchstart', onTouch); }
    if (opacity || opacity === 0) { sprite.opacity = opacity; }

    this.core.rootScene.addChild(sprite);

    return sprite;
}

Game.addMovable = function (game, image, frame, width, height, pattern) {
    var sprites = [];
    var spritesStatic = [];
    var spriteIndex = -1;
    var offsetX = 0;
    var offsetY = 0;
    var defaultX = 480;
    var defaultY = 620;
    for(let i = 0; i < pattern.length; i++) {
        for(let j = 0; j < pattern[i].length; j++) {
            if(pattern[i][j] === Pattern.BLOCK) {
                if(spriteIndex === -1) {
                    offsetX = j;
                    offsetY = i;
                }
                spriteIndex++;
                sprites.push(new Sprite(width, height));
                sprites[spriteIndex].frame = frame;
                sprites[spriteIndex].opacity = 0.4;
                sprites[spriteIndex].x = defaultX + j * 20 - offsetX * 20;
                sprites[spriteIndex].y = defaultY + i * 20 - offsetY * 20;
                sprites[spriteIndex].image = this.core.assets[image];

                spritesStatic.push(new Sprite(width, height));
                spritesStatic[spriteIndex].frame = frame;
                spritesStatic[spriteIndex].x = defaultX + j * 20 - offsetX * 20;
                spritesStatic[spriteIndex].y = defaultY + i * 20 - offsetY * 20;
                spritesStatic[spriteIndex].image = this.core.assets[image];

                sprites[spriteIndex].addEventListener('touchmove', function (e) {
                    let _offsetX = offsetX;
                    let _offsetY = offsetY;
                    let _index = -1;
                    for(let i = 0; i < pattern.length; i++) {
                        for(let j = 0; j < pattern[i].length; j++) {
                            if(pattern[i][j] === Pattern.BLOCK) {
                                _index++;
                                sprites[_index].x = e.x + j * 20 - _offsetX * 20;
                                sprites[_index].y = e.y + i * 20 - _offsetY * 20;
                            }
                        }
                    }
                });

                sprites[spriteIndex].addEventListener('touchend', function (that) {
                    return function(e) {
                        let _offsetX = offsetX;
                        let _offsetY = offsetY;
                        let _index = -1;
                        var candidateIndex = -1;
                        that.candidate.forEach(s => that.core.rootScene.removeChild(s));    
                        that.candidate.length = 0;
                        that.candidatePos.length = 0;
                        var XY = Game.calcJustXY(e.x, e.y);
                        var indexXY = Game.calcIndexFromPos(XY[0], XY[1]);
                        for(let i = 0; i < pattern.length; i++) {
                            for(let j = 0; j < pattern[i].length; j++) {
                                if(pattern[i][j] === Pattern.BLOCK) {
                                    _index++;
                                    sprites[_index].x = defaultX + j * 20 - offsetX * 20;
                                    sprites[_index].y = defaultY + i * 20 - offsetY * 20;
                                    var canPlaceFunc = Game.canPlace;
                                    if(game.phase === Phase.SETUP) {
                                        canPlaceFunc = Game.canPlaceFirst;
                                    }
                                    if(indexXY[0] !== null && indexXY[1] !== null && canPlaceFunc(game, pattern, indexXY[0], indexXY[1], offsetX, offsetY)) {
                                        candidateIndex++;
                                        that.candidate[candidateIndex] = new Sprite(width, height);
                                        that.candidate[candidateIndex].frame = frame;
                                        that.candidate[candidateIndex].opacity = 0.6;
                                        that.candidate[candidateIndex].x = XY[0] + j * 20 - offsetX * 20;
                                        that.candidate[candidateIndex].y = XY[1] + i * 20 - offsetY * 20;
                                        that.candidate[candidateIndex].image = that.core.assets[image];
                                        that.candidatePos = [indexXY[0], indexXY[1], offsetX, offsetY];
                                    }
                                }
                            }
                        }
                        that.candidate.forEach(s => that.core.rootScene.addChild(s));    
                    }                    
                }(this));
            }
        }
    }

    spritesStatic.forEach(s => this.core.rootScene.addChild(s));    
    sprites.forEach(s => this.core.rootScene.addChild(s));    
}

Game.canPlaceFirst = function(game, pattern, indexX, indexY, offsetX, offsetY) {
    var OK = false;
    var startX = -1;
    var startY = -1;
    if(game.active === 0) {
        startX = 0;
        startY = 0;
    } else if(game.active === 1) {
        startX = 19;
        startY = 0;
    } else if (game.active === 2) {
        startX = 19;
        startY = 19;
    } else if (game.active === 3) {
        startX = 0;
        startY = 19;        
    }
    for(let i = 0; i < pattern.length; i++) {
        for(let j = 0; j < pattern[i].length; j++) {
            var posX = indexX - offsetX + j;
            var posY = indexY - offsetY + i;
            if(pattern[i][j] === Pattern.NONE) {
                continue;
            }
            if (pattern[i][j] === Pattern.BLOCK) { 
                if(posX < 0 || posX > 19 || posY < 0 || posY > 19) {
                    return false;
                }
                if(game.blocks[posY][posX] !== Index.NONE) {
                    return false;
                }
                if(posX === startX && posY === startY) {
                    OK = true;
                }
            }
        }
    }
    if(OK) {
        return true;
    } else {
        return false;
    }
}

Game.canPlace = function(game, pattern, indexX, indexY, offsetX, offsetY) {
    
    var hasVertex = false;
    for(let i = 0; i < pattern.length; i++) {
        for(let j = 0; j < pattern[i].length; j++) {
            var posX = indexX - offsetX + j;
            var posY = indexY - offsetY + i;
            if(pattern[i][j] === Pattern.NONE) {
                continue;
            }
            if(pattern[i][j] === Pattern.EDGE) {
                if(posX < 0 || posX > 19 || posY < 0 || posY > 19) {
                    continue;
                } else if(game.blocks[posY][posX] === game.active) {
                    return false;
                }
            } else if (pattern[i][j] === Pattern.VERTEX) {
                if(posX < 0 || posX > 19 || posY < 0 || posY > 19) {
                    continue;
                } else if(game.blocks[posY][posX] === game.active) {
                    hasVertex = true;
                }
            } else if (pattern[i][j] === Pattern.BLOCK) { 
                if(posX < 0 || posX > 19 || posY < 0 || posY > 19) {
                    return false;
                }
                if(game.blocks[posY][posX] !== Index.NONE) {
                    return false;
                }
            }
        }
    }
    if(hasVertex) {
        return true;
    } else {
        return false;
    }
}

Game.addBlocks = function (game) {
    var blocks = game.blocks;
    var spriteAll = [];
    var startX = 300;
    var startY = 133;
    var blockIndex = -1;
    for(let i = 0; i < blocks.length; i++) {
        for(let j = 0; j < blocks[i].length; j++) {
            if(blocks[i][j] !== -1) {
                blockIndex++;
                spriteAll.push(new Sprite(20, 20));
                if(game.previous && game.previous.some(p => p.posX === j && p.posY === i)) {
                    spriteAll[blockIndex].frame = blocks[i][j] + 4;
                } else {
                    spriteAll[blockIndex].frame = blocks[i][j];
                }
                spriteAll[blockIndex].x = startX + j * 20;
                spriteAll[blockIndex].y = startY + i * 20;
                spriteAll[blockIndex].image = this.core.assets['view/block.png'];
            }
        }
    }
    spriteAll.forEach(s => this.core.rootScene.addChild(s));    
}


Game.calcJustXY = function (x, y) {
    var retX = 0;
    var retY = 0;
    if(x < 250) {
        return [null, null];
    }
    if(y < 80) {
        return [null, null];
    }
    for(let _x = 1; _x <= 20; _x++ ) {
        if(x < 295 + 20 * _x) {
            retX = 300 + 20 * (_x - 1);
            break;
        }
    }
    for(let _y = 1; _y <= 20; _y++ ) {
        if(y < 128 + 20 * _y) {
            retY = 133 + 20 * (_y - 1);
            break;
        }
    }
    if(retX === 0 || retY === 0) {
        return [null, null];
    }
    return [retX, retY];
}

Game.calcIndexFromPos = function(x, y) {
    if(x === null || y === null) {
        return [null, null];
    }
    var indexX = (x - 300) / 20;
    var indexY = (y - 133) / 20;
    return [indexX, indexY];
}

Game.onLoad = function () {
    this.core = new Core(1000, 785);

    this.core.fps = 120;

    this.core.preload(
          'view/background.png'
          , 'view/block.png'
          , 'view/button.png'
          , 'view/block0.png'
          , 'view/block1.png'
          , 'view/block2.png'
          , 'view/block3.png'
          , 'view/block4.png'
          , 'view/block5.png'
          , 'view/block6.png'
          , 'view/block7.png'
          , 'view/block8.png'
          , 'view/block9.png'
          , 'view/block10.png'
          , 'view/block11.png'
          , 'view/block12.png'
          , 'view/block13.png'
          , 'view/block14.png'
          , 'view/block15.png'
          , 'view/block16.png'
          , 'view/block17.png'
          , 'view/block18.png'
          , 'view/block19.png'
          , 'view/block20.png'
          , 'view/priority.png'
          , 'view/active.png'
          , 'view/finish-button.png'
    );

    this.core.onload = function () {
        Game.isOpen = true;
        Game.send('a');
    }

    this.core.start();
}

Game.onMessage = function (game) {
    if (game.sound !== '') { sound(game.sound); }

    this.canSend = true;
    this.candidate.length = 0;
    this.candidatePos.length = 0;
    this.removeAll();
    this.addSprite('view/background.png', 0, 0, 0, 1000, 785);
    Game.addBlocks(game);
    Game.addCommand(game);
    game.playerList.forEach((_, i) => this.addPlayer(game, i));
    if(game.selectingPattern !== -1) {
        var templatePattern = BLOCK_PATTERN[game.selectingPattern];
        var currentPattern = this.rotateBlock(game.selectingRotate, templatePattern);
        if(game.selectingReverse) {
            currentPattern = this.reverseBlock(currentPattern);
        }
        this.addMovable(game, 'view/block.png', game.active, 20, 20, currentPattern);
    }
}

Game.removeAll = function () {
    while (this.core.rootScene.childNodes.length > 0) {
        this.core.rootScene.removeChild(this.core.rootScene.childNodes[0]);
    }
}

Game.hasPriorityColor = function (game, color) {
    if (color !== Index.NONE) {
        var i;
        var len1 = game.priority.length;
        for (i = 0; i < len1; i++) if (game.priority[i] === color) {
            return true;
        }
    }
    
    return false;
}

Game.hasPriorityUid = function (game, uid) {
    if(game.playerList[game.active].uid === uid) {
        return true;
    }
    return false;
}

Game.addReadyCommand = function (game) {
    var canJoin = false;
    var canLeave = false;
    var canStart = false;

    var i;
    var len1 = game.playerList.length;
    for (i = 0; i < len1; i++) {
        if (game.playerList[i].uid === '') {
            canJoin = true;
        } else {
            if (game.playerList[i].uid === uid) { canLeave = true; }
        }
    }

    if (
           game.playerList[0].uid !== ''
        && game.playerList[1].uid !== ''
        && game.playerList[2].uid !== ''
        && game.playerList[3].uid !== ''
    ) {
        canStart = true;
    }

    if (canJoin) {
        this.addSprite('view/button.png', 0, 460, 722, 80, 25, function () { // 着席
            Game.send('b');
        });
    }

    if (canLeave) {
        this.addSprite('view/button.png', 1, 550, 722, 80, 25, function () { // 離席
            Game.send('c');
        });

        if (canStart) { // 着席している人しか開始できない
            this.addSprite('view/button.png', 2, 370, 722, 80, 25, function () {
                Game.send('d'); // 開始
            });
        }
    }
}

Game.addCommand = function (game) {
    if (game.state === State.READY) {
        this.addReadyCommand(game);
    } else {
        if(Game.hasPriorityUid(game, uid)) {
            this.addLabel('ブロックをドラッグ＆ドロップで配置して[決定]', 370, 590, '12px');
            this.addSprite('view/button.png', 5, 370, 722, 80, 25, function () { // 回転
                Game.send('g');
            });
            this.addSprite('view/button.png', 6, 460, 722, 80, 25, function () { // 反転
                Game.send('h');
            });
            this.addSprite('view/button.png', 3, 550, 722, 80, 25, function () { // 決定
                if(Game.candidate && Game.candidate.length !== 0) {
                    Game.send('i' + Game.candidatePos.join(' '));
                }
            });
            this.addSprite('view/finish-button.png', 0, 350, 50, 290, 25, function () { // 終了
               Game.send('j');
            });
        }
    }
}

Game.addPlayer = function (game, color) {
    var blocks = game.playerList[color].blocks;
    var calcColorOffset = function(color) {
        switch(color) {
            case 0:
                return [0, 0];
            case 1:
                return [720, 0];
            case 2:
                return [720, 430];
            case 3:
                return [0, 430];
        }
    };
    var offset = calcColorOffset(color);
    if(game.state === State.PLAYING) {
        if (game.active === color) { 
            this.addSprite('view/active.png', 0, offset[0] + 5, offset[1] + 5, 15, 15); 
            this.addSprite('view/priority.png', 0, offset[0] + 23, offset[1] + 1.5, 130, 22);
        }
    }
    if(game.state === State.PLAYING && game.playerList[color].finish) {
        this.addSprite('view/priority.png', 1, offset[0] + 23, offset[1] + 1.5, 130, 22);
    }
    this.addLabel(game.playerList[color].score + '点', offset[0] + 160, offset[1] + 5, '12px');
    this.addLabel(game.playerList[color].uid, offset[0] + 30, offset[1] + 5);
    if (game.state === State.PLAYING) {
        for(let i = 0; i < BLOCK_PATTERN.length; i++) {
            var have = blocks.some(b => b === i);
            var x = 0;
            var y = 0;
            var width = 0;
            var height = 0;
            switch(i) {
                case 0:
                    x = 10 + offset[0];
                    y = 30 + offset[1];
                    width = 20;
                    height = 20;
                    break;
                case 1:
                    x = 10 + offset[0];
                    y = 60 + offset[1];
                    width = 40;
                    height = 20;
                    break;
                case 2:
                    x = 10 + offset[0];
                    y = 90 + offset[1];
                    width = 60;
                    height = 20;
                    break;
                case 3:
                    x = 10 + offset[0];
                    y = 120 + offset[1];
                    width = 40;
                    height = 40;
                    break;
                case 4:
                    x = 10 + offset[0];
                    y = 170 + offset[1];
                    width = 40;
                    height = 40;
                    break;
                case 5:
                    x = 10 + offset[0];
                    y = 220 + offset[1];
                    width = 80;
                    height = 20;
                    break;
                case 6:
                    x = 10 + offset[0];
                    y = 250 + offset[1];
                    width = 60;
                    height = 40;
                    break;
                case 7:
                    x = 10 + offset[0];
                    y = 300 + offset[1];
                    width = 60;
                    height = 40;
                    break;
                case 8:
                    x = 100 + offset[0];
                    y = 30 + offset[1];
                    width = 60;
                    height = 40;
                    break;
                case 9:
                    x = 100 + offset[0];
                    y = 80 + offset[1];
                    width = 100;
                    height = 20;
                    break;
                case 10:
                    x = 100 + offset[0];
                    y = 110 + offset[1];
                    width = 60;
                    height = 40;
                    break;
                case 11:
                    x = 100 + offset[0];
                    y = 160 + offset[1];
                    width = 80;
                    height = 40;
                    break;
                case 12:
                    x = 100 + offset[0];
                    y = 210 + offset[1];
                    width = 80;
                    height = 40;
                    break;
                case 13:
                    x = 100 + offset[0];
                    y = 260 + offset[1];
                    width = 60;
                    height = 60;
                    break;
                case 14:
                    x = 210 + offset[0];
                    y = 10 + offset[1];
                    width = 60;
                    height = 40;
                    break;
                case 15:
                    x = 210 + offset[0];
                    y = 60 + offset[1];
                    width = 60;
                    height = 60;
                    break;
                case 16:
                    x = 210 + offset[0];
                    y = 130 + offset[1];
                    width = 60;
                    height = 60;
                    break;
                case 17:
                    x = 200 + offset[0];
                    y = 180 + offset[1];
                    width = 60;
                    height = 60;
                    break;
                case 18:
                    x = 100 + offset[0];
                    y = 310 + offset[1];
                    width = 80;
                    height = 40;
                    break;
                case 19:
                    x = 170 + offset[0];
                    y = 240 + offset[1];
                    width = 60;
                    height = 60;
                    break;
                case 20:
                    x = 210 + offset[0];
                    y = 290 + offset[1];
                    width = 60;
                    height = 60;
                    break;
            }
            this.addSprite(`view/block${i}.png`, have ? color : 4, x, y, width, height, function () {
                var _i = i;
                if(color === game.active && have && game.playerList[color].uid === uid) {
                    return function () {
                        Game.send('f' + _i);
                    };
                }
            }());
        }
    }
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