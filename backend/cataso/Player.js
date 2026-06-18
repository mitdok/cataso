var Const = require('./Const');
var Index = Const.Index;

var Player = function () { }

Player.clear = function (player) {
    player.uid = '';
    player.baseScore = 0;
    player.bonusScore = 0;
    player.burst = 0;
    player.roadStock = 0;
    player.settlementStock = 0;
    player.cityStock = 0;
    player.secondSettlement = Index.NONE;
    player.harbor = [false, false, false, false, false, false];
    player.resource = [0, 0, 0, 0, 0];
    player.sleepCard = [0, 0, 0, 0, 0];
    player.wakeCard = [0, 0, 0, 0, 0];
    player.deadCard = [0, 0, 0, 0, 0];
    player.trading = false;
}

Player.copy = function (player, prev) {
    player.uid = prev.uid ? prev.uid : '';
    player.baseScore = prev.baseScor ? prev.baseScor : 0;
    player.bonusScore = prev.bonusScore ? prev.bonusScore : 0;
    player.burst = prev.burst ? prev.burst : 0;
    player.roadStock = prev.roadStock ? prev.roadStock : 0;
    player.settlementStock = prev.settlementStock ? prev.settlementStock : 0;
    player.cityStock = prev.cityStock ? prev.cityStock : 0;
    player.secondSettlement = prev.secondSettlement ? prev.secondSettlement : Index.NONE;
    player.harbor = prev.harbor ? prev.harbor : [false, false, false, false, false, false];
    player.resource = prev.resource ? prev.resource : [0, 0, 0, 0, 0];
    player.sleepCard = prev.sleepCard ? prev.sleepCard : [0, 0, 0, 0, 0];
    player.wakeCard = prev.wakeCard ? prev.wakeCard :[0, 0, 0, 0, 0];
    player.deadCard = prev.deadCard ? prev.deadCard : [0, 0, 0, 0, 0];
    player.trading = prev.trading ? prev.trading : false;
}

Player.start = function (player) {
    player.baseScore = 0;
    player.bonusScore = 0;
    player.burst = 0;
    player.roadStock = 15;
    player.settlementStock = 5;
    player.cityStock = 4;
    player.secondSettlement = Index.NONE;
    player.trading = false;
    
    var harbor = player.harbor;

    var i;
    var len1 = harbor.length;
    for (i = 0; i < len1; i++) { player.harbor[i] = false; }
    
    var resource = player.resource;

    len1 = resource.length;
    for (i = 0; i < len1; i++) { resource[i] = 0; }
    
    var sleepCard = player.sleepCard;
    var wakeCard = player.wakeCard;
    var deadCard = player.deadCard;
    
    for (i = 0; i < 5; i++) { sleepCard[i] = wakeCard[i] = deadCard[i] = 0; }
}

module.exports = Player;