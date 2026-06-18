enchant();

var Game = function () { }

Game.isOpen = false;
Game.canSend = true;
Game.core = null;

Game.trade = {
      input: [0, 0, 0, 0, 0, 0, 0, 0]
    , output: [0, 0, 0, 0, 0, 0, 0, 0]
    , pool: 0
};

Game.alchemistDice = {
    dice1: Index.NONE,
    dice2: Index.NONE
}

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

Game.onLoad = function () {
    this.core = new Core(1000, 545);

    this.core.fps = 5;

    this.core.preload(
          'view/background.png'
        , 'view/button.png'
        , 'view/map.png'
        , 'view/land.png'
        , 'view/number.png'
        , 'view/robber.png'
        , 'view/active.png'
        , 'view/priority.png'
        , 'view/settlement.png'
        , 'view/road.png'
        , 'view/resource.png'
        , 'view/skin.png'
        , 'view/resource-button.png'
        , 'view/updown.png'
        , 'view/card.png'
        , 'view/prize.png'
        , 'view/dice.png'
        , 'view/signpost.png'
        , 'view/resource-name.png'
        , 'view/barbarian_tile.png'
        , 'view/barbarian_ship.png'
        , 'view/development-active.png'
        , 'view/knight-action-button.png'
        , 'view/knight.png'
        , 'view/card-back.png'
        , 'view/development-button.png'
        , 'view/metropolis.png'
        , 'view/metropolis-prize.png'
        , 'view/commodity-sample.png'
        , 'view/city-wall.png'
        , 'view/selecting-land.png'
        , 'view/point-card.png'
        , 'view/player.png'
        , 'view/dice-selecting.png'
        , 'view/merchant.png'
        , 'view/tmpSettlements.png'
        , 'view/market.png'
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
    this.removeAll();
this.addSprite('view/background.png', 0, 0, 0, 932, 545);
    // this.addLabel('道=', 30, 520);
    // this.addSprite('view/resource.png',0,26+30,520,15,15);
    // this.addSprite('view/resource.png',4,42+30,520,15,15);
    // this.addLabel('家=', 130, 520);
    // this.addSprite('view/resource.png',0,26+130,520,15,15);
    // this.addSprite('view/resource.png',1,42+130,520,15,15);
    // this.addSprite('view/resource.png',3,58+130,520,15,15);
    // this.addSprite('view/resource.png',4,74+130,520,15,15);
    // this.addLabel('街=', 260, 520);
    // this.addSprite('view/resource.png',2,26+260,520,15,15);
    // this.addSprite('view/resource.png',2,42+260,520,15,15);
    // this.addSprite('view/resource.png',2,58+260,520,15,15);
    // this.addSprite('view/resource.png',3,74+260,520,15,15);
    // this.addSprite('view/resource.png',3,90+260,520,15,15);
    // this.addLabel('カード=', 390, 520);
    // this.addSprite('view/resource.png',1,54+390,520,15,15);
    // this.addSprite('view/resource.png',2,70+390,520,15,15);
    // this.addSprite('view/resource.png',3,86+390,520,15,15);
    if(game.eventHistory && game.eventHistory.length  > 0) {
        for(var event = 0; event < 4; event++) {
            var eventType = [
                 '黒'
                ,'青'
                ,'緑'
                ,'黄'
            ];
            this.addLabel(eventType[event] + ':', 350, 20 + 15 * event);
            this.addLabel('' + ( '  ' + Math.round(game.eventHistory.filter(d => d === event).length / game.eventHistory.length * 100) ).slice( -3 ), 375, 20 + 15 * event);
            this.addLabel('%', 400, 20 + 15 * event);
        }
    }
    if(game.diceHistory && game.diceHistory.length  > 0) {
        this.addLabel(`${game.diceHistory.length}ターン`, 425, 5);
        for(var diceNum = 2; diceNum <= 12; diceNum++) {
            var diceStr = ( '00' + diceNum ).slice( -2 );
            this.addLabel(diceStr + ':', 425, 20 + 15 * (diceNum - 2));
            this.addLabel('' + ( '  ' + Math.round(game.diceHistory.filter(d => d === diceNum).length / game.diceHistory.length * 100) ).slice( -3 ), 450, 20 + 15 * (diceNum - 2));
            this.addLabel('%', 475, 20 + 15 * (diceNum - 2));
        }
    }
    this.addSetupOption(game);
    this.addStock(game);
    this.addHeadLine(game);
    this.addCommand(game);
    this.addDice(game);
    
    var i;
    for (i = 0; i < game.playerSize; i++) { this.addPlayer(game, i); }
    
    this.addMap(game);
    this.addRoad(game);
    this.addCityWall(game);
    this.addSettlement(game);
    this.addKnight(game);
    this.addCanBuildRoad(game);
    this.addCanBuildSettlement(game);
    this.addCanBuildCity(game);
    this.addCanBuildKnight(game);
    this.addCanActivateKnight(game);
    this.addCanPromoteKnight(game);
    this.addCanPillageSettlement(game);
    this.addCanPillageCity(game);
    this.addCanBuildMetropolis(game);
    this.addCanPillagedMetropolis(game, game.priority[0]);
    this.addCanBuildCityWall(game);
    this.addCanMoveRobber(game);
    this.addCanSwapLand(game);
    this.addMerchantCommand(game);
    this.addKnightSelectionToMove(game);
    this.addKnightSelectionToMoveRobber(game);
    this.addCanKnightMove(game, game.selectingKnight);
    this.addCanAttackedKnightMove(game, game.selectingKnight);
    this.addDeserterCommand2(game);
    this.addCanRemoveRoad(game);
    this.addCanKnightDiplace(game);
    this.addSprite('view/barbarian_tile.png', 0, 15, 340, 21, 161);
    this.addLabel('蛮：' + Game.strengthOfBarbarian(game), 45, 460);
    this.addLabel('騎：' + Game.strengthOfKnights(game), 45, 480);
    this.addSprite('view/barbarian_ship.png', 0, 15, 340 + 20 * ( 7 - game.barbarianPos), 21, 21, function(){}, 0.5);
    
    
}

Game.removeAll = function () {
    while (this.core.rootScene.childNodes.length > 0) {
        this.core.rootScene.removeChild(this.core.rootScene.childNodes[0]);
    }
}

Game.addSetupOption = function(game) {
    var frame = 0;

    if(game.setup === Option.RANDOM_SETUP) { frame = 1; }

    this.addSprite('view/signpost.png', frame, 2, 2, 30, 30, function () { 
        var cmd = '/random'
        if (frame === 1) {
            cmd = '/alphabet'
        }
        Game.sendCommand(cmd)
    });

    var hiddenFrame = 0;
    if(game.hidden) { hiddenFrame = 1; }

    this.addSprite('view/market.png', hiddenFrame, 34, 2, 30, 30, function () { 
        var cmd = '/close'
        if (hiddenFrame === 1) {
            cmd = '/open'
        }
        Game.sendCommand(cmd)
    });

}

Game.addHeadLine = function (game) {
    var text = '';
    
    if (game.state === State.READY) {
        text = '募集中';
    } else {
        switch (game.phase) {
            case Phase.SETUP_SETTLEMENT1:
                text = '初期配置 家(1件目)';
                break;
            case Phase.SETUP_ROAD1:
                text = '初期配置 道(1本目)';
                break;
            case Phase.SETUP_SETTLEMENT2:
                text = '初期配置 街(2件目)';
                break;
            case Phase.SETUP_ROAD2:
                text = '初期配置 道(2本目)';
                break;
            case Phase.DICE:
                text = 'ダイス';
                break;
            case Phase.BURST:
                text = 'バースト';
                break;
            case Phase.ROBBER1:
                text = '盗賊(移動)';
                break;
            case Phase.ROBBER2:
                text = '盗賊(略奪)';
                break;
            case Phase.MAIN:
                text = 'メイン';
                break;
            case Phase.BUILD_ROAD:
                text = '道';
                break;
            case Phase.BUILD_SETTLEMENT:
                text = '家';
                break;
            case Phase.BUILD_CITY:
                text = '街';
                break;
            case Phase.INTERNATIONAL_TRADE:
                text = '海外貿易';
                break;
            case Phase.DOMESTIC_TRADE1:
                text = '国内貿易';
                break;
            case Phase.DOMESTIC_TRADE2:
                text = '国内貿易(確認)';
                break;
            case Phase.DOMESTIC_TRADE3:
                text = '国内貿易(オークション)';
                break;
            case Phase.SOLDIER2:
                text = '騎士(略奪)';
                break;
            case Phase.ROAD_BUILDING1:
                text = '街道カード(1本目)';
                break;
            case Phase.ROAD_BUILDING2:
                text = '街道カード(2本目)';
                break;
            case Phase.BARBARIAN_SAVE1:
            case Phase.BARBARIAN_SAVE2:
            case Phase.BARBARIAN_DEFEAT1:
                text = '蛮族アクション'
                break;
            case Phase.SOLDIER1:
            case Phase.BUILD_KNIGHT:
            case Phase.ACTIVATE_KNIGHT:
            case Phase.PROMOTE_KNIGHT:
            case Phase.MOVE_KNIGHT1:
            case Phase.MOVE_KNIGHT2:
            case Phase.MOVE_KNIGHT3:
            case Phase.MOVE_ROBBER1:
            case Phase.MOVE_ROBBER2:
            case Phase.MOVE_ROBBER3:
                text = '騎士アクション';
                break;
            case Phase.DEVELOPMENT1:
                text = '都市開発';
                break;
            case Phase.BUILD_METROPOLIS:
                text = 'メトロポリス'
                break;
            case Phase.GAIN_RESOURCE:
                text = '資源獲得'
                break;
            case Phase.BUILD_CITYWALL:
                text = '城壁'
                break;
            case Phase.DISCARD_CARD:
            case Phase.DISCARD_CARD_OTHER:
                text = 'カード廃棄'
                break;
            case Phase.USE_CARD:
            case Phase.CRANE    :
            case Phase.ENGINEER :
            case Phase.INVENTOR1:
            case Phase.INVENTOR2:
            case Phase.MEDICINE : 
            case Phase.SMITH1:
            case Phase.SMITH2:
            case Phase.BISHOP:
            case Phase.DESERTER1:
            case Phase.DESERTER2:
            case Phase.DESERTER3:
            case Phase.DIPLOMAT1:
            case Phase.DIPLOMAT2:
            case Phase.INTRIGUE:
            case Phase.SABOTEUR:
            case Phase.SPY1:
            case Phase.SPY2:
            case Phase.WEDDING:
            case Phase.ALCHEMIST:
            case Phase.COMMERCIAL_HARBOR1:
            case Phase.COMMERCIAL_HARBOR2:
            case Phase.MASTER_MERCHANT1:
            case Phase.MASTER_MERCHANT2:
            case Phase.MASTER_MERCHANT3:
            case Phase.MERCHANT_FLEET:
            case Phase.RESOURCE_MONOPOLY:
            case Phase.TRADE_MONOPOLY:
            case Phase.MERCHANT:       
                text = 'カード';
                break;
        }
    }
    
    this.addLabel(text, 502, 6);
}

Game.addCommand = function (game) {
    if (game.state === State.READY) {
        this.addReadyCommand(game);
    } else {
        switch (game.phase) {
            case Phase.SETUP_SETTLEMENT1:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('家を配置して下さい。', 585, 425); }
                break;
            case Phase.SETUP_ROAD1:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('道を配置して下さい。', 585, 425); }
                break;
            case Phase.SETUP_SETTLEMENT2:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('街を配置して下さい。', 585, 425); }
                break;
            case Phase.SETUP_ROAD2:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('道を配置して下さい。', 585, 425); }
                break;
            case Phase.DICE:
                if (this.hasPriorityUid(game, uid)) { this.addDiceCommand(game); }
                break;
            case Phase.BURST:
            case Phase.SABOTEUR:
                this.addBurstCommand(game);
                break;
            case Phase.WEDDING:
                this.addWeddingCommand(game);
                break;
            case Phase.ROBBER1:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('盗賊を移動して下さい。', 585, 425); }
                break;
            case Phase.ROBBER2:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('資源を略奪して下さい。', 585, 425); }
                break;
            case Phase.MAIN:
                if (this.hasPriorityUid(game, uid)) { this.addMainCommand(game); }
                break;
            case Phase.BUILD_ROAD:
            case Phase.ROAD_BUILDING1:
            case Phase.DIPLOMAT2:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('道を配置して下さい。', 585, 410);
                    
                    this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
                        Game.send('e');
                    });
                }
                break;
            case Phase.BUILD_SETTLEMENT:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('家を配置して下さい。', 585, 410);
                    
                    this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
                        Game.send('e');
                    });
                }
                break;
            case Phase.BUILD_CITY:
            case Phase.MEDICINE:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('街を配置して下さい。', 585, 410);
                    
                    this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
                        Game.send('e');
                    });
                }
                break;
            case Phase.DOMESTIC_TRADE1:
                if (this.hasPriorityUid(game, uid)) { this.addDomesticTrade1Command(game); }
                break;
            case Phase.DOMESTIC_TRADE2:
                if (this.hasPriorityUid(game, uid)) { this.addDomesticTrade2Command(game); }
                break;
            case Phase.DOMESTIC_TRADE3:
                this.addBroadcastTradeCommand(game);
                break;
            case Phase.INTERNATIONAL_TRADE:
                if (this.hasPriorityUid(game, uid)) { this.addInternationalTrade(game); }
                break;
            case Phase.SOLDIER1:
                if (this.hasPriorityUid(game, uid)) { this.addKnightActionCommand(game); }
                break;
            case Phase.SOLDIER2:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('資源を略奪して下さい。', 585, 425); }
                break;
            case Phase.ROAD_BUILDING2:
                if (this.hasPriorityUid(game, uid)) { this.addLabel('道を配置して下さい。', 585, 425); }
                break;
            case Phase.GAIN_RESOURCE:
                if (this.hasPriorityUid(game, uid)) { this.addGainResourceCommand(game); }
                break;
            case Phase.DISCARD_CARD:
            case Phase.DISCARD_CARD_OTHER:
                if (this.hasPriorityUid(game, uid)) { this.addDiscardCardCommand(game); }
                break;
            case Phase.BARBARIAN_SAVE2:
                if (this.hasPriorityUid(game, uid)) { this.addProgressCardCommand(game); }
                break;
            case Phase.BARBARIAN_SAVE1:
                if (this.hasPriorityUid(game, uid)) { this.addBarbarianResultCommand(game); }
                break;
            case Phase.DEVELOPMENT1:
                if (this.hasPriorityUid(game, uid)) { this.addDevelopmentCommand(game); }
                break;                
            case Phase.USE_CARD:
                if (this.hasPriorityUid(game, uid)) { this.addUseCardCommand(game); }
                break;                
            case Phase.CRANE:
                if (this.hasPriorityUid(game, uid)) { this.addDevelopmentCommand(game); }
                break;
            case Phase.ALCHEMIST:
                if (this.hasPriorityUid(game, uid)) { this.addAlchemistCommand(game); }
                break;
            case Phase.PROMOTE_KNIGHT:              
            case Phase.SMITH1:
            case Phase.SMITH2:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('昇格する騎士を選択してください。', 610, 400);
                    this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
                        Game.send('e');
                    });
                }
                break;
            case Phase.DESERTER1:
                if (this.hasPriorityUid(game, uid)) { this.addDeserterCommand(game); }
                break;
            case Phase.SPY1:
                if (this.hasPriorityUid(game, uid)) { this.addSpyCommand(game); }
                break;
            case Phase.SPY2:
                if (this.hasPriorityUid(game, uid)) { this.addSpyCardCommand(game); }
                break;
            case Phase.BUILD_KNIGHT:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('騎士を設置してください。', 610, 400);
                    this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
                        Game.send('e');
                    });
                }
                break;
            case Phase.DIPLOMAT1:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('道を除去してください。', 610, 400);
                    this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
                        Game.send('e');
                    });
                }
                break;
            case Phase.DESERTER3:
                if (this.hasPriorityUid(game, uid)) {
                    this.addLabel('騎士を設置してください。', 610, 400);
                }
                break; 
            case Phase.COMMERCIAL_HARBOR1:
                if (this.hasPriorityUid(game, uid)) { this.addCommercialHarborCommand(game); }
                break;                
            case Phase.COMMERCIAL_HARBOR2:
                if (this.hasPriorityUid(game, uid)) { this.addChoiceResourceCommand(game, game.priority[0], false, false); }
                break;                
            case Phase.COMMERCIAL_HARBOR3:
                if (this.hasPriorityUid(game, uid)) { this.addChoiceCommodityCommand(game, game.priority[0], false, false); }
                break;                
            case Phase.MASTER_MERCHANT1:
                if (this.hasPriorityUid(game, uid)) { this.addMasterMerchantCommand(game); }
                break;                
            case Phase.MASTER_MERCHANT2:
            case Phase.MASTER_MERCHANT3:
                if (this.hasPriorityUid(game, uid)) { this.addMasterMerchantSnoopResourceCommand (game); }
                break;                
            case Phase.MERCHANT_FLEET:
                if (this.hasPriorityUid(game, uid)) { this.addMerchantFleetCommand(game); }
                break;                
            case Phase.RESOURCE_MONOPOLY:
                if (this.hasPriorityUid(game, uid)) { this.addChoiceResourceCommand(game, game.active, true, true); }
                break;                
            case Phase.TRADE_MONOPOLY:
                if (this.hasPriorityUid(game, uid)) { this.addChoiceCommodityCommand(game, game.active, true, true); }
                break;                


        }
    }
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
    ) {
        canStart = true;
    }

    if (canJoin) {
        this.addSprite('view/button.png', 0, 610, 422, 80, 25, function () { // 着席
            Game.send('b');
        });
    }

    if (canLeave) {
        this.addSprite('view/button.png', 1, 700, 422, 80, 25, function () { // 離席
            Game.send('c');
        });

        if (canStart) { // 着席している人しか開始できない
            this.addSprite('view/button.png', 2, 520, 422, 80, 25, function () {
                Game.send('d'); // 開始
            });
        }
    }
}

