var Player = require('./Player');
var Const = require('./Const');
const { KnightStatus, Development } = require('./Const');
var Index = Const.Index;
var Option = Const.Option;
var State = Const.State;
var Phase = Const.Phase;
var Land = Const.Land;
var Sound = Const.Sound;
var Resource = Const.Resource;
var Card = Const.Card;
var SettlementRank = Const.SettlementRank;
var KnightRank = Const.KnightRank;
var Harbor = Const.Harbor;
var ALPHABET_CHIP = Const.ALPHABET_CHIP;
var ALPHABET_SIGNPOST = Const.ALPHABET_SIGNPOST;
var ROAD_LINK = Const.ROAD_LINK;
var LAND_LINK = Const.LAND_LINK;
var SETTLEMENT_LINK = Const.SETTLEMENT_LINK;

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
    game.setup = Option.ALPHABET_SETUP;
    game.hidden = false;
    game.sound = '';
    game.playerSize = 4;
    game.phase = Phase.NONE;
    game.active = Index.NONE;
    game.priority = [];
    game.canPlayCard = true;
    game.isBarbarianArrivedOnce = false;
    game.barbarianPos = 0;
    game.selectingKnight = Index.NONE;
    game.attackedKnight = KnightRank.NONE;
    game.strongestKnightsPlayer = [];
    game.weakestKnightsPlayer = [];
    game.noGainPlayer = [];
    game.needDiscardCardPlayer = [];
    game.metropolisStock = [0, 0, 0];
    game.selectingDevelopmentType = Index.NONE;
    game.inventorSelecting = Index.NONE;
    game.spySelecting = Index.NONE;
    game.alchemistDice1 = Index.NONE;
    game.alchemistDice2 = Index.NONE;
    game.commercialHarborDone = [];
    game.commercialHarborCurrent = Index.NONE;
    game.masterMerchantSelecting = Index.NONE;
    game.merchantInfo = [Index.NONE, Index.NONE]; // index, player
    
    game.secondSettlement = Index.NONE;
    
    game.trade = {
          output: [0, 0, 0, 0, 0, 0, 0, 0]
        , input: [0, 0, 0, 0, 0, 0, 0, 0]
        , playerIndex: Index.NONE
    };
    
    game.largestArmy = Index.NONE;
    game.longestRoad = Index.NONE;
    game.robber = Index.NONE;
    game.dice1 = Index.NONE;
    game.dice2 = Index.NONE;
    game.event = Index.NONE;
    game.landList = [];
    game.diceHistory = [];
    game.eventHistory = [];
    game.commercialHarborDone = [];
    
    var settlementList = game.settlementList = [];
    for (let i = 0; i < 54; i++) { settlementList.push(SettlementRank.NONE | 0x00ff); }

    var tmpSettlementList = game.tmpSettlementList = [];
    for (let i = 0; i < 54; i++) { tmpSettlementList.push(Index.NONE); }
    
    var roadList = game.roadList = [];
    for (let i = 0; i < 72; i++) { roadList.push(Index.NONE); }

    var knightList = game.knightList = [];
    for (let i = 0; i < 54; i++) { knightList.push(KnightRank.NONE | 0x0000ff); }

    var cityWallList = game.cityWallList = [];
    for (let i = 0; i < 54; i++) { cityWallList.push(0xff); }
    
    game.numberList = [];
    game.resourceStock = [0, 0, 0, 0, 0, 0, 0, 0];
    game.cardStockTrade = [];
    game.cardStockPolitics = [];
    game.cardStockScience = [];

    var playerList = game.playerList = [
          new Player()
        , new Player()
        , new Player()
        , new Player()
    ];

    var len1 = playerList.length;
    for (let i = 0; i < len1; i++) { Player.clear(playerList[i]); }
}

