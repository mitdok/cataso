var Const = function () { }

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

Const.Mode = function () {}
Const.Mode.BASIC = 0;
Const.Mode.ADVANCE = 1;

Const.State = function () { }
Const.State.READY = 0;
Const.State.PLAYING = 1;

Const.Value = function () { }
Const.Value.NONE = -1;

Const.Index = function () { }
Const.Index.NONE = -1;

Const.Phase = function () { }
Const.Phase.NONE = -1;
Const.Phase.STARTUP = 0;
Const.Phase.TROOP = 1;
Const.Phase.ALEXANDER = 2;
Const.Phase.DARIUS = 3;
Const.Phase.COMPANION = 4;
Const.Phase.SHIELD = 5;
Const.Phase.FOG = 6;
Const.Phase.MUD = 7;
Const.Phase.SCOUT1 = 8;
Const.Phase.SCOUT2 = 9;
Const.Phase.SCOUT3 = 10;
Const.Phase.REDEPLOY1 = 11;
Const.Phase.REDEPLOY2 = 12;
Const.Phase.DESERTER = 13;
Const.Phase.TRAITOR1 = 14;
Const.Phase.TRAITOR2 = 15;
Const.Phase.DRAW = 16;

Const.Card = function () { }
Const.Card.TROOP = 0;
Const.Card.TACTICS = 1;

Const.Tactics = function () { }
Const.Tactics.ALEXANDER = 0x0600;
Const.Tactics.DARIUS = 0x0601;
Const.Tactics.COMPANION = 0x0602;
Const.Tactics.SHIELD = 0x0603;
Const.Tactics.FOG = 0x0604;
Const.Tactics.MUD = 0x0605;
Const.Tactics.SCOUT = 0x0606;
Const.Tactics.REDEPLOY = 0x0607;
Const.Tactics.DESERTER = 0x0608;
Const.Tactics.TRAITOR = 0x0609;

Const.CARD_COLOR = [
  '赤',    // 0
  '青',    // 1
  '緑',    // 2
  '黄',    // 3
  '紫',    // 4
  '橙'     // 5
];

Const.FONT_COLOR = [
      'yellow'
    , 'lime'
];

Const.COLOR_NAME = [
      '黄'
    , '緑'
];

module.exports = Const;