Game.addBroadcastTradeCommand = function (game) {
    this.addSprite('view/skin.png', 0, 499, 338, 431, 205);

    var i;
    var len1 = game.playerSize;
    var trade = game.trade;
    for (i = 0; i < len1; i++) {
        if (i === game.active) {
            if (game.playerList[i].uid === uid) {
                this.addLabel('国内貿易オークション中', 505, i * 51 + 352, '18px');
                this.addSprite('view/button.png', 13, 815, i * 51 + 350, 80, 25, function() {
                    Game.send('e');
                }); 
            } else {
                this.addLabel('国内貿易オークション中', 585, i * 51 + 350, '24px');
            }
        } else {
            if (game.playerList[i].uid === uid) {
                if(game.playerList[i].trading) {

                    this.addLabel('出)', 500, i * 51 + 347);
                    this.addLabel('求)', 500, i * 51 + 367);
                    for (j = 0; j < 8; j++) {
                        let fontColor = 'black';
                        if(j === 0 || j === 4 || j === 5) {
                            fontColor = 'white';
                        }
                        this.addSprite('view/resource.png', j, j * 20 + 520, i * 51 + 347, 15, 15);
                        this.addSprite('view/resource.png', j, j * 20 + 520, i * 51 + 367, 15, 15);
                        this.addLabel(trade.input[j], j * 20 + 524, i * 51 + 347, '', fontColor);
                        this.addLabel(trade.output[j], j * 20 + 524, i * 51 + 367, '', fontColor);
                    }
                    this.addSprite('view/button.png', 12, 725, i * 51 + 351, 80, 25, function () {
                        var _i = i;
                        return function () {
                            Game.send('N' + _i);
                        };
                    }());
                    
                    this.addSprite('view/button.png', 13, 815, i * 51 + 351, 80, 25, function () {
                        var _i = i;
                        return function () {
                            Game.send('O' + _i);
                        };
                    }());
                } 
            } else if(game.playerList[i].trading) {
                this.addLabel('交渉中', 680, i * 51 + 350, '24px');
            } else {
                this.addLabel('交渉決裂', 670, i * 51 + 350, '24px');
            }
        }
    }
}


Game.addBurstCommand = function (game) {
    this.addSprite('view/skin.png', 0, 499, 338, 431, 205);

    var i;
    var len1 = game.playerSize;
    for (i = 0; i < len1; i++) {
        if (game.playerList[i].burst > 0) {
            if (game.playerList[i].uid === uid) {
                this.addLabel('バースト中', 509, i * 51 + 345);
                this.addLabel('あと' + game.playerList[i].burst + '枚廃棄', 509, i * 51 + 365);

                var j;
                for (j = 0; j < 8; j++) {
                    this.addSprite('view/resource-button.png', j + 8, j * 40 + 598, i * 51 + 347, 30, 30, function () {
                        if (game.playerList[i].resource[j] > 0) {
                            var _i = i;
                            var _j = j;

                            return function () {
                                Game.send('k' + _i + ' ' + _j);
                            };
                        }
                    } ());
                }
            } else {
                this.addLabel('バースト中 あと' + game.playerList[i].burst + '枚廃棄', 517, i * 51 + 350, '24px');
            }
        } else {
            this.addLabel('待機中', 618, i * 51 + 350, '24px');
        }
    }
}

Game.addWeddingCommand = function (game) {
    this.addSprite('view/skin.png', 0, 499, 338, 431, 205);

    var i;
    var len1 = game.playerSize;
    for (i = 0; i < len1; i++) {
        if (game.playerList[i].burst > 0) {
            if (game.playerList[i].uid === uid) {
                this.addLabel('ご祝儀選択', 509, i * 51 + 345);
                this.addLabel('あと' + game.playerList[i].burst + '枚', 509, i * 51 + 365);

                var j;
                for (j = 0; j < 8; j++) {
                    this.addSprite('view/resource-button.png', j + 8, j * 40 + 598, i * 51 + 347, 30, 30, function () {
                        if (game.playerList[i].resource[j] > 0) {
                            var _i = i;
                            var _j = j;

                            return function () {
                                Game.send('k' + _i + ' ' + _j);
                            };
                        }
                    } ());
                }
            } else {
                this.addLabel('ご祝儀選択 あと' + game.playerList[i].burst + '枚', 517, i * 51 + 350, '24px');
            }
        } else {
            this.addLabel('待機中', 618, i * 51 + 350, '24px');
        }
    }
}

Game.addDomesticTrade1Command = function (game) {
    this.addSprite('view/skin.png', 2, 499, 338, 431, 205);
    
    this.addLabel('国内貿易をして下さい。', 585, 352);

    var i;
    for (i = 0; i < 8; i++) {
        var label = this.addLabel('' + Game.trade.input[i], i * 50 + 550, 405);
        let maxResource = 19;
        if(i >= Resource.CLOTH) {
            maxResource = 12;
        }
        
        this.addSprite('view/updown.png', 0, i * 50 + 567, 398, 10, 13, function () {
            var _i = i;
            var _label = label;

            return function () {
                if (Game.trade.input[_i] + 1 <= game.playerList[game.active].resource[_i]) {
                    _label.text = '' + ++Game.trade.input[_i];
                }
            };
        }());
        
        this.addSprite('view/updown.png', 1, i * 50 + 567, 412, 10, 13, function () {
            var _i = i;
            var _label = label;
            
            return function () {
                if (Game.trade.input[_i] > 0) { _label.text = '' + --Game.trade.input[_i]; }
            };
        }());
        
        label = this.addLabel('' + Game.trade.output[i], i * 50 + 550, 439);
        
        this.addSprite('view/updown.png', 0, i * 50 + 567, 431, 10, 13, function () {
            var _i = i;
            var _label = label;
            var _maxResource = maxResource;
            
            return function () {
                if (Game.trade.output[_i] < _maxResource) { _label.text = '' + ++Game.trade.output[_i]; }
            };
        }());
        
        this.addSprite('view/updown.png', 1, i * 50 + 567, 445, 10, 13, function () {
            var _i = i;
            var _label = label;
            
            return function () {
                if (Game.trade.output[_i] > 0) { _label.text = '' + --Game.trade.output[_i]; }
            };
        }());
    }
    
    this.addLabel(game.playerList[0].uid, 520, 460);
    this.addSprite('view/button.png', 14, 520, 475, 80, 25, function () {
        if (game.active !== 0) {
            return function () {
                Game.send('v0 ' + Game.trade.input.join(' ') + ' ' + Game.trade.output.join(' '));
            };
        }
    }());
    
    this.addLabel(game.playerList[1].uid, 610, 460);
    this.addSprite('view/button.png', 15, 610, 475, 80, 25, function () {
        if (game.active !== 1) {
            return function () {
                Game.send('v1 ' + Game.trade.input.join(' ') + ' ' + Game.trade.output.join(' '));
            };
        }
    }());
    
    this.addLabel(game.playerList[2].uid, 700, 460);
    this.addSprite('view/button.png', 16, 700, 475, 80, 25, function () {
        if (game.active !== 2) {
            return function () {
                Game.send('v2 ' + Game.trade.input.join(' ') + ' ' + Game.trade.output.join(' '));
            };
        }
    }());
    
    if (game.playerSize === 4) {
        this.addLabel(game.playerList[3].uid, 520, 500);
        this.addSprite('view/button.png', 17, 520, 515, 80, 25, function () {
            if (game.active !== 3) {
                return function () {
                    Game.send('v3 ' + Game.trade.input.join(' ') + ' ' + Game.trade.output.join(' '));
                };
            }
        }());
    }
    
    this.addSprite('view/button.png', 22, 610, 515, 80, 25, function () {
        Game.send('v9 ' + Game.trade.input.join(' ') + ' ' + Game.trade.output.join(' '));
    });
    this.addSprite('view/button.png', 13, 700, 515, 80, 25, function () {
        Game.send('e');
    });
}

Game.addDomesticTrade2Command = function (game) {
    this.addSprite('view/skin.png', 2, 499, 338, 431, 205);
    
    this.addLabel('国内貿易の提案が着ました。', 565, 352);

    var i;
    for (i = 0; i < 8; i++) {
        this.addLabel('' + game.trade.input[i], i * 50 + 550, 405);
        this.addLabel('' + game.trade.output[i], i * 50 + 550, 439);
    }
    
    this.addSprite('view/button.png', 12, 570, 480, 80, 25, function () {
        Game.send('w');
    });
    
    this.addSprite('view/button.png', 13, 660, 480, 80, 25, function () {
        Game.send('x');
    });
}