Game.copy = function (game, prev) {
    game.state = prev.state;
    game.setup = prev.setup;
    game.hidden = prev.hidden;
    game.sound = '';
    game.playerSize = prev.playerSize;
    game.phase = prev.phase;
    game.active = prev.active;
    game.priority = prev.priority || [];
    game.canPlayCard = prev.canPlayCard;
    game.isBarbarianArrivedOnce = prev.isBarbarianArrivedOnce;
    game.barbarianPos = prev.barbarianPos;
    game.selectingKnight = prev.selectingKnight;
    game.attackedKnight = prev.attackedKnight;
    game.strongestKnightsPlayer = prev.strongestKnightsPlayer || [];
    game.weakestKnightsPlayer = prev.weakestKnightsPlayer || [];
    game.noGainPlayer = prev.noGainPlayer || [];
    game.needDiscardCardPlayer = prev.needDiscardCardPlayer || [];
    game.metropolisStock = prev.metropolisStock || [0, 0, 0];
    game.selectingDevelopmentType = prev.selectingDevelopmentType;
    game.inventorSelecting = prev.inventorSelecting;
    game.spySelecting = prev.spySelecting;
    game.alchemistDice1 = prev.alchemistDice1;
    game.alchemistDice2 = prev.alchemistDice2;
    game.commercialHarborDone = prev.commercialHarborDone || [];
    game.commercialHarborCurrent = prev.commercialHarborCurrent;
    game.masterMerchantSelecting = prev.masterMerchantSelecting;
    game.merchantInfo = prev.merchantInfo || [Index.NONE, Index.NONE]; // index, player
    
    game.secondSettlement = prev.secondSettlement;
    
    game.trade = prev.trade || {
          output: [0, 0, 0, 0, 0, 0, 0, 0]
        , input: [0, 0, 0, 0, 0, 0, 0, 0]
        , playerIndex: Index.NONE
    };
    
    game.largestArmy = prev.largestArmy;
    game.longestRoad = prev.longestRoad;
    game.robber = prev.robber;
    game.dice1 = prev.dice1;
    game.dice2 = prev.dice2;
    game.event = prev.event;
    game.landList = prev.landList || [];
    game.diceHistory = prev.diceHistory || [];
    game.eventHistory = prev.eventHistory || [];
    game.commercialHarborDone = prev.commercialHarborDone || [];
    
    game.settlementList = prev.settlementList || [];
    if (game.settlementList.length === 0) {        
        var settlementList = game.settlementList = [];
        for (let i = 0; i < 54; i++) { settlementList.push(SettlementRank.NONE | 0x00ff); }
    }

    game.tmpSettlementList = prev.tmpSettlementList || []
    if (game.tmpSettlementList.length === 0) {        
        var tmpSettlementList = game.tmpSettlementList = [];
        for (let i = 0; i < 54; i++) { tmpSettlementList.push(Index.NONE); }
    }
    
    game.roadList = prev.roadList || [];
    if (game.roadList.length === 0) {        
        var roadList = game.roadList = [];
        for (let i = 0; i < 72; i++) { roadList.push(Index.NONE); }
    }

    game.knightLis = prev.knightLis || [];
    if (game.knightLis.length === 0) {        
        var knightList = game.knightList = [];
        for (let i = 0; i < 54; i++) { knightList.push(KnightRank.NONE | 0x0000ff); }
    }

    game.cityWallList = prev.cityWallList || [];
    if (game.cityWallList.length === 0) {        
        var cityWallList = game.cityWallList = [];
        for (let i = 0; i < 54; i++) { cityWallList.push(0xff); }
    }
    
    game.numberList = prev.numberList || [];
    game.resourceStock = prev.resourceStock || [0, 0, 0, 0, 0, 0, 0, 0];
    game.cardStockTrade = prev.cardStockTrade || [];
    game.cardStockPolitics = prev.cardStockPolitics || [];
    game.cardStockScience = prev.cardStockScience || [];

    var playerList = game.playerList = [
          new Player()
        , new Player()
        , new Player()
        , new Player()
    ];

    var len1 = playerList.length;
    for (let i = 0; i < len1; i++) { Player.copy(playerList[i], prev.playerList[i]); }
}

