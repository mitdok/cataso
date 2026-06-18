var Player = function () { }

Player.clear = function (player) {
    player.uid = '';
    player.hand = [];
    player.talon = [];
    player.count = 0;
    player.leader = 0;
    player.time = 0;
    player.field = [ [], [], [], [], [], [], [], [], [] ];
}
Player.copy = function (player, prev) {
    player.uid =  prev.uid || '';
    player.hand = prev.hand || [];
    player.talon = prev.talon || [];
    player.count = prev.count || 0;
    player.leader = prev.leader || 0;
    player.time = prev.time || 0;
    player.field = prev.field ||  [ [], [], [], [], [], [], [], [], [] ];
}

Player.start = function (player) {
    player.hand.length = 0;
    player.talon.length = 0;
    player.count = 0;
    player.leader = 0;
    player.time = 0;
    player.field = [ [], [], [], [], [], [], [], [], [] ];
}

module.exports = Player;