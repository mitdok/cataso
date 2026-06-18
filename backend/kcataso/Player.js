var Const = require('./Const');
var Index = Const.Index;

var Player = function () { }

Player.clear = function (player) {
    player.uid = '';
    player.baseScore = 0;
    player.bonusScore = 0;
    player.victoryPoint = 0;
    player.burst = 0;
    player.roadStock = 0;
    player.settlementStock = 0;
    player.cityStock = 0;
    player.cityWallStock = 0;
    player.knightStock = [0, 0, 0];
    player.basicKnightStock = 0;
    player.strongKnightStock = 0;
    player.mightyKnightStock = 0;
    player.secondSettlement = Index.NONE;
    player.harbor = [false, false, false, false, false, false];
    player.resource = [0, 0, 0, 0, 0, 0, 0, 0];
    player.progressCard = [];
    player.pointCard = [];
    player.development = [0, 0, 0];
    player.metropolisIndex = [Index.NONE, Index.NONE, Index.NONE];
    player.trading = false;
    player.strengthOfKnights = 0;
    player.burstThreshold = 0;
    player.merchantFleetResource = [];
}

Player.copy = function (player, prev) {
    player.uid = prev.uid || '';
    player.baseScore = prev.baseScore || 0;
    player.bonusScore = prev.bonusScore || 0;
    player.victoryPoint = prev.victoryPoint || 0;
    player.burst = prev.burst || 0;
    player.roadStock = prev.roadStock || 0;
    player.settlementStock = prev.settlementStock || 0;
    player.cityStock = prev.cityStock || 0;
    player.cityWallStock = prev.cityWallStock || 0;
    player.knightStock = prev.knightStock || [0, 0, 0];
    player.basicKnightStock = prev.basicKnightStock || 0;
    player.strongKnightStock = prev.strongKnightStock || 0;
    player.mightyKnightStock = prev.mightyKnightStock || 0;
    player.secondSettlement = prev.secondSettlement;
    player.harbor = prev.harbor || [false, false, false, false, false, false];
    player.resource = prev.resource || [0, 0, 0, 0, 0, 0, 0, 0];
    player.progressCard = prev.progressCard || [];
    player.pointCard = prev.pointCard || [];
    player.development = prev.development || [0, 0, 0];
    player.metropolisIndex = prev.metropolisIndex || [Index.NONE, Index.NONE, Index.NONE];
    player.trading = prev.trading || false;
    player.strengthOfKnights = prev.strengthOfKnights || 0;
    player.burstThreshold = prev.burstThreshold || 0;
    player.merchantFleetResource = prev.merchantFleetResource || [];
}

Player.start = function (player) {
    player.baseScore = 0;
    player.bonusScore = 0;
    player.victoryPoint = 0;
    player.burst = 0;
    player.roadStock = 15;
    player.settlementStock = 5;
    player.cityStock = 4;
    player.cityWallStock = 3;
    player.knightStock = [2, 2, 2];
    player.metropolisIndex = [Index.NONE, Index.NONE, Index.NONE];
    player.secondSettlement = Index.NONE;
    player.trading = false;
    player.strengthOfKnights = 0;
    player.burstThreshold = 7;
    player.progressCard = [];
    player.pointCard = [];
    player.merchantFleetResource = [];

    var harbor = player.harbor;

    var i;
    var len1 = harbor.length;
    for (i = 0; i < len1; i++) { player.harbor[i] = false; }
    
    var resource = player.resource;

    len1 = resource.length;
    // DEBUGGING!!
    for (i = 0; i < len1; i++) { resource[i] = 0; }
    // for (i = 0; i < len1; i++) { resource[i] = 5; }

    for(let i = 0; i < player.development.length; i++) {
        player.development[i] = 0;
    } 
}

module.exports = Player;