Game.start = function (game, mt) {
    mt.setSeed((new Date()).getTime());
    game.state = State.PLAYING;
    game.phase = Phase.SETUP_SETTLEMENT1;
    game.secondSettlement = Index.NONE;
    game.dice1 = Index.NONE;
    game.dice2 = Index.NONE;
    game.event = Index.NONE;
    game.trade.playerIndex = Index.NONE;
    game.largestArmy = Index.NONE;
    game.longestRoad = Index.NONE;
    game.selectingKnight = Index.NONE;
    game.attackedKnight = KnightRank.NONE;
    game.diceHistory = [];
    game.eventHistory = [];
    game.strongestKnightsPlayer = [];
    game.weakestKnightsPlayer = [];
    game.noGainPlayer = [];
    game.needDiscardCardPlayer = [];
    game.metropolisStock = [1, 1, 1];
    game.selectingDevelopmentType = Index.NONE;
    game.inventorSelecting = Index.NONE;
    game.spySelecting = Index.NONE;
    game.alchemistDice1 = Index.NONE;
    game.alchemistDice2 = Index.NONE;
    game.commercialHarborDone = [];
    game.commercialHarborCurrent = Index.NONE;
    game.masterMerchantSelecting = Index.NONE;
    game.merchantInfo = [Index.NONE, Index.NONE];

    
    var settlementList = game.settlementList;

    var i;
    var len1 = settlementList.length;
    for (i = 0; i < len1; i++) { settlementList[i] = SettlementRank.NONE | 0x00ff; }
    
    var roadList = game.roadList;

    len1 = roadList.length;
    for (i = 0; i < len1; i++) { roadList[i] = Index.NONE; }

    var knightList = game.knightList;
    
    len1 = knightList.length;
    for (i = 0; i < len1; i++) { knightList[i] = KnightRank.NONE | 0x0000ff; }

    var cityWallList = game.cityWallList;

    len1 = cityWallList.length;
    for (i = 0; i < len1; i++) { cityWallList[i] = 0xff; }


    var tmpSettlementList = game.tmpSettlementList;

    len1 = tmpSettlementList.length;
    for (i = 0; i < len1; i++) { tmpSettlementList[i] = Index.NONE; }
    
    game.active = 0;
    game.priority.length = 0;
    game.priority.push(0);
    game.canPlayCard = true;
    game.isBarbarianArrivedOnce = false;
    game.barbarianPos = 0;
    
    var landList = game.landList;
    
    landList.length = 0;
    for (i = 0; i < 3; i++) { landList.push(Resource.BRICK); }
    for (i = 0; i < 4; i++) { landList.push(Resource.WOOL); }
    for (i = 0; i < 3; i++) { landList.push(Resource.ORE); }
    for (i = 0; i < 4; i++) { landList.push(Resource.GRAIN); }
    for (i = 0; i < 4; i++) { landList.push(Resource.LUMBER); }
    landList.push(Land.DESERT);
    
    this.suffle(landList, mt);
    
    for (i = 0; game.landList[i] !== Land.DESERT; i++);
    game.robber = i;
    
    if (game.setup === Option.ALPHABET_SETUP) {
        this.setupAlphabet(game, mt);
    } else {
        this.setupRandom(game, mt);
    }

    var cardStockTrade = game.cardStockTrade;
    var cardStockPolitics = game.cardStockPolitics;
    var cardStockScience = game.cardStockScience;
    cardStockTrade.length = 0;
    cardStockPolitics.length = 0;
    cardStockScience.length = 0;

    // For Science Card
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.ALCHEMIST); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.CRANE); }
    for (i = 0; i < 1; i++) { cardStockScience.push(Card.ENGINEER); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.INVENTOR); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.IRRIGATION); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.MEDICINE); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.MINING); }
    for (i = 0; i < 1; i++) { cardStockScience.push(Card.PRINTER); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.ROAD_BUILDING); }
    for (i = 0; i < 2; i++) { cardStockScience.push(Card.SMITH); }

    // For Politics Card
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.BISHOP); }
    for (i = 0; i < 1; i++) { cardStockPolitics.push(Card.CONSTITUTION); }
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.DESERTER); }
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.DIPLOMAT); }
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.INTRIGUE); }
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.SABOTEUR); }
    for (i = 0; i < 3; i++) { cardStockPolitics.push(Card.SPY); }
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.WARLORD); }
    for (i = 0; i < 2; i++) { cardStockPolitics.push(Card.WEDDING); }

    // For Trade Card
    for (i = 0; i < 2; i++) { cardStockTrade.push(Card.COMMERCIAL_HARBOR); }
    for (i = 0; i < 2; i++) { cardStockTrade.push(Card.MASTER_MERCHANT); }
    for (i = 0; i < 6; i++) { cardStockTrade.push(Card.MERCHANT); }
    for (i = 0; i < 2; i++) { cardStockTrade.push(Card.MERCHANT_FLEET); }
    for (i = 0; i < 4; i++) { cardStockTrade.push(Card.RESOURCE_MONOPOLY); }
    for (i = 0; i < 2; i++) { cardStockTrade.push(Card.TRADE_MONOPOLY); }
    
    this.suffle(cardStockTrade, mt);
    this.suffle(cardStockPolitics, mt);
    this.suffle(cardStockScience, mt);
    
    var resourceStock = game.resourceStock;

    len1 = resourceStock.length;
    for (i = 0; i <  len1; i++) { 
        if(i > Resource.LUMBER) {
            resourceStock[i] = 12; 
        } else {
            resourceStock[i] = 19; 
        }
    }
    
    var playerList = game.playerList;

    len1 = game.playerSize = game.playerList[3].uid === '' ? 3 : 4;
    for (i = 0; i < len1; i++) { Player.start(playerList[i]); }
    
    if (len1 === 3) { Player.clear(playerList[3]); }
}