Game.addInternationalTrade = function (game) {
    this.addSprite('view/skin.png', 2, 499, 338, 431, 205);
    
    this.addLabel('海外貿易をして下さい。', 585, 352);
    
    var poolLabel = this.addLabel('残り:' + Game.trade.pool, 635, 465);

    var i;
    for (i = 0; i < 8; i++) {
        var cost;

        if (game.playerList[game.active].harbor[i + 1]) {
            cost = 2;
        } else if (game.playerList[game.active].harbor[Harbor.GENERIC]) {
            cost = 3;
        } else {
            cost = 4;
        }

        if(Game.hasTradePower(game) && i >= Resource.CLOTH) {
            cost = 2;
        }

        if (game.merchantInfo[1] === game.active && game.landList[game.merchantInfo[0]] === i) {
            cost = 2;
        }

        if(game.playerList[game.active].merchantFleetResource.some(r => r === i)) {
            cost = 2;
        }
        
        this.addLabel('' + cost, i * 50 + 560, 380);
        
        var tradeLabel = this.addLabel('' + Game.trade.input[i], i * 50 + 550, 405);
        
        this.addSprite('view/updown.png', 0, i * 50 + 567, 398, 10, 13, function () {
            var _i = i;
            var _poolLabel = poolLabel;
            var _tradeLabel = tradeLabel;
            var _cost = cost;
            
            return function () {
                if (Game.trade.input[_i] + _cost <= game.playerList[game.active].resource[_i]) {
                    _poolLabel.text = '残り:' + ++Game.trade.pool;
                    Game.trade.input[_i] += _cost;
                    _tradeLabel.text = '' + Game.trade.input[_i];
                }
            };
        }());
        
        this.addSprite('view/updown.png', 1, i * 50 + 567, 412, 10, 13, function () {
            var _i = i;
            var _poolLabel = poolLabel;
            var _tradeLabel = tradeLabel;
            var _cost = cost;
            
            return function () {
                if (Game.trade.input[_i] > 0) {
                    _poolLabel.text = '残り:' + --Game.trade.pool;
                    Game.trade.input[_i] -= _cost;
                    _tradeLabel.text = '' + Game.trade.input[_i];
                }
            };
        }());
        
        tradeLabel = this.addLabel('' + Game.trade.output[i], i * 50 + 550, 439);
        
        this.addSprite('view/updown.png', 0, i * 50 + 567, 431, 10, 13, function () {
            var _i = i;
            var _poolLabel = poolLabel;
            var _tradeLabel = tradeLabel;
            
            return function () {
                if (Game.trade.pool > 0 && game.resourceStock[_i] > 0) {
                    _poolLabel.text = '残り:' + --Game.trade.pool;
                    _tradeLabel.text = '' + ++Game.trade.output[_i];
                }
            };
        }());
        
        this.addSprite('view/updown.png', 1, i * 50 + 567, 445, 10, 13, function () {
            var _i = i;
            var _poolLabel = poolLabel;
            var _tradeLabel = tradeLabel;
            
            return function () {
                if (Game.trade.output[_i] > 0) {
                    _poolLabel.text = '残り:' + ++Game.trade.pool;
                    _tradeLabel.text = '' + --Game.trade.output[_i];
                }
            };
        }());
    }
    
    this.addSprite('view/button.png', 12, 570, 490, 80, 25, function () {
        var i;

        if(Game.trade.pool === 0) {
            for (i = 0; i < 8; i++) {
                if (Game.trade.input[i] > 0) {
                    Game.send('z' + Game.trade.input.join(' ') + ' ' + Game.trade.output.join(' '));
                    break;
                }
            }
        }
    });
    
    this.addSprite('view/button.png', 13, 660, 490, 80, 25, function () {
        Game.send('e');
    });
}

Game.addKnightActionCommand = function (game) {
    this.addLabel('騎士行動を選択してください。', 610, 400);
    this.addSprite('view/knight-action-button.png', 0, 540, 425, 80, 26, function () { // 設置
        if (
            game.playerList[game.active].knightStock[0] > 0 &&
            game.playerList[game.active].resource[Resource.WOOL] >= 1 &&
            game.playerList[game.active].resource[Resource.ORE] >= 1 &&
            Game.hasCanBuildKnight(game)) {
            return function () {
                Game.send('F');
            };
        }
    }());    
    this.addSprite('view/knight-action-button.png', 4, 625, 425, 80, 26, function () { // 活性化
        if (
            Game.hasCanActivateKnight(game) &&
            game.playerList[game.active].resource[Resource.GRAIN] >= 1) {
            return function () {
                Game.send('G');
            };
        }
    }());    
    this.addSprite('view/knight-action-button.png', 5, 710, 425, 80, 26, function () { // 昇格
        if (
            Game.hasCanPromoteKnight(game) &&
            game.playerList[game.active].resource[Resource.WOOL] >= 1 &&
            game.playerList[game.active].resource[Resource.ORE] >= 1) {
            return function () {
                Game.send('I');
            };
        }
    }());    
    this.addSprite('view/knight-action-button.png', 1, 795, 425, 80, 26, function () { // 移動
        if (Game.hasActiveKnight(game) && Game.hasCanKnightMove(game)) {
            return function () {
                Game.send('K');
            };
        }
    }());
 
    this.addSprite('view/knight-action-button.png', 3, 540, 455, 80, 26, function () { // 盗賊排除
        var activeKnights = Game.hasCanRobberMove(game);
        if (game.isBarbarianArrivedOnce && Game.hasActiveKnight(game) && activeKnights.length !== 0) {
            return function () {
                Game.send('R');
            };
        }
    }());   
    this.addSprite('view/button.png', 13, 625, 455, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }());    
}

Game.addDevelopmentCommand = function (game) {
    this.addLabel('都市開発を選択してください。', 610, 370);
    this.addSprite('view/resource.png', Resource.CLOTH, 622, 435, 15, 15);
    this.addSprite('view/development-button.png', 0, 610, 390, 40, 40, function () { // 経済
        var  current = game.playerList[game.active].development[Development.TRADE];
        var resourceNeeded = current + 1;
        var type = Development.TRADE;
        if(game.phase === Phase.CRANE) {
            resourceNeeded = current;
            type += 3;
        }
        if (game.playerList[game.active].resource[Resource.CLOTH] >= resourceNeeded && current != 5) {
            if (current < 3 || Game.hasCity(game, game.active)) {
                return function () {
                    var _type = type;
                    Game.send('E' + _type);
                };
            }
        }
    }());    
    this.addSprite('view/resource.png', Resource.COIN, 682, 435, 15, 15);
    this.addSprite('view/development-button.png', 1, 670, 390, 40, 40, function () { // 政治
        var  current = game.playerList[game.active].development[Development.POLITICS];
        var resourceNeeded = current + 1;
        var type = Development.POLITICS;
        if(game.phase === Phase.CRANE) {
            resourceNeeded = current;
            type += 3;
        }
        if (game.playerList[game.active].resource[Resource.COIN] >= resourceNeeded && current != 5) {
            if (current < 3 || Game.hasCity(game, game.active)) {
                return function () {
                    var _type = type;
                    Game.send('E' + _type);
                };
            }
        }
    }());    
    this.addSprite('view/resource.png', Resource.PAPER, 742, 435, 15, 15);
    this.addSprite('view/development-button.png', 2, 730, 390, 40, 40, function () { // 科学
        var  current = game.playerList[game.active].development[Development.SCIENCE];
        var resourceNeeded = current + 1;
        var type = Development.SCIENCE;
        if(game.phase === Phase.CRANE) {
            resourceNeeded = current;
            type += 3;
        }
        if (game.playerList[game.active].resource[Resource.PAPER] >= resourceNeeded && current != 5) {
            if (current < 3 || Game.hasCity(game, game.active)) {
                return function () {
                    var _type = type;
                    Game.send('E' + _type);
                };
            }
        }
    }());
    this.addSprite('view/button.png', 13, 610, 460, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }());    
}

Game.addUseCardCommand = function (game) {
    this.addLabel('使用するカードを選択して下さい。', 580, 400);
    for (let card = 0; card < game.playerList[game.priority[0]].progressCard.length; card++) {
        let currentCard = game.playerList[game.priority[0]].progressCard[card];
        if(currentCard !== Card.ALCHEMIST) { // 錬金術師はここでは使えない.
            this.addSprite('view/card.png', currentCard, card * 56 + 560, 425, 55, 20, function () {
                var _i = currentCard;
                if(Game.canUseCard(game, currentCard)) {
                    return function () {
                        Game.send('U' + _i);
                    };
                }
            }());
        }
    }
    this.addSprite('view/button.png', 13, 610, 460, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }()); 
}
Game.addSpyCardCommand = function (game) {
    this.addLabel('略奪するカードを選択して下さい。', 580, 400);
    for (let card = 0; card < game.playerList[game.spySelecting].progressCard.length; card++) {
        let currentCard = game.playerList[game.spySelecting].progressCard[card];
        this.addSprite('view/card.png', currentCard, card * 56 + 560, 425, 55, 20, function () {
            var _i = currentCard;
            return function () {
                Game.send('H' + _i);
            };
        }());
    }
}

Game.addDeserterCommand = function (game) {
    this.addLabel('使用するプレイヤーを選択して下さい。', 580, 380);
    for (let player = 0; player < game.playerSize; player++) {
        if (player === game.active) {
            continue;
        }
        this.addSprite('view/player.png', player, player * 85 + 540, 425, 80, 25, function () {
            var _i = player;
            if(Game.hasKnight(game, player)) {
                return function () {
                    Game.send('H' + _i);
                };
            }
        }());
        this.addLabel(game.playerList[player].uid, player * 85 + 550, 410);
    }
    this.addSprite('view/button.png', 13, 610, 460, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }()); 
}
Game.addCommercialHarborCommand = function (game) {
    this.addLabel('使用するプレイヤーを選択して下さい。', 580, 380);
    for (let player = 0; player < game.playerSize; player++) {
        if (player === game.active) {
            continue;
        }
        if(!game.commercialHarborDone.some(p => p === player)) {
            this.addSprite('view/player.png', player, player * 85 + 540, 425, 80, 25, function () {
                var _i = player;
                if(Game.hasAnyResource(game, player)) {
                    return function () {
                        Game.send('H' + _i);
                    };
                }
            }());
            this.addLabel(game.playerList[player].uid, player * 85 + 550, 410);
        }
    }

    this.addSprite('view/button.png', 13, 610, 460, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }()); 
}
Game.addMasterMerchantCommand = function (game) {
    this.addLabel('使用するプレイヤーを選択して下さい。', 580, 380);
    for (let player = 0; player < game.playerSize; player++) {
        if (player === game.active) {
            continue;
        }
        if(Game.getScore(game.playerList[player])  > Game.getScore(game.playerList[game.active])) {
            this.addSprite('view/player.png', player, player * 85 + 540, 425, 80, 25, function () {
                var _i = player;

                if(Game.hasAnyResource(game, player))
                {
                    return function () {
                        Game.send('H' + _i);
                    };
                }
            }());
            this.addLabel(game.playerList[player].uid, player * 85 + 550, 410);
        }
    }

    this.addSprite('view/button.png', 13, 610, 460, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }()); 
}

Game.addMasterMerchantSnoopResourceCommand = function (game) {
    this.addLabel('略奪する資源を選択して下さい。', 580, 350);
    var i;
    var k = 0;

    for (i = 0; i < 8; i++) {
        if (game.playerList[game.masterMerchantSelecting].resource[i] > 0) {
            this.addSprite('view/resource.png', i, k * 38 + 563, 380, 15, 15);
            this.addLabel('' + game.playerList[game.masterMerchantSelecting].resource[i], k * 38 + 579, 380, '12px');

            k++;
        }
    }

    var l = 0;
    for (i = 0; i < 8; i++) {
        if(game.playerList[game.masterMerchantSelecting].resource[i] > 0) {
            this.addSprite('view/resource-button.png', i + 16, l * 40 + 555, 425, 30, 30, function () {
                var _i = i;
                return function () {
                    Game.send('H' + _i);
                };
            }());
            l++;
        }
    }
}

Game.getScore = function(player) {
    return player.baseScore + player.bonusScore + player.victoryPoint;
}

Game.addSpyCommand = function (game) {
    this.addLabel('使用するプレイヤーを選択して下さい。', 580, 380);
    for (let player = 0; player < game.playerSize; player++) {
        if (player === game.active) {
            continue;
        }
        this.addSprite('view/player.png', player, player * 85 + 540, 425, 80, 25, function () {
            var _i = player;
            if(Game.hasCard(game, _i)) {
                return function () {
                    Game.send('H' + _i);
                };
            }
        }());
        this.addLabel(game.playerList[player].uid, player * 85 + 550, 410);
    }
    this.addSprite('view/button.png', 13, 610, 460, 80, 25, function () { // 取り消し
        return function () {
            Game.send('e');
        };
    }()); 
}

Game.addDeserterCommand2 = function (game) {
    if (
           game.state === State.PLAYING
        && (game.phase === Phase.DESERTER2)
        && this.hasPriorityUid(game, uid)
    ) {
        this.addLabel('除去する騎士を選択して下さい。', 580, 400);
        var i;
        var len1 = game.knightList.length;
        for (i = 0; i < len1; i++) {
            var color = game.knightList[i] & 0x0000ff;
            
            if (color === game.priority[0]) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.4);
            }
        }
    }
}


Game.addDiceCommand = function (game) {

    this.alchemistDice.dice1 = Index.NONE;
    this.alchemistDice.dice2 = Index.NONE;

    this.addSprite('view/skin.png', 1, 499, 338, 431, 205);
    
    this.addSprite('view/button.png', 3, 570, 384, 80, 25, function () {
        Game.send('j');
    });

    this.addSprite('view/button.png', 20, 660, 384, 80, 25, function () {
        if (Game.hasSpecificCard(game, game.active, Card.ALCHEMIST)) {
            return function () {
                Game.send('U' + Card.ALCHEMIST);
            };
        }
    }());

    this.addBasicCommand(game);
}