Game.isWrongNumberList = function (numberList) {
    var i;
    var len1 = numberList.length;
    for (i = 0; i < len1; i++) {
        if (numberList[i] === 6 || numberList[i] === 8) {
            switch (i) {
                case 0: case 1:
                    if (
                           (numberList[i + 1] === 6 || numberList[i + 1] === 8)
                        || (numberList[i + 3] === 6 || numberList[i + 3] === 8)
                        || (numberList[i + 4] === 6 || numberList[i + 4] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 2:
                    if (
                           (numberList[i + 3] === 6 || numberList[i + 3] === 8)
                        || (numberList[i + 4] === 6 || numberList[i + 4] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 3: case 4: case 5: case 8: case 9: case 10:
                    if (
                           (numberList[i + 1] === 6 || numberList[i + 1] === 8)
                        || (numberList[i + 4] === 6 || numberList[i + 4] === 8)
                        || (numberList[i + 5] === 6 || numberList[i + 5] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 6:
                    if (
                           (numberList[i + 4] === 6 || numberList[i + 4] === 8)
                        || (numberList[i + 5] === 6 || numberList[i + 5] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 7:
                    if (
                           (numberList[i + 1] === 6 || numberList[i + 1] === 8)
                        || (numberList[i + 5] === 6 || numberList[i + 5] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 11:
                    if (numberList[i + 4] === 6 || numberList[i + 4] === 8) { return true; }
                    break;
                case 12:
                    if (
                           (numberList[i + 1] === 6 || numberList[i + 1] === 8)
                        || (numberList[i + 4] === 6 || numberList[i + 4] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 13: case 14:
                    if (
                           (numberList[i + 1] === 6 || numberList[i + 1] === 8)
                        || (numberList[i + 3] === 6 || numberList[i + 3] === 8)
                        || (numberList[i + 4] === 6 || numberList[i + 4] === 8)
                    ) {
                        return true;
                    }
                    break;
                case 15:
                    if (numberList[i + 3] === 6 || numberList[i + 3] === 8) { return true; }
                    break;
                case 16: case 17:
                    if (numberList[i + 1] === 6 || numberList[i + 1] === 8) { return true; }
                    break;
            }
        }
    }
    
    return false;
}

Game.setupRandom = function(game, mt) {
    var tmp = [];
    do {
        var numberList = game.numberList = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

        while (numberList.length > 0) {
            tmp.push(numberList.splice(mt.nextInt(numberList.length), 1)[0]);
        }

        while (tmp.length > 0) {
            if (game.landList[numberList.length] === Land.DESERT) { numberList.push(Land.DESERT); }
            numberList.push(tmp.splice(mt.nextInt(tmp.length), 1)[0]);
        }
    } while (this.isWrongNumberList(numberList));
}

Game.setupAlphabet = function(game, mt) {
    var index = mt.nextInt(ALPHABET_SIGNPOST.length);

    var j = 0;

    var i;
    var len1 = ALPHABET_SIGNPOST[index].length;
    for (i = 0; i < len1; i++) {
        var k = ALPHABET_SIGNPOST[index][i];

        if (game.landList[k] === Land.DESERT) {
            game.numberList[k] = Land.DESERT;
        } else {
            game.numberList[k] = ALPHABET_CHIP[j];

            j++;
        }
    }
}

Game.proceedBarbarian = function (game) {
    game.barbarianPos++;
    if(game.barbarianPos === 8) {
        game.barbarianPos = 0;
    }
}

Game.hasPriorityUid = function (game, uid) {
    var playerList = game.playerList;
    var priority = game.priority;

    var i;
    var len1 = priority.length;
    for (i = 0; i < len1; i++) {
        if (playerList[priority[i]].uid === uid) { return true; }
    }
    
    return false;
}

Game.gainResource = function (game, color, type, size) {
    game.resourceStock[type] -= size;
    game.playerList[color].resource[type] += size;
}

Game.canGetCard = function (game, color, dice, developmentType) {
    if(game.playerList[color].development[developmentType] === 0) {
        return false;
    }
    if(game.playerList[color].development[developmentType] >= (dice -1)) {
        return true;
    }
    return false;
}

Game.getCard = function (game, color, developmentType) {
    var nextCard = undefined;

    switch(developmentType) {
        case Development.TRADE:
            nextCard = game.cardStockTrade.shift();
            game.playerList[color].progressCard.push(nextCard);
            break;
        case Development.POLITICS:
            nextCard = game.cardStockPolitics.shift();
            if(nextCard === Card.CONSTITUTION) {
                game.playerList[color].victoryPoint++;
                game.playerList[color].pointCard.push(nextCard);
            } else {
                game.playerList[color].progressCard.push(nextCard);
            }            
            break;
        case Development.SCIENCE:
            nextCard = game.cardStockScience.shift();
            if(nextCard === Card.PRINTER) {
                game.playerList[color].victoryPoint++;
                game.playerList[color].pointCard.push(nextCard);
            } else {
                game.playerList[color].progressCard.push(nextCard);
            }
            break;
        default:
            break;
    }
    return nextCard;
}

Game.gainResourceCity = function (game, color, type) {
    switch(type) {
        case Resource.WOOL:
            this.gainResource(game, color, type, 1);
            this.gainResource(game, color, Resource.CLOTH, 1);
            break;
        case Resource.ORE:
            this.gainResource(game, color, type, 1);
            this.gainResource(game, color, Resource.COIN, 1);
            break;
        case Resource.LUMBER:
            this.gainResource(game, color, type, 1);
            this.gainResource(game, color, Resource.PAPER, 1);
            break;
        default:
            this.gainResource(game, color, type, 2);
            break;
    }
}

Game.loseResource = function (game, color, type, size) {
    game.resourceStock[type] += size;
    game.playerList[color].resource[type] -= size;
}

Game.roadSize = function (game, color, index, max, depth) {
    if (game.roadList[index] !== color) {
        return depth;
    } else {
        var roadList = game.roadList;
        roadList[index] = Index.NONE;

        if (depth + 1 > max) { max = depth + 1; }

        var settlementList = game.settlementList;
        var knightList = game.knightList;
        
        var i;
        var len1 = ROAD_LINK[index].length;
        for (i = 0; i < len1; i++) {
            if (((settlementList[ROAD_LINK[index][i]] & 0xff00) === SettlementRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) ===KnightRank.NONE)
            || (settlementList[ROAD_LINK[index][i]] & 0x00ff) === color
            || (knightList[ROAD_LINK[index][i]] & 0x0000ff) === color
            )
            {
                var before = settlementList[ROAD_LINK[index][i]];
                var beforeKnight = knightList[ROAD_LINK[index][i]];
                
                settlementList[ROAD_LINK[index][i]] = (SettlementRank.SETTLEMENT | 0x00ff);
                knightList[ROAD_LINK[index][i]] = (KnightRank.MIGHTY | 0x0000ff);

                var j;
                var len2 = SETTLEMENT_LINK[ROAD_LINK[index][i]].length;
                for (j = 0; j < len2; j++) {
                    var size = this.roadSize(game, color, SETTLEMENT_LINK[ROAD_LINK[index][i]][j], max, depth + 1);
                    if (size > max) { max = size; }
                }
                
                settlementList[ROAD_LINK[index][i]] = before;
                knightList[ROAD_LINK[index][i]] = beforeKnight;
            }
        }
        
        roadList[index] = color;
    }
    
    return max;
}

Game.longestRoad = function (game) {
    var sizeList = [0, 0, 0, 0];
    
    var i;
    var len1 = sizeList.length;
    for (i = 0; i < len1; i++) {
        var j;
        var len2 = game.roadList.length;
        for (j = 0; j < len2; j++) {
            var size = this.roadSize(game, i, j, 0, 0);
            if (size > sizeList[i]) { sizeList[i] = size; }
        }
    }
    
    var max = 0;

    len1 = sizeList.length;
    for (i = 0; i < len1; i++) {
        if (sizeList[i] > sizeList[max]) { max = i; }
    }
    
    var longestRoad = game.longestRoad;
    var playerList = game.playerList;
    
    if (sizeList[max] < 5) {
        max = Index.NONE;
        
        if (longestRoad !== Index.NONE) {
            playerList[longestRoad].bonusScore -= 2;
            game.longestRoad = Index.NONE;
        }
    } else {
        if (longestRoad === Index.NONE) {
            if (sizeList.filter(size => size === sizeList[max]).length === 1) { // 誰も取っていない状態から、単独1位であれば道賞獲得
                game.longestRoad = max;
                playerList[max].bonusScore += 2;
            } else { // 誰も取ってない状態から、同率1位の場合は道賞は移動しない
                max = Index.NONE;
            }
        } else if (max !== longestRoad && sizeList[max] > sizeList[longestRoad] && sizeList.filter(size => size === sizeList[max]).length === 1) { // 誰かが取っている状態で、距離をまくって、単独首位の場合、道賞移動する
            playerList[longestRoad].bonusScore -= 2;
            game.longestRoad = max;
            playerList[max].bonusScore += 2;
        } else if (max !== longestRoad && sizeList[max] > sizeList[longestRoad]) { // 誰かが取っている状態で、距離をまくったが、単独首位ではない場合、道賞が空位になる
            playerList[longestRoad].bonusScore -= 2;
            game.longestRoad = Index.NONE;
            max = Index.NONE;
        } else {  // 誰かが取っている状態でも、距離をまくれなかった場合は道賞は移動しない
            max = Index.NONE;
        }
    }
    
    return max;
}

Game.largestArmy = function (game) {
    var result = Index.NONE;

    var active = game.active;
    var activePlayer = game.playerList[active];
    var largestArmy = game.largestArmy;
    var size = activePlayer.deadCard[Card.SOLDIER];

    if (largestArmy === Index.NONE) {
        if (size >= 3) {
            result = game.largestArmy = active;
            activePlayer.bonusScore += 2;
        }
    } else if (largestArmy !== active) {
        var largestArmyPlayer = game.playerList[largestArmy];

        if (size > largestArmyPlayer.deadCard[Card.SOLDIER]) {
            largestArmyPlayer.bonusScore -= 2;
            result = game.largestArmy = active;
            activePlayer.bonusScore += 2;
        }
    }

    return result;
}

Game.strengthOfKnights = function (game) {
    for(var player = 0; player < game.playerList.length; player++) {
        game.playerList[player].strengthOfKnights = 0;
    }
    for(var i = 0; i < game.knightList.length; i++) {
        if (Game.isKnightActive(game, i)) {
            var player = game.knightList[i] & 0x0000ff;
            game.playerList[player].strengthOfKnights += (game.knightList[i] & 0xff0000) >>> 16;
        }
    }
    var max = Math.max(...game.playerList.map(p => p.strengthOfKnights));

    var targetPlayer = game.playerList
    .map((p, i) => {
        return {index: i, strength: p.strengthOfKnights, hasCity: Game.hasCity(game, i)};
    })
    .filter(p => p.hasCity);


    var min = Math.min(...targetPlayer.map(p => p.strength));
    game.strongestKnightsPlayer = game.playerList
                                .map((p, i) => {
                                    return {index: i, strength: p.strengthOfKnights};
                                })
                                .filter(p => p.strength === max)
                                .map(p => p.index)
                                .filter(i => i < game.playerSize);
    game.strongestKnightsPlayer.sort((a , b) => {
        let diffA = a-game.active;
        if(diffA < 0) {
            diffA += 4;
        }
        let diffB = b-game.active;
        if(diffB < 0) {
            diffB += 4;
        }
        return diffA - diffB;
    })
    game.weakestKnightsPlayer = targetPlayer
                                .filter(p => p.strength === min)
                                .map(p => p.index)
                                .filter(i => i < game.playerSize);
    game.weakestKnightsPlayer.sort((a , b) => {
        let diffA = a-game.active;
        if(diffA < 0) {
            diffA += 4;
        }
        let diffB = b-game.active;
        if(diffB < 0) {
            diffB += 4;
        }
        return diffA - diffB;
    })                                
}

Game.buildSettlement = function (game, index, city = false) {
    var active = game.active;
    var playerList = game.playerList;
        
    if(city) {
        game.settlementList[index] = SettlementRank.CITY | active;
        playerList[active].cityStock--;
        playerList[active].baseScore += 2;
    } else {
        game.settlementList[index] = SettlementRank.SETTLEMENT | active;
        playerList[active].settlementStock--;
        playerList[active].baseScore++;
    }
    
    switch (index) {
        case 5: case 6: case 16: case 27: case 36: case 46: case 52: case 53:
            playerList[active].harbor[Harbor.GENERIC] = true;
            break;
        case 2: case 3:
            playerList[active].harbor[Harbor.ORE] = true;
            break;
        case 7: case 8:
            playerList[active].harbor[Harbor.GRAIN] = true;
            break;
        case 15: case 25:
            playerList[active].harbor[Harbor.WOOL] = true;
            break;
        case 38: case 39:
            playerList[active].harbor[Harbor.LUMBER] = true;
            break;
        case 49: case 50:
            playerList[active].harbor[Harbor.BRICK] = true;
            break;
    }
}

Game.buildKnight = function (game, index) {
    var active = game.active;
    var playerList = game.playerList;

    game.knightList[index] = KnightRank.BASIC | active;
    playerList[active].knightStock[0]--;
}

Game.activateKnight = function (game, index) {
    game.knightList[index] |= KnightStatus.ACTIVATE;
}
Game.makeKnightActive = function (game, index) {
    game.knightList[index] |= KnightStatus.ACTIVE;
}
Game.promoteKnight = function (game, index) {
    var active = game.active;
    var playerList = game.playerList;
    var prev = (game.knightList[index] & 0xff0000) >>> 16;
    game.knightList[index] += KnightRank.BASIC;
    game.knightList[index] |= KnightStatus.PROMOTED;
    var current = (game.knightList[index] & 0xff0000) >>> 16;
    playerList[active].knightStock[prev - 1]++;
    playerList[active].knightStock[current - 1]--;
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

Game.hasCanBuildKnight = function (game) {
    var i;
    var len1 = game.knightList.length;
    for (i = 0; i < len1; i++) {
        if (Game.canBuildKnight(game, i)) { return true; }
    }
    
    return false;
}

Game.hasCanPromoteKnight = function (game) {
    var active = game.active;

    for(let i = 0; i < game.knightList.length; i++) {
        var rank = game.knightList[i] & 0xff0000;
        var next = (rank >>> 16) + 1;
        var nextRank = rank + KnightRank.BASIC;
        var mightyFlag = (nextRank === KnightRank.MIGHTY) && !Game.hasPoliticsPower(game, game.active);   
        var promoteFlag = (game.knightList[i] & KnightStatus.PROMOTED) === KnightStatus.PROMOTED;
        
        if((game.knightList[i] & 0x0000ff) === active &&  rank >= KnightRank.BASIC && rank < KnightRank.MIGHTY && !promoteFlag && game.playerList[active].knightStock[next - 1] > 0 && !mightyFlag) {
            return true; 
        }
    }
    return false;
}

Game.deactivateKnight = function (game, index) {
    game.knightList[index] &= KnightStatus.DEACTIVATE;
}
Game.isKnightActive = function (game, index) {
    return ((game.knightList[index] | KnightStatus.DEACTIVATE) & KnightStatus.ACTIVATE) === KnightStatus.ACTIVATE;
}

Game.isHataTriangle = function (game, index) {
    var active = game.active;
    var tri = Const.HATA_TRI.filter(ht => ht.some(t => t === index));
    return tri.some(t => t.every(i => (game.settlementList[i] & '0xF') ===  active));
}

Game.hasResource = function (player) {
    const resource = player.resource;
    return resource[Resource.BRICK]
    + resource[Resource.WOOL]
    + resource[Resource.ORE]
    + resource[Resource.GRAIN]
    + resource[Resource.LUMBER]
    + resource[Resource.CLOTH]
    + resource[Resource.COIN]
    + resource[Resource.PAPER]
    > 0;
}

Game.canKnightMove = function (game, color, index, result) {
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
                || ((knightList[ROAD_LINK[index][i]] & 0x0000ff) !== color && (knightList[ROAD_LINK[index][i]] & 0xff0000) !== KnightRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) < (knightList[game.selectingKnight] & 0xff0000))
            ) {
                if((settlementList[ROAD_LINK[index][i]] & 0xff00) === SettlementRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) ===KnightRank.NONE
                   || ((knightList[ROAD_LINK[index][i]] & 0x0000ff) !== color && (knightList[ROAD_LINK[index][i]] & 0xff0000) !== KnightRank.NONE && (knightList[ROAD_LINK[index][i]] & 0xff0000) < (knightList[game.selectingKnight] & 0xff0000))
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
                    this.canKnightMove(game, color, SETTLEMENT_LINK[ROAD_LINK[index][i]][j], result);
                }
                
                settlementList[ROAD_LINK[index][i]] = beforeSettlement;
                knightList[ROAD_LINK[index][i]] = beforeKnight;
            }
        }
        
        roadList[index] = color;
    }
    
    return;
}

Game.buildRoad = function (game, index) {
    var active = game.active;
    
    game.roadList[index] = active;
    game.playerList[active].roadStock--;
}

Game.buildCity = function (game, index) {
    var active = game.active;
    var playerList = game.playerList;
    if(game.tmpSettlementList[index] === game.active) {
        game.tmpSettlementList[index] = Index.NONE;
    } else {
        playerList[active].cityStock--;
        playerList[active].settlementStock++;
    }    
    game.settlementList[index] = SettlementRank.CITY | active;
    playerList[active].baseScore++;
}
Game.buildMetropolis = function (game, index, type) {
    var active = game.active;
    var playerList = game.playerList;
    
    game.settlementList[index] = SettlementRank.METROPOLIS | active;
    game.metropolisStock[type]--;
    // playerList[active].cityStock++;
    playerList[active].metropolisIndex[type] = 1;
    playerList[active].baseScore += 2;
}
Game.buildCityWall = function (game, index) {
    var active = game.active;
    var playerList = game.playerList;
    game.cityWallList[index] = active;
    playerList[active].cityWallStock--;
    playerList[active].burstThreshold += 2;
}

Game.pillageMetropolis = function (game, player, index, type) {
    var playerList = game.playerList;
    game.settlementList[index] = SettlementRank.CITY | player;
    // playerList[player].cityStock--;
    playerList[player].metropolisIndex[type] = Index.NONE;
    playerList[player].baseScore -= 2;
}

Game.pillageCity = function (game, index, player) {
    var playerList = game.playerList;
    game.settlementList[index] = SettlementRank.SETTLEMENT | player;
    if(playerList[player].settlementStock > 0) {
        playerList[player].cityStock++;
        playerList[player].settlementStock--;
    } else { // 家の在庫がない場合
        game.tmpSettlementList[index] = player;
    }
    playerList[player].baseScore--;
    
    if(game.cityWallList[index] === player) {
        game.cityWallList[index] = 0xff;
        playerList[player].cityWallStock++;
        playerList[player].burstThreshold -= 2;
    }
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

Game.developeCity = function (game, type, crane = false) {
    var active = game.active;
    var current = game.playerList[active].development[type];
    var resourceNeeded = current + 1;
    if(crane) {
        resourceNeeded = current;
    }
    this.loseResource(game, active, Resource.CLOTH + type, resourceNeeded);
    game.playerList[active].development[type]++;
    if(game.metropolisStock[type] > 0 && game.playerList[active].development[type] === 4) { // 4段階目の最初
        return Index.NONE;
    } else if(game.playerList[active].development[type] === 5 &&  game.playerList[active].metropolisIndex[type] === Index.NONE && game.playerList.filter((p, i) => i !== active ).every(p => p.development[type] < 5)) { // メトロポリス奪う場合
        var player = game.playerList
                    .map((p, index) => {
                        return {
                            mi: p.metropolisIndex,
                            i: index
                        };
                    })
                    .filter(p => p.i !== active)
                    .find(p => p.mi[type] !== Index.NONE);
        return player.i;
    }
    return NaN;
}

Game.canBuildRoad = function (game, index) {
    var roadList = game.roadList;
    
    if (roadList[index] === Index.NONE) {
        var active = game.active;
        var settlementList = game.settlementList;

        var i;
        var len1 = ROAD_LINK[index].length;
        for (i = 0; i < len1; i++) {
            if ((settlementList[ROAD_LINK[index][i]] & 0x00ff) === active) {
                return true;
            } else if ((settlementList[ROAD_LINK[index][i]] & 0xff00) === SettlementRank.NONE) {
                var j;
                var len2 = SETTLEMENT_LINK[ROAD_LINK[index][i]].length;
                for (j = 0; j < len2; j++) {
                    if (roadList[SETTLEMENT_LINK[ROAD_LINK[index][i]][j]] === active) {
                        return true;
                    }
                }
            }
        }
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

Game.hasPoliticsPower = function (game, color) {
    return game.playerList[color].development[Development.POLITICS] >= 3;
}
Game.hasTradePower = function (game, color) {
    return game.playerList[color].development[Development.TRADE] >= 3;
}
Game.hasSciencePower = function (game, color) {
    return game.playerList[color].development[Development.SCIENCE] >= 3;
}

Game.discardCard = function (game, player, card) {
    var progressCard = game.playerList[player].progressCard;
    progressCard.splice(progressCard.findIndex(c => c === card), 1);
    if(card <= Card.SMITH) {
        game.cardStockScience.push(card);
    } else if (card <= Card.WEDDING) {
        game.cardStockPolitics.push(card);
    } else if (card <= Card.TRADE_MONOPOLY) {
        game.cardStockTrade.push(card);
    }
}

Game.harvestAction = function (game, resource) {
    const landList = game.landList.map((land, index) => {
        return {
            land: land,
            index: index
        };
    })
    .filter(l => l.land === resource);
    let count = 0;
    landList.forEach(l => {
        if(LAND_LINK[l.index].some(intersection => (game.settlementList[intersection] & 0x00ff) === game.active)) {
            count++;
        }
    });
    const gainCount = Math.min(count * 2, game.resourceStock[resource]);
    Game.gainResource(game, game.active, resource, gainCount);
    return gainCount;
}

module.exports = Game;