Game.addBasicCommand = function (game) {
    this.addSprite('view/button.png', 10, 610, 490, 80, 25, function () {
        if (game.playerList[game.active].baseScore + game.playerList[game.active].bonusScore + game.playerList[game.active].victoryPoint >= 13) {
            return function () {
                Game.send('A');
            };
        }
    }());

}

Game.addAlchemistCommand = function (game) {
    this.addSprite('view/skin.png', 3, 499, 338, 431, 205);
    this.addLabel('出目を選択して下さい。', 630, 355);
    let sprite1 = this.addSprite('view/dice-selecting.png', 0, 888, 385, 31, 3, undefined, 0);
    
    for(let i = 0; i < 6; i++) {
        this.addSprite('view/dice.png', i, i * 35 + 598, 388, 31, 31, function () {
            var _i = i;
            var _sprite = sprite1;
            return function () {
                Game.alchemistDice.dice1 = _i + 1;
                _sprite.x = _i * 35 + 598;
                _sprite.opacity = 1;
            };
        }());
    }
    let sprite2 = this.addSprite('view/dice-selecting.png', 0, 888, 437, 31, 3, undefined, 0);
    
    for(let i = 0; i < 6; i++) {
        this.addSprite('view/dice.png', i + 6, i * 35 + 598, 440, 31, 31, function () {
            var _i = i;
            var _sprite = sprite2;
            return function () {
                Game.alchemistDice.dice2 = _i + 1;
                _sprite.x = _i * 35 + 598;
                _sprite.opacity = 1;
            };
        }());
    }

    this.addSprite('view/button.png', 12, 610, 500, 80, 25, function () {
        return function () {
            Game.send('H' + Game.alchemistDice.dice1 + ' ' + Game.alchemistDice.dice2);
        };
    }());

    this.addSprite('view/button.png', 13, 725, 500, 80, 25, function () {
        Game.send('e');
    });
}

// Begin: カード
Game.hasCard = function (game, color, exclude = []) {
    return game.playerList[color].progressCard.filter(c => !exclude.some(e => e === c)).length > 0;
}

Game.hasSpecificCard = function (game, color, card) {
    return game.playerList[color].progressCard.filter(c => c === card).length > 0;
}

Game.hasLand = function (game, color, resource) {
    const landList = game.landList.map((land, index) => {
        return {
            land: land,
            index: index
        };
    })
    .filter(l => l.land === resource);
    let count = 0;
    landList.forEach(l => {
        if(LAND_LINK[l.index].some(intersection => (game.settlementList[intersection] & 0x00ff) === color)) {
            count++;
        }
    });
    return count > 0;
}

Game.canUseCard = function (game, card) {
    switch(card) {
        case Card.CRANE:
            return Game.canDevelope(game, game.active);
        case Card.IRRIGATION:
            return Game.hasLand(game, game.active, Resource.GRAIN);
        case Card.MINING:
            return Game.hasLand(game, game.active, Resource.ORE);
        case Card.ENGINEER:
            return game.playerList[game.active].cityWallStock > 0
            && Game.hasCanBuildCityWall(game, game.active);
        case Card.MEDICINE:
             return (game.playerList[game.active].cityStock > 0 || Game.hasTmpSettlement(game, game.active))
             && game.playerList[game.active].resource[Resource.ORE] >= 2
             && game.playerList[game.active].resource[Resource.GRAIN] >= 1
             && Game.hasCanBuildCity(game)
        case Card.ROAD_BUILDING:
            return game.playerList[game.active].roadStock > 0
            && Game.hasCanBuildRoad(game);
        case Card.SMITH:
            return Game.hasCanPromoteKnight(game);
        case Card.BISHOP:
            return game.isBarbarianArrivedOnce;
        case Card.DESERTER:
            let hasKnight = false;
            for(let i = 0; i < game.playerSize; i++) {
                if (i === game.active) { continue; }
                if(Game.hasKnight(game, i)) {
                    hasKnight = true;
                }
            }
            return hasKnight;
        case Card.INTRIGUE:
            return Game.hasDiplasableKnight(game);
        case Card.DIPLOMAT:
            return Game.hasOpenRoad(game);
        case Card.WARLORD:
            return Game.hasCanActivateKnight(game);
        case Card.SABOTEUR:
            let activePlayer = game.playerList[game.active];
            return game.playerList.filter((p, i) => i !== game.active).some(p => p.resource.reduce((p, c) => p + c, 0) > 1
                   && (p.baseScore + p.bonusScore + p.victoryPoint) >= (activePlayer.baseScore + activePlayer.bonusScore + activePlayer.victoryPoint));
        case Card.SPY:
            return game.playerList.some((p, i) => i !== game.active && Game.hasCard(game, i));
        case Card.WEDDING:
        case Card.MASTER_MERCHANT:
            let activePlayer2 = game.playerList[game.active];
            return game.playerList.filter((p, i) => i !== game.active).some(p => p.resource.reduce((p, c) => p + c, 0) > 0
                   && (p.baseScore + p.bonusScore + p.victoryPoint) > (activePlayer2.baseScore + activePlayer2.bonusScore + activePlayer2.victoryPoint));
        case Card.COMMERCIAL_HARBOR:
            var hasResource = Game.hasResource(game, game.active);
            var noGainResource = game.playerList.filter((p, i) => i !== game.active).every(p => p.resource.reduce((p, c) => p + c, 0) <= 0)

            return hasResource && !noGainResource;
        default:
            return true;
    }
}

Game.addDiscardCardCommand = function (game) {
    this.addLabel('破棄するカードを選択して下さい。', 580, 400);
    for (let card = 0; card < game.playerList[game.priority[0]].progressCard.length; card++) {
        this.addSprite('view/card.png', game.playerList[game.priority[0]].progressCard[card], card * 56 + 560, 425, 55, 20, function () {
            var _i = card;
            return function () {
                Game.send('M' + _i);
            };
        }());
    }
}

Game.addProgressCardCommand = function (game) {
    this.addLabel('カードを選択して下さい。', 580, 400);
    var i;
    for (i = 0; i < 3; i++) {
        this.addSprite('view/card-back.png', i, i * 40 + 560, 425, 30, 30, function () {
            var _i = i;

            return function () {
                Game.send('T' + _i);
            };
        }());
    }
}

// End: カード

Game.addYearOfPlentyCommand = function (game) {
    this.addLabel('資源を選択して下さい。', 580, 400);

    var command = '';

    if (game.phase === Phase.YEAR_OF_PLENTY1) {
        command = 'J';
    } else {
        command = 'K';
    }

    var i;
    for (i = 0; i < 8; i++) {
        this.addSprite('view/resource-button.png', i + 16, i * 40 + 560, 425, 30, 30, function () {
            var _i = i;

            return function () {
                Game.send(command + _i);
            };
        }());
    }
}

Game.addGainResourceCommand = function (game) {
    this.addLabel('資源を選択して下さい。', 630, 380);
    var i;
    for (i = 0; i < 5; i++) {
        if(game.resourceStock[i] > 0) {
            this.addSprite('view/resource-button.png', i + 16, i * 40 + 560, 425, 30, 30, function () {
                var _i = i;
                return function () {
                    Game.send('J' + _i);
                };
            }());
        }
    }
}

Game.addMerchantFleetCommand = function (game) {
    this.addLabel('資源を選択して下さい。', 630, 380);
    var i;
    for (i = 0; i < 8; i++) {
        this.addSprite('view/resource-button.png', i, i * 40 + 560, 425, 30, 30, function () {
            var _i = i;
            return function () {
                Game.send('H' + _i);
            };
        }());
    }

    this.addSprite('view/button.png', 13, 670, 480, 80, 25, function () {
        Game.send('e');
    });
}

Game.addChoiceResourceCommand = function (game, player, cancelable, dontCare) {
    this.addLabel('資源を選択して下さい。', 630, 380);
    var i;
    for (i = 0; i < 5; i++) {
        if(dontCare || game.playerList[player].resource[i] > 0) {
            this.addSprite('view/resource-button.png', i, i * 40 + 615, 425, 30, 30, function () {
                var _i = i;
                return function () {
                    Game.send('H' + _i);
                };
            }());
        }
    }

    if(cancelable) {
        this.addSprite('view/button.png', 13, 670, 480, 80, 25, function () {
            Game.send('e');
        });
    }
}
Game.addChoiceCommodityCommand = function (game, player, cancelable, dontCare) {
    this.addLabel('交易品を選択して下さい。', 630, 380);
    var i;
    for (i = 5; i < 8; i++) {
        if(dontCare || game.playerList[player].resource[i] > 0) {
            this.addSprite('view/resource-button.png', i, (i - 5) * 40 + 650, 425, 30, 30, function () {
                var _i = i;
                return function () {
                    Game.send('H' + _i);
                };
            }());
        }
    }

    if(cancelable) {
        this.addSprite('view/button.png', 13, 670, 480, 80, 25, function () {
            Game.send('e');
        });
    }
}



Game.addMonopolyCommand = function (game) {
    this.addLabel('資源を選択して下さい。', 630, 380);

    var i;
    for (i = 0; i < 8; i++) {
        this.addSprite('view/resource-button.png', i, i * 40 + 560, 425, 30, 30, function () {
            var _i = i;

            return function () {
                Game.send('M' + _i);
            };
        }());
    }
}



Game.addBarbarianResultCommand = function (game) {
    Game.send('P');
}

Game.addMainCommand = function (game) {
    this.trade.pool = 0;

    var i;
    for (i = 0; i < 8; i++) { this.trade.input[i] = this.trade.output[i] = 0; }
    
    this.addSprite('view/skin.png', 1, 499, 338, 431, 205);
    
    this.addSprite('view/button.png', 4, 520, 354, 80, 25, function () {
        if (
               game.playerList[game.active].roadStock > 0
            && game.playerList[game.active].resource[Resource.BRICK] >= 1
            && game.playerList[game.active].resource[Resource.LUMBER] >= 1
            && Game.hasCanBuildRoad(game)
        ) {
            return function () {
                return Game.send('n');
            };
        }
    }());
    
    this.addSprite('view/button.png', 5, 610, 354, 80, 25, function () {
        if (
               game.playerList[game.active].settlementStock > 0
            && game.playerList[game.active].resource[Resource.BRICK] >= 1
            && game.playerList[game.active].resource[Resource.WOOL] >= 1
            && game.playerList[game.active].resource[Resource.GRAIN] >= 1
            && game.playerList[game.active].resource[Resource.LUMBER] >= 1
            && Game.hasCanBuildSettlement(game)
        ) {
            return function () {
                return Game.send('p');
            };
        }
    }());
    
    this.addSprite('view/button.png', 6, 700, 354, 80, 25, function () {
        if (
               (game.playerList[game.active].cityStock > 0 || Game.hasTmpSettlement(game, game.active) )
            && game.playerList[game.active].resource[Resource.ORE] >= 3
            && game.playerList[game.active].resource[Resource.GRAIN] >= 2
            && Game.hasCanBuildCity(game)
        ) {
            return function () {
                return Game.send('r');
            };
        }
    }());

    this.addSprite('view/button.png', 18, 790, 354, 80, 25, function () { // 騎士アクション
        return function () {
            Game.send('C');
        };
    }());
    
   
    this.addSprite('view/button.png', 8, 520, 384, 80, 25, function () { // 国内貿易
        Game.send('u');
    });
    
    this.addSprite('view/button.png', 9, 610, 384, 80, 25, function () { // 海外貿易
        Game.send('y');
    });

    this.addSprite('view/button.png', 23, 700, 384, 80, 25, function () { // 都市開発
        if(Game.canDevelope(game, game.active)) {
            return function () {
                Game.send('D');
            };
        }
    }());
    this.addSprite('view/button.png', 7, 520, 414, 80, 25, function () { // カード
        if(Game.hasCard(game, game.active, [Card.ALCHEMIST])) {
            return function () {
                Game.send('Q');
            };
        }
    }());

    this.addSprite('view/button.png', 24, 790, 384, 80, 25, function () { // 城壁
        if (
            game.playerList[game.active].cityWallStock > 0
         && game.playerList[game.active].resource[Resource.BRICK] >= 2
         && Game.hasCanBuildCityWall(game, game.active)
     ) {
         return function () {
             return Game.send('t');
         };
     }
    }());

    this.addSprite('view/button.png', 10, 610, 490, 80, 25, function () {
        if (game.playerList[game.active].baseScore + game.playerList[game.active].bonusScore + game.playerList[game.active].victoryPoint >= 13) {
            return function () {
                Game.send('A');
            };
        }
    }());
    
    this.addSprite('view/button.png', 11, 700, 490, 80, 25, function () {
        Game.send('B');
    });

}

Game.addDice = function (game) {
    if (game.dice1 !== Index.NONE) {
        this.addSprite('view/dice.png', 12 + game.event - 1, 30, 69, 31, 31);
        this.addSprite('view/dice.png', game.dice1 - 1, 15, 100, 31, 31);
        this.addSprite('view/dice.png', 6 + game.dice2 - 1, 46, 100, 31, 31);
    }
}

Game.sumResource = function (game, color) {
    return game.playerList[color].resource[Resource.BRICK]
          + game.playerList[color].resource[Resource.WOOL]
          + game.playerList[color].resource[Resource.ORE]
          + game.playerList[color].resource[Resource.GRAIN]
          + game.playerList[color].resource[Resource.LUMBER]
          + game.playerList[color].resource[Resource.CLOTH]
          + game.playerList[color].resource[Resource.COIN]
          + game.playerList[color].resource[Resource.PAPER];

}

Game.addPlayer = function (game, color) {
    if (game.state === State.PLAYING) {
        if (game.active === color) { this.addSprite('view/active.png', 0, 503, color * 78 + 29, 15, 15); }
        if (Game.hasPriorityColor(game, color)) {
            this.addSprite('view/priority.png', 0, 523, color * 78 + 26, 112, 21);
        }
    }
    
    this.addLabel(game.playerList[color].uid, 524, color * 78 + 28);

    // should visible for all player.
    this.addLabel((game.playerList[color].baseScore + game.playerList[color].bonusScore) + '(+' + game.playerList[color].victoryPoint + ')点', 640, color * 78 + 28, '12px');
    // if (game.state === State.READY || game.playerList[color].uid === uid) {
    //     this.addLabel((game.playerList[color].baseScore + game.playerList[color].bonusScore) + '(+' + game.playerList[color].victoryPoint + ')点', 640, color * 78 + 28, '12px');
    // } else {
    //     this.addLabel('??(+' + game.playerList[color].victoryPoint + ')点', 640, color * 78 + 28, '12px');
    // }

    this.addLabel('Ⅰ:' + game.playerList[color].knightStock[0], 697, color * 78 + 28, '12px');
    this.addLabel('Ⅱ:' + game.playerList[color].knightStock[1], 729, color * 78 + 28, '12px');
    this.addLabel('Ⅲ:' + game.playerList[color].knightStock[2], 761, color * 78 + 28, '12px');
    this.addLabel('道:' + game.playerList[color].roadStock, 640, color * 78 + 43, '12px');
    this.addLabel('家:' + game.playerList[color].settlementStock, 675, color * 78 + 43, '12px');
    this.addLabel('街:' + game.playerList[color].cityStock, 704, color * 78 + 43, '12px');
    this.addLabel('壁:' + game.playerList[color].cityWallStock, 733, color * 78 + 43, '12px');

    
    for(let developmentIndex = 0; developmentIndex < 3; developmentIndex++) {
        for(let progress = 0; progress < game.playerList[color].development[developmentIndex]; progress++) {
            switch(progress) {
                case 0:
                case 1:
                    this.addSprite('view/development-active.png', developmentIndex, /* x */ developmentIndex * 40 - progress * 13 + 823, /* y */ color * 78 + 76, /* width */ 13, /* height */ 13)
                    break;
                case 2:
                        this.addSprite('view/development-active.png', developmentIndex, /* x */ developmentIndex * 40 + 810, /* y */ color * 78 + 63, /* width */ 13, /* height */ 13)
                        break;
                case 3:
                case 4:
                    this.addSprite('view/development-active.png', developmentIndex, /* x */ developmentIndex * 40 + (progress-3) * 13 + 810, /* y */ color * 78 + 50, /* width */ 13, /* height */ 13)
                    break;
            }
        }
    }
    for(let metropolisIndex = 0; metropolisIndex < 3; metropolisIndex++) {
        if(game.playerList[color].metropolisIndex[metropolisIndex] !== Index.NONE) {
            this.addSprite('view/metropolis-prize.png', 0, /* x */ metropolisIndex * 40 + 813, /* y */ color * 78 + 30, /* width */ 19, /* height */ 19)
        }
    }

    var i;
    var j;
    var len1;

    var k = 0;

    var summary1 = this.sumResource(game, color);
    var resourceYOffset  = 60;

    if (summary1 > 0) {
        if (game.state === State.READY || game.playerList[color].uid === uid) {
            for (i = 0; i < 8; i++) {
                if (game.playerList[color].resource[i] > 0) {
                    this.addSprite('view/resource.png', i, k * 38 + 500, color * 78 + resourceYOffset, 15, 15);
                    this.addLabel('' + game.playerList[color].resource[i], k * 38 + 519, color * 78 + resourceYOffset, '12px');

                    k++;
                }
            }
        } else {
            this.addSprite('view/resource.png', 8, 500, color * 78 + resourceYOffset, 15, 15);
            this.addLabel('' + summary1, 519, color * 78 + resourceYOffset, '12px');
        }
    } else {
        for (i = 0; i < 8; i++) {
            len1 = game.playerList[color].resource[i];
            for (j = 0; j < len1; j++) {
                if (game.state === State.READY || game.playerList[color].uid === uid) {
                    this.addSprite('view/resource.png', i, k * 16 + 500, color * 78 + resourceYOffset, 15, 15);
                } else {
                    this.addSprite('view/resource.png', 8, k * 16 + 500, color * 78 + resourceYOffset, 15, 15);
                }

                k++;
            }
        }
    }

    for (let card = 0; card < game.playerList[color].progressCard.length; card++) {
            if (game.state === State.READY || game.playerList[color].uid === uid) {
                this.addSprite('view/card.png', game.playerList[color].progressCard[card], card * 45 + 500, color * 78 + 79, 55, 20);
            } else {
                this.addSprite('view/card.png', Game.getColorByCard(game.playerList[color].progressCard[card]), card * 45 + 500, color * 78 + 79, 55, 20);
            }
    }

    for (let card = 0; card < game.playerList[color].pointCard.length; card++) {
        if(game.playerList[color].pointCard[card] === Card.PRINTER) {
        } else if (game.playerList[color].pointCard[card] === Card.CONSTITUTION) {
        }
    }
    if(game.playerList[color].pointCard.some(c => c === Card.PRINTER)) {
        this.addSprite('view/prize.png', 1, 738, color * 78 + 79, 20, 20); 
    }
    if(game.playerList[color].pointCard.some(c => c === Card.CONSTITUTION)) {
        this.addSprite('view/prize.png', 2, 751, color * 78 + 79, 20, 20);
    }
    if (game.merchantInfo[1] === color) {  // MERCHANT
        this.addSprite('view/prize.png', 3, 764, color * 78 + 79, 20, 20);
    }

    if (color === game.longestRoad) {
        this.addSprite('view/prize.png', 0, 777, color * 78 + 79, 20, 20);
    }
}

Game.getColorByCard = function (card) {
    if(card >= Card.ALCHEMIST && card <= Card.SMITH) {
        return Card.BACK_SCIENCE;
    } else if (card >= Card.BISHOP && card <= Card.WEDDING) {
        return Card.BACK_POLITICS;
    } else if (card >= Card.COMMERCIAL_HARBOR && card <= Card.TRADE_MONOPOLY) {
        return Card.BACK_TRADE;
    }
    return Card.BACK;
}

Game.addCanKnightDiplace = function (game) {
    if (
        game.state === State.PLAYING
     && game.phase === Phase.INTRIGUE
     && this.hasPriorityUid(game, uid)
     ) {
        this.addLabel('追い払う騎士を選択してください。', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        }); 

        for (let i = 0; i < game.knightList.length; i++) {
            const knight = game.knightList[i];
            var x;
            var y;
            
            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }
            
            var isConnectedToOwnRoad = SETTLEMENT_LINK[i].some(r => game.roadList[r] === game.active);
            if((knight & 0x0000ff) !== game.active && (knight & 0xff0000) !== KnightRank.NONE && isConnectedToOwnRoad) {
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.7);
            }
        }
     }
}

Game.hasDiplasableKnight = function (game) {
    for (let i = 0; i < game.knightList.length; i++) {
        const knight = game.knightList[i];
        var isConnectedToOwnRoad = SETTLEMENT_LINK[i].some(r => game.roadList[r] === game.active);
        if((knight & 0x0000ff) !== game.active && (knight & 0xff0000) !== KnightRank.NONE && isConnectedToOwnRoad) {
            return true;
        }
    }
    return false;
}

Game.addCanKnightMove = function (game, index) {
    if (
        game.state === State.PLAYING
     && game.phase === Phase.MOVE_KNIGHT2
     && this.hasPriorityUid(game, uid)
     ) {
        this.addLabel('移動先を選択してください。', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });
         const active = game.active;
         let result = [];
         for(let i = 0; i < SETTLEMENT_LINK[index].length; i++) {
             Game.canKnightMove(game, active, SETTLEMENT_LINK[index][i], result, game.knightList[index]);
        }
            
        for (let j = 0; j < result.length; j++) {
            const i = result[j];
            var x;
            var y;
            
            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }
            
            this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                var _i = i;
                
                return function () {
                    Game.send('H' + _i);
                };
            }(), 0.4);
        }
    }
}
Game.addCanAttackedKnightMove = function (game, index) {
    if (
        game.state === State.PLAYING
     && game.phase === Phase.MOVE_KNIGHT3
     && this.hasPriorityUid(game, uid)
     ) {
        this.addLabel('攻撃された騎士を移動してください。', 610, 400);
        const active = game.priority[0];
        let result = [];
        for(let i = 0; i < SETTLEMENT_LINK[index].length; i++) {
            Game.canKnightMove(game, active, SETTLEMENT_LINK[index][i], result, game.knightList[index]);
        }
        result = result.filter(r => r !== game.selectingKnight);

        for (let j = 0; j < result.length; j++) {
            const i = result[j];
            var x;
            var y;
        
            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }
            
            this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                var _i = i;
                
                return function () {
                    Game.send('H' + _i);
                };
            }(), 0.4);
        }
    }
}

Game.canKnightMove = function (game, color, index, result, selectKnight) {
    if (game.roadList[index] !== color) {
        return;
    } else {
        var roadList = game.roadList;
        roadList[index] = Index.NONE;

        var settlementList = game.settlementList;
        
        var knightList = game.knightList;
        var i;
        var len1 = ROAD_LINK[index].length;
        for (i = 0; i < len1; i++) {
            if (((settlementList[ROAD_LINK[index][i]] & 0xff00) === SettlementRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) ===KnightRank.NONE)
                || (settlementList[ROAD_LINK[index][i]] & 0x00ff) === color
                || (knightList[ROAD_LINK[index][i]] & 0x0000ff) === color
                || ((knightList[ROAD_LINK[index][i]] & 0x0000ff) !== color && (knightList[ROAD_LINK[index][i]] & 0xff0000) !== KnightRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) < (selectKnight & 0xff0000))
            ) {
                if((settlementList[ROAD_LINK[index][i]] & 0xff00) === SettlementRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) ===KnightRank.NONE) {
                    result.push(ROAD_LINK[index][i]);
                } else if (((knightList[ROAD_LINK[index][i]] & 0x0000ff) !== color && (knightList[ROAD_LINK[index][i]] & 0xff0000) !== KnightRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) < (selectKnight & 0xff0000))
                ) {
                    result.push(ROAD_LINK[index][i]);
                }
                var beforeSettlement = settlementList[ROAD_LINK[index][i]];
                var beforeKnight = knightList[ROAD_LINK[index][i]];
                
                settlementList[ROAD_LINK[index][i]] = (SettlementRank.SETTLEMENT | 0x00ff);
                knightList[ROAD_LINK[index][i]] = (KnightRank.MIGHTY | 0x0000ff);

                var j;
                var len2 = SETTLEMENT_LINK[ROAD_LINK[index][i]].length;
                for (j = 0; j < len2; j++) {
                    this.canKnightMove(game, color, SETTLEMENT_LINK[ROAD_LINK[index][i]][j], result, selectKnight);
                }
                
                settlementList[ROAD_LINK[index][i]] = beforeSettlement;
                knightList[ROAD_LINK[index][i]] = beforeKnight;
            }
        }
        
        roadList[index] = color;
    }
    
    return;
}

Game.addMap = function (game) {
    if(game.landList.length > 0) {
        this.addSprite('view/map.png', 0, 8, 85, 484, 434);

        var frame;

        var i;
        var len1 = game.landList.length;
        for (i = 0; i < len1; i++) {
            if (game.landList[i] === Land.DESERT) {
                frame = 5;
            } else {
                frame = game.landList[i];
            }

            if (i < 3) {
                this.addSprite('view/land.png', frame, i * 69 + 145, 144, 70, 80);
            } else if (i < 7) {
                this.addSprite('view/land.png', frame, (i - 3) * 69 + 111, 203, 70, 80);
            } else if (i < 12) {
                this.addSprite('view/land.png', frame, (i - 7) * 69 + 77, 262, 70, 80);
            } else if (i < 16) {
                this.addSprite('view/land.png', frame, (i - 12) * 69 + 112, 321, 70, 80);
            } else {
                this.addSprite('view/land.png', frame, (i - 16) * 69 + 147, 380, 70, 80);
            }
        }

        if(game.merchantInfo[0] !== Index.NONE) {
            var merchantIndex = game.merchantInfo[0];
            if (merchantIndex < 3) {
                this.addSprite('view/merchant.png', 0, merchantIndex * 69 + 155, 159, 50, 50);
            } else if (merchantIndex < 7) {
                this.addSprite('view/merchant.png', 0, (merchantIndex - 3) * 69 + 121, 218, 50, 50);
            } else if (merchantIndex < 12) {
                this.addSprite('view/merchant.png', 0, (merchantIndex - 7) * 69 + 87, 277, 50, 50);
            } else if (merchantIndex < 16) {
                this.addSprite('view/merchant.png', 0, (merchantIndex - 12) * 69 + 122, 336, 50, 50);
            } else {
                this.addSprite('view/merchant.png', 0, (merchantIndex - 16) * 69 + 157, 395, 50, 50);
            }
        }

        var len1 = game.numberList.length;
        for (i = 0; i < len1; i++) {
            if (game.numberList[i] !== Land.DESERT) {
                if (game.numberList[i] < 7) {
                    frame = game.numberList[i] - 2;
                } else {
                    frame = game.numberList[i] - 3;
                }

                if (i < 3) {
                    this.addSprite('view/number.png', frame, i * 69 + 165, 169, 30, 30);
                } else if (i < 7) {
                    this.addSprite('view/number.png', frame, (i - 3) * 69 + 131, 228, 30, 30);
                } else if (i < 12) {
                    this.addSprite('view/number.png', frame, (i - 7) * 69 + 97, 287, 30, 30);
                } else if (i < 16) {
                    this.addSprite('view/number.png', frame, (i - 12) * 69 + 132, 346, 30, 30);
                } else {
                    this.addSprite('view/number.png', frame, (i - 16) * 69 + 167, 405, 30, 30);
                }
            }
        }
        
        if (game.robber < 3) {
            this.addSprite('view/robber.png', 0, game.robber * 69 + 155, 159, 50, 50, null, 0.7);
        } else if (game.robber < 7) {
            this.addSprite('view/robber.png', 0, (game.robber - 3) * 69 + 121, 218, 50, 50, null, 0.7);
        } else if (game.robber < 12) {
            this.addSprite('view/robber.png', 0, (game.robber - 7) * 69 + 87, 277, 50, 50, null, 0.7);
        } else if (game.robber < 16) {
            this.addSprite('view/robber.png', 0, (game.robber - 12) * 69 + 122, 336, 50, 50, null, 0.7);
        } else {
            this.addSprite('view/robber.png', 0, (game.robber - 16) * 69 + 157, 395, 50, 50, null, 0.7);
        }
        

    }
}

Game.addCityWall = function (game) {
    for (let i = 0; i < game.cityWallList.length; i++) {
        var x;
        var y;

        if (game.cityWallList[i] !== 0xff) {
            if (i < 7) {
                x = i * 34.5 + 124;
                y = i % 2 === 0 ? 158 : 140;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 90;
                y = i % 2 === 0 ? 199 : 217;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 56; 
                y = i % 2 === 0 ? 276 : 258; 
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 56;
                y = i % 2 === 0 ? 335 : 317;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 91;
                y = i % 2 === 0 ? 376 : 394;
            } else {
                x = (i - 47) * 34.5 + 126;
                y = i % 2 === 0 ? 453 : 435;
            }
            this.addSprite('view/city-wall.png', game.cityWallList[i], x, y, 40, 20);
        }
    }
}

Game.addSettlement = function (game) {
    var i;
    var len1 = game.settlementList.length;
    for (i = 0; i < len1; i++) {
        var rank;

        switch(game.settlementList[i] & 0xff00) {
            case SettlementRank.NONE:
                rank = -1;
                break;
            case SettlementRank.SETTLEMENT:
                rank = 0;
                break;
            case SettlementRank.CITY:
                rank = 1;
                break;
            case SettlementRank.METROPOLIS:
                rank = 3;
                break;
        }

        var x;
        var y;

        if (rank >= 0) {
            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 143 : 125;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 184 : 202;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 261 : 243;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 320 : 302;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 361 : 379;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 438 : 420;
            }
            if(rank === 3) {
                this.addSprite('view/metropolis.png', game.settlementList[i] & 0x00ff, x, y, 30, 30);
            } else {
                if((game.settlementList[i] & 0x00ff) === game.tmpSettlementList[i]) {
                    this.addSprite('view/tmpSettlements.png', (3 - (game.settlementList[i] & 0x00ff)) * 2 + 1, x, y, 30, 30);
                } else {
                    this.addSprite('view/settlement.png', (game.settlementList[i] & 0x00ff) * 2 + rank, x, y, 30, 30);
                }
            }
        }
    }
}
Game.addKnight = function (game) {
    var i;
    var len1 = game.knightList.length;
    for (i = 0; i < len1; i++) {
        var rank;

        switch(game.knightList[i] & 0xff0000) {
            case KnightRank.NONE:
                rank = -1;
                break;
            case KnightRank.BASIC:
                rank = 0;
                break;
            case KnightRank.STRONG:
                rank = 1;
                break;
            case KnightRank.MIGHTY:
                rank = 2;
                break;
        }

        var knightActive;
        if(Game.isKnightActive(game, i)) {
            knightActive = 1;
        } else {
            knightActive = 0;
        }


        var x;
        var y;

        if (rank >= 0) {
            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }
            
            this.addSprite('view/knight.png', (game.knightList[i] & 0x0000ff) + rank * 8 + knightActive * 4, x, y, 30, 30);
        }
    }
}

Game.addRoad = function (game) {
    var i;
    var len1 = game.roadList.length;
    for (i = 0; i < len1; i++) {
        if(game.roadList[i] !== Index.NONE) {
            var angle = 2;
            
            if (
                   i === 6 || i === 7 || i === 8 || i === 9 || i === 18
                || i === 19 || i === 20 || i === 21 || i === 22 || i === 33
                || i === 34 || i === 35 || i === 36 || i === 37 || i === 38
                || i === 49 || i === 50 || i === 51 || i === 52 || i === 53
                || i === 62 || i === 63 || i === 64 || i === 65
            ) {
                angle = 2;
            } else if (
                   i === 0 || i === 2 || i === 4 || i === 10 || i === 12
                || i === 14 || i === 16 || i === 23 || i === 25 || i === 27
                || i === 29 || i === 31 || i === 40 || i === 42 || i === 44
                || i === 46 || i === 48 || i === 55 || i === 57 || i === 59
                || i === 61 || i === 67 || i === 69 || i === 71
            ) {
                angle = 0;
            } else {
                angle = 1;
            }

            var x;
            var y;

            if (i < 6) {
                x = i * 34.5 + 148;
                y = 139;
            } else if (i < 10) {
                x = (i - 6) * 69 + 130;
                y = 169;
            } else if (i < 18) {
                x = (i - 10) * 34.5 + 114;
                y = 198;
            } else if (i < 23) {
                x = (i - 18) * 69 + 96;
                y = 228;
            } else if (i < 33) {
                x = (i - 23) * 34.5 + 79;
                y = 258;
            } else if (i < 39) {
                x = (i - 33) * 69 + 62;
                y = 288;
            } else if (i < 49) {
                x = (i - 39) * 34.5 + 80;
                y = 316;
            } else if (i < 54) {
                x = (i - 49) * 69 + 97;
                y = 346;
            } else if (i < 62) {
                x = (i - 54) * 34.5 + 115;
                y = 375;
            } else if (i < 66) {
                x = (i - 62) * 69 + 132;
                y = 405;
            } else {
                x = (i - 66) * 34.5 + 150;
                y = 434;
            }
            
            this.addSprite('view/road.png', game.roadList[i] * 3 + angle, x, y, 30, 30);
        }
    }
}

Game.canBuildSetupSettlement = function (game, index) {
    var i;
    var len1 = SETTLEMENT_LINK[index].length;
    for (i = 0; i < SETTLEMENT_LINK[index].length; i++) {
        var j;
        var len2 = ROAD_LINK[SETTLEMENT_LINK[index][i]].length;
        for (j = 0; j < len2; j++) {
            if ((game.settlementList[ROAD_LINK[SETTLEMENT_LINK[index][i]][j]] & 0xff00) !== SettlementRank.NONE) {
                return false;
            }
        }
    }
    
    return true;
}

Game.canBuildSettlement = function (game, index) {
    var result = false;

    var i;
    var len1 = SETTLEMENT_LINK[index].length;
    for (i = 0; i < len1; i++) {
        if (game.roadList[SETTLEMENT_LINK[index][i]] === game.active) { result = true; }

        var j;
        var len2 = ROAD_LINK[SETTLEMENT_LINK[index][i]].length;
        for (j =  0; j < len2; j++) {
            if ((game.settlementList[ROAD_LINK[SETTLEMENT_LINK[index][i]][j]] & 0xff00) !== SettlementRank.NONE) {
                return false;
            }
        }
    }
    
    return result;
}

Game.canBuildKnight = function (game, index) {
    var result = false;
    var len1 = SETTLEMENT_LINK[index].length;
    for(let i = 0; i < len1; i++) {
        if (game.roadList[SETTLEMENT_LINK[index][i]] === game.active) { result = true; }
        if ((game.settlementList[index] & 0xff00) !== SettlementRank.NONE) {
            return false;
        }
        if((game.knightList[index] & 0xff0000) != KnightRank.NONE) {
            return false;
        }
    }
    return result;
}

Game.hasCanBuildCity = function (game) {
    var i;
    var len1 = game.settlementList.length;
    for (i =  0; i < len1; i++) {
        if (
               (game.settlementList[i] & 0xff00) === SettlementRank.SETTLEMENT
            && (game.settlementList[i] & 0x00ff) === game.active
        ) {
            return true;
        }
    }
    
    return false;
}

Game.addCanActivateKnight = function (game) {
    if (
           game.state === State.PLAYING
        && game.phase === Phase.ACTIVATE_KNIGHT
        && this.hasPriorityUid(game, uid)
        && this.hasCanActivateKnight(game)
    ) {
        this.addLabel('活性化する騎士を選択してください。', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });
        var i;
        var len1 = game.knightList.length;
        for (i = 0; i < len1; i++) {
            var isActive = Game.isKnightActive(game, i);
            var color = game.knightList[i] & 0x0000ff;
            var rank = game.knightList[i] & 0xff0000;
            
            if (!isActive && color === game.active && rank !== KnightRank.NONE) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.4);
            }
        }
    }
}

Game.addCanPromoteKnight = function (game) {
    if (
           game.state === State.PLAYING
        && (game.phase === Phase.PROMOTE_KNIGHT || game.phase === Phase.SMITH1 || game.phase === Phase.SMITH2)
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.knightList.length;
        for (i = 0; i < len1; i++) {
            var color = game.knightList[i] & 0x0000ff;
            var rank = game.knightList[i] & 0xff0000;
            var promoteFlag = (game.knightList[i] & KnightStatus.PROMOTED) === KnightStatus.PROMOTED;
            var nextRank = rank + KnightRank.BASIC;
            var hasStock = game.playerList[game.active].knightStock[(nextRank >>> 16) - 1] > 0;
            var mightyFlag = (nextRank === KnightRank.MIGHTY) && !Game.hasPoliticsPower(game);    
            
            if (color === game.active && rank >= KnightRank.BASIC && rank < KnightRank.MIGHTY && !promoteFlag && !mightyFlag && hasStock) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.4);
            }
        }
    }
}

Game.addKnightSelectionToMoveRobber = function (game) {

    if (
           game.state === State.PLAYING
        && game.phase === Phase.MOVE_ROBBER1
        && this.hasPriorityUid(game, uid)
    ) {
        this.addLabel('利用する騎士を選択してください。', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });

        var result = Game.hasCanRobberMove(game);
        var len1 = result.length;
        for (let index = 0; index < len1; index++) {
            var i = result[index];
            var x;
            var y;

            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }
            
            this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                var _i = i;
                
                return function () {
                    Game.send('S' + _i);
                };
            }(), 0.4);
        }
    }
}


Game.addKnightSelectionToMove = function (game) {
    if (
           game.state === State.PLAYING
        && game.phase === Phase.MOVE_KNIGHT1
        && this.hasPriorityUid(game, uid)
    ) {
        this.addLabel('移動する騎士を選択してください。', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });
        var i;
        var len1 = game.knightList.length;
        for (i = 0; i < len1; i++) {
            var color = game.knightList[i] & 0x0000ff;
            var isActive = Game.isKnightAlreadyActivated(game, i);
            
            if (color === game.active && isActive) {
                var result = [];
                for(let road = 0; road < SETTLEMENT_LINK[i].length; road++) {
                    Game.canKnightMove(game, color, SETTLEMENT_LINK[i][road], result, game.knightList[i]);
                }
                if (result.length === 0) {
                    continue;
                }
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('L' + _i);
                    };
                }(), 0.4);
            }
        }
    }
}

Game.addCanBuildKnight = function (game) {
    if (
        game.state === State.PLAYING
     && (
          game.phase === Phase.BUILD_KNIGHT
          || game.phase === Phase.DESERTER3
        )
     && this.hasPriorityUid(game, uid)
    ) {
        var opacity = 0.7;
        var i;
        var len1 = game.knightList.length;
        for (i = 0; i < len1; i++) {
            var x;
            var y;

            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }

            if (this.canBuildKnight(game, i)) {
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), opacity);
            }
        }
    }
}

Game.addCanBuildSettlement = function (game) {
    if (
           game.state === State.PLAYING
        && (
                  game.phase === Phase.SETUP_SETTLEMENT1
               || game.phase === Phase.SETUP_SETTLEMENT2
               || game.phase === Phase.BUILD_SETTLEMENT
           )
        && this.hasPriorityUid(game, uid)
    ) {
        var opacity;

        if (game.phase === Phase.BUILD_SETTLEMENT) {
            opacity = 0.7;
        } else {
            opacity = 0;
        }

        var i;
        var len1 = game.settlementList.length;
        for (i = 0; i < len1; i++) {
            var x;
            var y;

            if (i < 7) {
                x = i * 34.5 + 130;
                y = i % 2 === 0 ? 148 : 130;
            } else if (i < 16) {
                x = (i - 7) * 34.5 + 96;
                y = i % 2 === 0 ? 189 : 207;
            } else if (i < 27) {
                x = (i - 16) * 34.5 + 62;
                y = i % 2 === 0 ? 266 : 248;
            } else if (i < 38) {
                x = (i - 27) * 34.5 + 62;
                y = i % 2 === 0 ? 325 : 307;
            } else if (i < 47) {
                x = (i - 38) * 34.5 + 97;
                y = i % 2 === 0 ? 366 : 384;
            } else {
                x = (i - 47) * 34.5 + 132;
                y = i % 2 === 0 ? 443 : 425;
            }
            
            switch(game.phase) {
                case Phase.SETUP_SETTLEMENT1:
                    if (this.canBuildSetupSettlement(game, i)) {
                        this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                            var _i = i;
                            
                            return function () {
                                Game.send('f' + _i);
                            };
                        }(), opacity);
                    }
                    break;
                case Phase.SETUP_SETTLEMENT2:
                    if (this.canBuildSetupSettlement(game, i)) {
                        this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                            var _i = i;
                            
                            return function () {
                                Game.send('h' + _i);
                            };
                        }(), opacity);
                    }
                    break;
                case Phase.BUILD_SETTLEMENT:
                    if (this.canBuildSettlement(game, i)) {
                        this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                            var _i = i;
                            
                            return function () {
                                Game.send('q' + _i);
                            };
                        }(), opacity);
                    }
                    break;
            }
        }
    }
}

Game.addCanPillageCity = function (game) {
    if (
           game.state === State.PLAYING
        && game.phase === Phase.BARBARIAN_DEFEAT1
        && this.hasPriorityUid(game, uid)
    ) {
        this.addLabel('襲撃される街を選択してください。', 610, 400);
        var i;
        var len1 = game.settlementList.length;
        for (i = 0; i < len1; i++) {
            var rank = game.settlementList[i] & 0xff00;
            var color = game.settlementList[i] & 0x00ff;
            
            if (rank === SettlementRank.CITY && color === game.priority[0]) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}


Game.hasTmpSettlement = function (game, player) {
    return game.tmpSettlementList.filter(p => p === player).length > 0;
}

Game.addCanBuildCity = function (game) {
    if (
           game.state === State.PLAYING
        && (game.phase === Phase.BUILD_CITY || game.phase === Phase.MEDICINE)
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.settlementList.length;
        for (i = 0; i < len1; i++) {
            var rank = game.settlementList[i] & 0xff00;
            var color = game.settlementList[i] & 0x00ff;

            var flag = false;
            if(Game.hasTmpSettlement(game, game.active)) {
                if(game.tmpSettlementList[i] === game.active) {
                    flag = true;
                }
            } else {
                flag = rank === SettlementRank.SETTLEMENT && color === game.active;
            }
            
            if (flag) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('s' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}
Game.addCanBuildMetropolis = function (game) {
    if (
           game.state === State.PLAYING
        && game.phase === Phase.BUILD_METROPOLIS
        && this.hasPriorityUid(game, uid)
    ) {
        this.addLabel('メトロポリスを建設してください。', 610, 400);
        var i;
        var len1 = game.settlementList.length;
        for (i = 0; i < len1; i++) {
            var rank = game.settlementList[i] & 0xff00;
            var color = game.settlementList[i] & 0x00ff;
            
            if (rank === SettlementRank.CITY && color === game.active) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}
Game.addCanPillagedMetropolis = function (game, player) {
    if (
           game.state === State.PLAYING
        && game.phase === Phase.CHOICE_PILLAGED_METROPOLIS
        && this.hasPriorityUid(game, uid)
    ) {
        this.addLabel('壊すメトロポリスを選択してください。', 610, 400);
        var i;
        var len1 = game.settlementList.length;
        for (i = 0; i < len1; i++) {
            var rank = game.settlementList[i] & 0xff00;
            var color = game.settlementList[i] & 0x00ff;
            
            if (rank === SettlementRank.METROPOLIS && color === player) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}

Game.addCanBuildCityWall = function (game) {
    if (
           game.state === State.PLAYING
        && ( game.phase === Phase.BUILD_CITYWALL || game.phase === Phase.ENGINEER)
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.settlementList.length;
        this.addLabel('城壁を設置してください。', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });
        for (i = 0; i < len1; i++) {
            var rank = game.settlementList[i] & 0xff00;
            var color = game.settlementList[i] & 0x00ff;
            
            if (rank >= SettlementRank.CITY && color === game.active && game.cityWallList[i] === 0xff) {
                var x;
                var y;

                if (i < 7) {
                    x = i * 34.5 + 130;
                    y = i % 2 === 0 ? 148 : 130;
                } else if (i < 16) {
                    x = (i - 7) * 34.5 + 96;
                    y = i % 2 === 0 ? 189 : 207;
                } else if (i < 27) {
                    x = (i - 16) * 34.5 + 62;
                    y = i % 2 === 0 ? 266 : 248;
                } else if (i < 38) {
                    x = (i - 27) * 34.5 + 62;
                    y = i % 2 === 0 ? 325 : 307;
                } else if (i < 47) {
                    x = (i - 38) * 34.5 + 97;
                    y = i % 2 === 0 ? 366 : 384;
                } else {
                    x = (i - 47) * 34.5 + 132;
                    y = i % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _i = i;
                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}

Game.canBuildRoad = function (game, index) {
    if (game.roadList[index] === Index.NONE) {
        var i;
        var len1 = ROAD_LINK[index].length;
        for (i = 0; i < len1; i++) {
            if ((game.settlementList[ROAD_LINK[index][i]] & 0x00ff) === game.active) {
                return true;
            } else if((game.knightList[ROAD_LINK[index][i]] & 0x0000ff) === game.active) {
                return true;
            } else if ((game.settlementList[ROAD_LINK[index][i]] & 0xff00) === SettlementRank.NONE
                        && (game.knightList[ROAD_LINK[index][i]] & 0xff0000) === KnightRank.NONE
            ) {
                var j;
                var len2 = SETTLEMENT_LINK[ROAD_LINK[index][i]].length;
                for (j = 0; j < len2; j++) {
                    if (game.roadList[SETTLEMENT_LINK[ROAD_LINK[index][i]][j]] === game.active) {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}

Game.isOpenRoad = function (game, index) {
    var color = game.roadList[index];
    if(color === Index.NONE) {
        return false;
    }
    console.log(ROAD_LINK[index]);
    if(!ROAD_LINK[index].every(intersection => (game.knightList[intersection] & 0x0000ff) === color   ||
                                              (game.settlementList[intersection] & 0x00ff) === color || 
                                                SETTLEMENT_LINK[intersection].filter(r => r !== index).some(r => game.roadList[r] === color))) {
        return true;
    }
    return false;
}

Game.hasCanBuildRoad = function (game) {
    var i;
    var len1 = game.roadList.length;
    for (i = 0; i < len1; i++) {
        if(this.canBuildRoad(game, i)) { return true; }
    }
    
    return false;
}

Game.hasOpenRoad = function (game) {
    var i;
    var len1 = game.roadList.length;
    for (i = 0; i < len1; i++) {
        if(this.isOpenRoad(game, i)) { return true; }
    }
    
    return false;
}

Game.hasCanBuildSettlement = function (game) {
    var result = false;

    var i;
    var len1 = game.settlementList.length;
    for (i = 0; !result && i < len1; i++) {
        if (this.canBuildSettlement(game, i)) { return true; }
    }
    
    return false;
}

Game.hasCanBuildKnight = function (game) {
    var result = false;
    
    var i;
    var len1 = game.knightList.length;
    for (i = 0; !result && i < len1; i++) {
        if (this.canBuildKnight(game, i)) { return true; }
    }
    
    return false;
}

Game.hasCanActivateKnight = function (game) {
    var active = game.active;

    for(let i = 0; i < game.knightList.length; i++) {
        if((game.knightList[i] & 0x0000ff) === active &&  !Game.isKnightActive(game, i) && (game.knightList[i] & 0xff0000) !== KnightRank.NONE) {
            return true; 
        }
    }
    return false;
}
Game.hasCanPromoteKnight = function (game) {
    var active = game.active;

    for(let i = 0; i < game.knightList.length; i++) {
        var rank = game.knightList[i] & 0xff0000;
        var next = (rank >>> 16) + 1;
        var nextRank = rank + KnightRank.BASIC;
        var mightyFlag = (nextRank === KnightRank.MIGHTY) && !Game.hasPoliticsPower(game);   
        var promoteFlag = (game.knightList[i] & KnightStatus.PROMOTED) === KnightStatus.PROMOTED;
        
        if((game.knightList[i] & 0x0000ff) === active &&  rank >= KnightRank.BASIC && rank < KnightRank.MIGHTY && !promoteFlag && game.playerList[active].knightStock[next - 1] > 0 && !mightyFlag) {
            return true; 
        }
    }
    return false;
}

Game.hasPoliticsPower = function (game) {
    return game.playerList[game.active].development[Development.POLITICS] >= 3;
}
Game.hasTradePower = function (game) {
    return game.playerList[game.active].development[Development.TRADE] >= 3;
}
Game.hasSciencePower = function (game) {
    return game.playerList[game.active].development[Development.SCIENCE] >= 3;
}



Game.hasCanKnightMove = function (game) {
    var active = game.active;

    for(let i = 0; i < game.knightList.length; i++) {
        var color =  game.knightList[i] & 0x0000ff;
        var already = Game.isKnightAlreadyActivated(game, i);
        if (color === active) {
            var result = [];
            for(let road = 0; road < SETTLEMENT_LINK[i].length; road++) {
                Game.canKnightMove(game, active, SETTLEMENT_LINK[i][road], result, game.knightList[i]);
            }
            if(result.length !== 0 && already) {
                return true;
            }
        }
    }
    return false;
}
Game.hasCanRobberMove = function (game) {
    var active = game.active;
    var result = [];

    for(let i = 0; i < game.knightList.length; i++) {
        var color =  game.knightList[i] & 0x0000ff;
        var already = Game.isKnightAlreadyActivated(game, i);
        if (color === active) {
            var nextToRobber = LAND_LINK[game.robber].some(land => land === i);
            if(nextToRobber && already) {
                result.push(i);
            }
        }
    }
    return result;
}

Game.hasActiveKnight = function (game) {
    var active = game.active;

    for(let i = 0; i < game.knightList.length; i++) {
        if((game.knightList[i] & 0x0000ff) === active &&  Game.isKnightAlreadyActivated(game, i)) {
            return true; 
        }
    }
    return false;
}

Game.hasKnight = function (game, player) {

    for(let i = 0; i < game.knightList.length; i++) {
        if((game.knightList[i] & 0x0000ff) === player) {
            return true; 
        }
    }
    return false;
}

Game.hasAnyResource = function (game, player) {
    return game.playerList[player].resource.reduce((p, c) => p + c, 0) > 0;
}
Game.hasResource = function (game, player) {
    return game.playerList[player].resource.filter((r,i) => i < Resource.CLOTH).reduce((p, c) => p + c, 0) > 0;
}
Game.hasCommodity = function (game, player) {
    return game.playerList[player].resource.filter((r,i) => i >= Resource.CLOTH).reduce((p, c) => p + c, 0) > 0;
}



Game.canDevelope = function (game, player) {
    for (let i = 0; i < game.settlementList.length; i++) {
        var color = game.settlementList[i] & 0x00ff;
        if(color === player) {
            var rank = game.settlementList[i]  & 0xff00;
            if(rank >= SettlementRank.CITY) {
                return true;
            }
        }
    }
    return false;
}

Game.hasCanBuildCityWall = function (game, player) {
    for (let i = 0; i < game.settlementList.length; i++) {
        var color = game.settlementList[i] & 0x00ff;
        if(color === player) {
            var rank = game.settlementList[i]  & 0xff00;
            if(rank >= SettlementRank.CITY) {
                if(game.cityWallList[i] === 0xff) {
                    return true;
                }
            }
        }
    }
    return false;
}

Game.hasCity = function (game, player) {
    for (let i = 0; i < game.settlementList.length; i++) {
        var color = game.settlementList[i] & 0x00ff;
        if(color === player) {
            var rank = game.settlementList[i]  & 0xff00;
            if(rank === SettlementRank.CITY) {
                return true;
            }
        }
    }
    return false;
}

Game.isKnightActive = function (game, index) {
    return ((game.knightList[index] | KnightStatus.DEACTIVATE) & KnightStatus.ACTIVATE) === KnightStatus.ACTIVATE;
}

Game.isKnightAlreadyActivated = function (game, index) {
    return ((game.knightList[index] | KnightStatus.DEACTIVATE) & KnightStatus.ACTIVE) === KnightStatus.ACTIVE;
}

Game.canBuildSecondRoad = function (game, index) {
    var secondSettlement = game.playerList[game.active].secondSettlement;

    var i;
    var len1 = SETTLEMENT_LINK[secondSettlement].length;
    for (i = 0; i < len1; i++) {
        if (SETTLEMENT_LINK[secondSettlement][i] === index) { return true; }
    }
    
    return false;
}

Game.addCanRemoveRoad = function (game) {
    if (
        game.state === State.PLAYING
     && (
        game.phase === Phase.DIPLOMAT1
        )
     && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.roadList.length;
        for (i = 0; i < len1; i++) {
            var x;
            var y;

            if (i < 6) {
                x = i * 34.5 + 148;
                y = 139;
            } else if (i < 10) {
                x = (i - 6) * 69 + 130;
                y = 169;
            } else if (i < 18) {
                x = (i - 10) * 34.5 + 114;
                y = 198;
            } else if (i < 23) {
                x = (i - 18) * 69 + 96;
                y = 228;
            } else if (i < 33) {
                x = (i - 23) * 34.5 + 79;
                y = 258;
            } else if (i < 39) {
                x = (i - 33) * 69 + 62;
                y = 288;
            } else if (i < 49) {
                x = (i - 39) * 34.5 + 80;
                y = 316;
            } else if (i < 54) {
                x = (i - 49) * 69 + 97;
                y = 346;
            } else if (i < 62) {
                x = (i - 54) * 34.5 + 115;
                y = 375;
            } else if (i < 66) {
                x = (i - 62) * 69 + 132;
                y = 405;
            } else {
                x = (i - 66) * 34.5 + 150;
                y = 434;
            }

            switch(game.phase) {
                case Phase.DIPLOMAT1:
                    if (Game.isOpenRoad(game, i)) {
                        this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                            var _i = i;
                            
                            return function () {
                                Game.send('H' + _i);
                            };
                        }(), 0.7);
                    }
                    break;
            }
        }
    }
}

Game.addCanBuildRoad = function (game) {
    if (
           game.state === State.PLAYING
        && (
                   game.phase === Phase.SETUP_ROAD1
                || game.phase === Phase.SETUP_ROAD2
                || game.phase === Phase.BUILD_ROAD
                || game.phase === Phase.ROAD_BUILDING1
                || game.phase === Phase.ROAD_BUILDING2
                || game.phase === Phase.DIPLOMAT2
           )
        && this.hasPriorityUid(game, uid)
    ) {

        var i;
        var len1 = game.roadList.length;
        for (i = 0; i < len1; i++) {
            var x;
            var y;

            if (i < 6) {
                x = i * 34.5 + 148;
                y = 139;
            } else if (i < 10) {
                x = (i - 6) * 69 + 130;
                y = 169;
            } else if (i < 18) {
                x = (i - 10) * 34.5 + 114;
                y = 198;
            } else if (i < 23) {
                x = (i - 18) * 69 + 96;
                y = 228;
            } else if (i < 33) {
                x = (i - 23) * 34.5 + 79;
                y = 258;
            } else if (i < 39) {
                x = (i - 33) * 69 + 62;
                y = 288;
            } else if (i < 49) {
                x = (i - 39) * 34.5 + 80;
                y = 316;
            } else if (i < 54) {
                x = (i - 49) * 69 + 97;
                y = 346;
            } else if (i < 62) {
                x = (i - 54) * 34.5 + 115;
                y = 375;
            } else if (i < 66) {
                x = (i - 62) * 69 + 132;
                y = 405;
            } else {
                x = (i - 66) * 34.5 + 150;
                y = 434;
            }

            switch(game.phase) {
                case Phase.SETUP_ROAD2:
                    if (this.canBuildSecondRoad(game, i)) {
                        this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                            var _i = i;
                            
                            return function () {
                                Game.send('i' + _i);
                            };
                        }(), 0.7);
                    }
                    break;
                case Phase.SETUP_ROAD1:
                case Phase.BUILD_ROAD:
                case Phase.ROAD_BUILDING1:
                case Phase.ROAD_BUILDING2:
                case Phase.DIPLOMAT2:
                    if (this.canBuildRoad(game, i)) {
                        var command = '';

                        switch (game.phase) {
                            case Phase.SETUP_ROAD1:
                                command = 'g';
                                break;
                            case Phase.BUILD_ROAD:
                            case Phase.ROAD_BUILDING1:
                            case Phase.ROAD_BUILDING2:
                            case Phase.DIPLOMAT2:
                                command = 'o';
                                break;
                        }

                        this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                            var _i = i;

                            return function () {
                                Game.send(command + _i);
                            };
                        }(), 0.7);
                    }
                    break;
            }
        }
    }
}

Game.addCanMoveRobber = function (game) {
    if (
           game.state === State.PLAYING
        && (
                   game.phase === Phase.ROBBER1
                || game.phase === Phase.MOVE_ROBBER2
                || game.phase === Phase.BISHOP
           )
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.landList.length;
        for (i = 0; i < len1; i++) {
            if (i !== game.robber) {
                var x;
                var y;

                if (i < 3) {
                    x = i * 69 + 155;
                    y = 159;
                } else if (i < 7) {
                    x = (i - 3) * 69 + 121;
                    y = 218;
                } else if (i < 12) {
                    x = (i - 7) * 69 + 87;
                    y = 277;
                } else if (i < 16) {
                    x = (i - 12) * 69 + 122;
                    y = 336;
                } else {
                    x = (i - 16) * 69 + 157;
                    y = 395;
                }
                
                this.addSprite('view/robber.png', 1, x, y, 50, 50, function () {
                    var _i = i;                    
                    return function () {
                        Game.send('l' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}


Game.addCanSwapLand = function (game) {
    if (
           game.state === State.PLAYING
        && (
            game.phase === Phase.INVENTOR1 || game.phase === Phase.INVENTOR2
           )
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.numberList.length;
        var step = game.phase - Phase.INVENTOR1 + 1;
        this.addLabel('交換する土地を選択してください。 ' + step + '/2', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });
        for (i = 0; i < len1; i++) {
            if (
                game.numberList[i] !== 6 
                && game.numberList[i] !== 8 
                && game.numberList[i] !== 2 
                && game.numberList[i] !== 12 
                && game.numberList[i] !== Index.NONE) {
                var x;
                var y;

                if (i < 3) {
                    x = i * 69 + 155;
                    y = 159;
                } else if (i < 7) {
                    x = (i - 3) * 69 + 121;
                    y = 218;
                } else if (i < 12) {
                    x = (i - 7) * 69 + 87;
                    y = 277;
                } else if (i < 16) {
                    x = (i - 12) * 69 + 122;
                    y = 336;
                } else {
                    x = (i - 16) * 69 + 157;
                    y = 395;
                }
                
                if(i === game.inventorSelecting) {
                    this.addSprite('view/selecting-land.png', 1, x, y, 50, 50, undefined, 0.7);
                } else {
                    this.addSprite('view/robber.png', 1, x, y, 50, 50, function () {
                        var _i = i;                    
                        return function () {
                            Game.send('H' + _i);
                        };
                    }(), 0.7);
                }
            }
        }
    }
}

Game.addMerchantCommand = function (game) {
    if (
           game.state === State.PLAYING
        && game.phase === Phase.MERCHANT
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = game.numberList.length;
        this.addLabel('商人を設置してください。 ', 610, 400);
        this.addSprite('view/button.png', 13, 610, 435, 80, 25, function () {
            Game.send('e');
        });
        for (i = 0; i < len1; i++) {
            if (game.landList[i] === Land.DESERT) { continue; }
            if (LAND_LINK[i].some(intersection => (game.settlementList[intersection] & 0x00ff) === game.active)) {
                var x;
                var y;

                if (i < 3) {
                    x = i * 69 + 155;
                    y = 159;
                } else if (i < 7) {
                    x = (i - 3) * 69 + 121;
                    y = 218;
                } else if (i < 12) {
                    x = (i - 7) * 69 + 87;
                    y = 277;
                } else if (i < 16) {
                    x = (i - 12) * 69 + 122;
                    y = 336;
                } else {
                    x = (i - 16) * 69 + 157;
                    y = 395;
                }
                
                this.addSprite('view/robber.png', 1, x, y, 50, 50, function () {
                    var _i = i;                    
                    return function () {
                        Game.send('H' + _i);
                    };
                }(), 0.7);
            }
        }
    }
}

Game.addCanPillageSettlement = function (game) {
    if (
           game.state === State.PLAYING
        && (
                   game.phase === Phase.ROBBER2
                || game.phase === Phase.SOLDIER2
           )
        && this.hasPriorityUid(game, uid)
    ) {
        var i;
        var len1 = LAND_LINK[game.robber].length;
        for (i = 0; i < len1; i++) {
            var index = LAND_LINK[game.robber][i];
            var rank = game.settlementList[index] & 0xff00;
            var color = game.settlementList[index] & 0x00ff;
            
            if (
                   rank !== SettlementRank.NONE
                && color !== game.active
                && this.sumResource(game, color) > 0
            ) {
                var x;
                var y;

                if (index < 7) {
                    x = index * 34.5 + 130;
                    y = index % 2 === 0 ? 148 : 130;
                } else if (index < 16) {
                    x = (index - 7) * 34.5 + 96;
                    y = index % 2 === 0 ? 189 : 207;
                } else if (index < 27) {
                    x = (index - 16) * 34.5 + 62;
                    y = index % 2 === 0 ? 266 : 248;
                } else if (index < 38) {
                    x = (index - 27) * 34.5 + 62;
                    y = index % 2 === 0 ? 325 : 307;
                } else if (index < 47) {
                    x = (index - 38) * 34.5 + 97;
                    y = index % 2 === 0 ? 366 : 384;
                } else {
                    x = (index - 47) * 34.5 + 132;
                    y = index % 2 === 0 ? 443 : 425;
                }
                
                this.addSprite('view/settlement.png', 8, x, y, 30, 30, function () {
                    var _color = color;                    
                    return function () {
                        Game.send('m' + _color);
                    };
                }(), 0.7);
            }
        }
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
    var i;
    var len1 = game.priority.length;
    for (i = 0; i < len1; i++) {
        if (game.playerList[game.priority[i]].uid === uid) { return true; }
    }
    
    return false;
}

Game.addStock = function (game) {
    if (!game.hidden) {
        var i;
        var len1 = game.resourceStock.length;
        for (i = 0; i < len1; i++) {
            if (game.resourceStock[i] > 0) {
                if (i >= Resource.CLOTH) {
                    var sprite = new Sprite(24, 24);
                    var spriteB = new Sprite(11, 23);
                    sprite.y = 44;
                    spriteB.y = 45;
                    var resourceMax = 12;
                } else {
                    var sprite = new Sprite(24, 38);
                    sprite.y = 30;
                    var resourceMax = 19;
                }
            
                this.addLabel(String(resourceMax-game.resourceStock[i]), i * 27 + 117, 70);
                if(spriteB) {
                    sprite.x = i * 27 + 110;
                    sprite.image = new Surface(24, 38);
                    sprite.image.context.fillStyle = 'rgb(255,255,255)';
                    sprite.image.context.fillRect(0, 0, 24, 38);
                    spriteB.x = i * 27 + 122;
                    spriteB.image = new Surface(11, 30);
                    spriteB.image.context.fillStyle = 'rgb(255,255,255)';
                    spriteB.image.context.fillRect(0, 0, 11, 38);
                } else {
                    sprite.x = i * 27 + 110;
                    sprite.image = new Surface(24, 38);
                    sprite.image.context.fillStyle = 'rgb(255,255,255)';
                    sprite.image.context.fillRect(0, 0, 24, 38);
                }
                
                switch (i) {
                    case Resource.BRICK:
                        sprite.image.context.fillStyle = 'rgb(136,0,21)';
                        this.addLabel('土', i * 27 + 115, 10);
                        break;
                    case Resource.WOOL:
                        sprite.image.context.fillStyle = 'rgb(181,230,29)';
                        this.addLabel('羊', i * 27 + 115, 10);
                        break;
                    case Resource.ORE:
                        sprite.image.context.fillStyle = 'rgb(127,127,127)';
                        this.addLabel('鉄', i * 27 + 115, 10);
                        break;
                    case Resource.GRAIN:
                        sprite.image.context.fillStyle = 'rgb(255,242,0)';
                        this.addLabel('麦', i * 27 + 115, 10);
                        break;
                    case Resource.LUMBER:
                        sprite.image.context.fillStyle = 'rgb(34,177,76)';
                        this.addLabel('木', i * 27 + 115, 10);
                        break;
                    case Resource.CLOTH:
                        sprite.image.context.fillStyle = 'rgb(150,91,2)';
                        spriteB.image.context.fillStyle = 'rgb(249,149,3)';
                        this.addLabel('服', i * 27 + 115, 10);
                        break;
                    case Resource.COIN:
                        sprite.image.context.fillStyle = 'rgb(32,161,161)';
                        spriteB.image.context.fillStyle = 'rgb(0,255,255)';
                        this.addLabel('貨', i * 27 + 115, 10);
                        break;
                    case Resource.PAPER:
                        sprite.image.context.fillStyle = 'rgb(118,168,67)';
                        spriteB.image.context.fillStyle = 'rgb(0,255,0)';
                        this.addLabel('紙', i * 27 + 115, 10);
                        break;
                }
                if (i >= Resource.CLOTH) {
                    sprite.image.context.fillRect(0, 24 - game.resourceStock[i] * 2, 24, 13 + game.resourceStock[i] * 2);
                    spriteB.image.context.fillRect(0, 23 - game.resourceStock[i] * 2, 24, 13 + game.resourceStock[i] * 2);
                    // spriteB.image.context.strokeRect(0, 0, 12, 38);
                    sprite.image.context.strokeRect(0, 0, 24, 38);
                    this.core.rootScene.addChild(sprite);
                    this.core.rootScene.addChild(spriteB);
                } else {
                    sprite.image.context.fillRect(0, 38 - game.resourceStock[i] * 2, 24, game.resourceStock[i] * 2);
                    sprite.image.context.strokeRect(0, 0, 24, 38);
                    this.core.rootScene.addChild(sprite);
                }

            }
        }
    }

    Game.strengthOfKnights = function (game) {
        return game.knightList.reduce((total, knight, index) => {
            if(Game.isKnightActive(game, index)) {
                return total + ((knight & 0xff0000) >>> 16);
            }
            return total;
        }, 0);        
    }
    Game.strengthOfBarbarian = function (game) {
        return game.settlementList.reduce((total, s) => {
            if((s & 0xff00) >= SettlementRank.CITY) {
                return total + 1;
            }
            return total;
        }, 0);

    }
    
    // if (game.cardStock.length > 0) {
    //     sprite = new Sprite(48, 50);

    //     sprite.y = 18;
    //     sprite.x = 440;
    //     sprite.image = new Surface(48, 50);
    //     sprite.image.context.strokeStyle = 'black';
    //     sprite.image.context.fillStyle = 'rgb(0,0,0)';
    //     sprite.image.context.fillRect(0, 50 - game.cardStock.length * 2, 48, game.cardStock.length * 2);
    //     sprite.image.context.strokeRect(0, 0, 48, 50);
    //     this.addLabel(String(game.cardStock.length), 455, 70);

    //     this.core.rootScene.addChild(sprite);
    // }
}