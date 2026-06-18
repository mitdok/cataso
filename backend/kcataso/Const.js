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
Const.Sound.HATA = 10;

Const.Index = function () { }
Const.Index.NONE = -1;

Const.Option = function () { }
Const.Option.ALPHABET_SETUP = 0;
Const.Option.RANDOM_SETUP = 1;

Const.State = function () { }
Const.State.READY = 0;
Const.State.PLAYING = 1;

Const.Phase = function () { }
Const.Phase.NONE = -1;
Const.Phase.SETUP_SETTLEMENT1 = 0;
Const.Phase.SETUP_ROAD1 = 1;
// Const.Phase.SETUP_SETTLEMENT2 = 2;
Const.Phase.SETUP_CITY = 2;
Const.Phase.SETUP_ROAD2 = 3;
Const.Phase.DICE = 4;
Const.Phase.BURST = 5;
Const.Phase.ROBBER1 = 6;
Const.Phase.ROBBER2 = 7;
Const.Phase.MAIN = 8;
Const.Phase.BUILD_ROAD = 9;
Const.Phase.BUILD_SETTLEMENT = 10;
Const.Phase.BUILD_CITY = 11;
Const.Phase.DOMESTIC_TRADE1 = 12;
Const.Phase.DOMESTIC_TRADE2 = 13;
Const.Phase.INTERNATIONAL_TRADE = 14;
Const.Phase.SOLDIER1 = 15;
Const.Phase.SOLDIER2 = 16;
Const.Phase.ROAD_BUILDING1 = 17;
Const.Phase.ROAD_BUILDING2 = 18;
Const.Phase.YEAR_OF_PLENTY1 = 19;
Const.Phase.YEAR_OF_PLENTY2 = 20;
Const.Phase.MONOPOLY = 21;
Const.Phase.DOMESTIC_TRADE3 = 22;
Const.Phase.BARBARIAN_SAVE1 = 23;
Const.Phase.BARBARIAN_SAVE2 = 24;
Const.Phase.BARBARIAN_DEFEAT1 = 25;
Const.Phase.BUILD_KNIGHT = 27;
Const.Phase.ACTIVATE_KNIGHT = 28;
Const.Phase.PROMOTE_KNIGHT = 29;
Const.Phase.MOVE_KNIGHT1 = 30;
Const.Phase.MOVE_KNIGHT2 = 31;
Const.Phase.MOVE_KNIGHT3 = 32;
Const.Phase.MOVE_ROBBER1 = 33;
Const.Phase.MOVE_ROBBER2 = 34;
Const.Phase.MOVE_ROBBER3 = 35;
Const.Phase.DEVELOPMENT1 = 36;
Const.Phase.BUILD_METROPOLIS = 37;
Const.Phase.GAIN_RESOURCE = 38;
Const.Phase.BUILD_CITYWALL = 39;
Const.Phase.DISCARD_CARD = 40;
Const.Phase.USE_CARD = 41;
Const.Phase.CRANE = 42;
Const.Phase.ENGINEER = 43;
Const.Phase.INVENTOR1 = 44;
Const.Phase.INVENTOR2 = 45;
Const.Phase.MEDICINE = 46;
Const.Phase.SMITH1 = 47;
Const.Phase.SMITH2 = 48;
Const.Phase.BISHOP = 49;
Const.Phase.DESERTER1 = 50;
Const.Phase.DESERTER2 = 51;
Const.Phase.DESERTER3 = 52;
Const.Phase.DIPLOMAT1 = 53;
Const.Phase.DIPLOMAT2 = 54;
Const.Phase.INTRIGUE = 55;
Const.Phase.SABOTEUR = 56;
Const.Phase.SPY1 = 57;
Const.Phase.SPY2 = 58;
Const.Phase.WEDDING = 59;
Const.Phase.ALCHEMIST = 60;
Const.Phase.COMMERCIAL_HARBOR1 = 61;
Const.Phase.COMMERCIAL_HARBOR2 = 62;
Const.Phase.MASTER_MERCHANT1 = 63;
Const.Phase.MASTER_MERCHANT2 = 64;
Const.Phase.MASTER_MERCHANT3 = 65;
Const.Phase.MERCHANT_FLEET = 66;
Const.Phase.RESOURCE_MONOPOLY = 67;
Const.Phase.TRADE_MONOPOLY = 68;
Const.Phase.MERCHANT = 69;
Const.Phase.CHOICE_PILLAGED_METROPOLIS = 70;
Const.Phase.DISCARD_CARD_OTHER = 71;

Const.Land = function () { }
Const.Land.DESERT = -1;

Const.Resource = function () { }
Const.Resource.BRICK = 0;   // 土
Const.Resource.WOOL = 1;    // 羊 (布)
Const.Resource.ORE = 2;     // 鉄 (コイン)
Const.Resource.GRAIN = 3;   // 麦
Const.Resource.LUMBER = 4;  // 木 (紙)
Const.Resource.CLOTH = 5;   // 布
Const.Resource.COIN = 6;    // コイン
Const.Resource.PAPER = 7;   // 紙

Const.Development = function () {}
Const.Development.TRADE = 0;
Const.Development.POLITICS = 1;
Const.Development.SCIENCE = 2;



Const.SettlementRank = function () { }
Const.SettlementRank.NONE = 0x0000;
Const.SettlementRank.SETTLEMENT = 0x0100;
Const.SettlementRank.CITY = 0x0200;
Const.SettlementRank.METROPOLIS = 0x0300;

Const.KnightRank = function () { }
Const.KnightRank.NONE = 0x000000;
Const.KnightRank.BASIC = 0x010000;
Const.KnightRank.STRONG = 0x020000;
Const.KnightRank.MIGHTY = 0x030000;

Const.KnightStatus = function() {}
Const.KnightStatus.ACTIVATE = 0x000100;
Const.KnightStatus.ACTIVE = 0x001100;
Const.KnightStatus.DEACTIVATE = 0xFF00FF;
Const.KnightStatus.PROMOTED = 0x002000;
Const.KnightStatus.OFF_PROMOTED = 0xFFDFFF;



Const.Card = function () { }
// Science Card
Const.Card.BACK = 0;
Const.Card.ALCHEMIST = 1;
Const.Card.CRANE = 2;
Const.Card.ENGINEER = 3;
Const.Card.INVENTOR = 4;
Const.Card.IRRIGATION = 5;
Const.Card.MEDICINE = 6;
Const.Card.MINING = 7;
Const.Card.PRINTER = 8;
Const.Card.ROAD_BUILDING = 9;
Const.Card.SMITH = 10;
// Politics Card
Const.Card.BISHOP = 11;
Const.Card.CONSTITUTION = 12;
Const.Card.DESERTER = 13;
Const.Card.DIPLOMAT = 14;
Const.Card.INTRIGUE = 15;
Const.Card.SABOTEUR = 16;
Const.Card.SPY = 17;
Const.Card.WARLORD = 18;
Const.Card.WEDDING = 19;
// Trade Card
Const.Card.COMMERCIAL_HARBOR = 20;
Const.Card.MASTER_MERCHANT = 21;
Const.Card.MERCHANT = 22;
Const.Card.MERCHANT_FLEET = 23;
Const.Card.RESOURCE_MONOPOLY = 24;
Const.Card.TRADE_MONOPOLY = 25;


Const.Harbor = function () { }
Const.Harbor.GENERIC = 0;
Const.Harbor.BRICK = 1;
Const.Harbor.WOOL = 2;
Const.Harbor.ORE = 3;
Const.Harbor.GRAIN = 4;
Const.Harbor.LUMBER = 5;

Const.Event = function() {}
Const.Event.BARBARIAN = 3;
Const.Event.BLUE = 4;
Const.Event.GREEN = 5;
Const.Event.YELLOW = 6;

Const.FONT_COLOR = [
      'red'
    , 'dodgerblue'
    , 'yellow'
    , 'lime'
];

Const.COLOR_NAME = [
      '赤'
    , '青'
    , '黄'
    , '緑'
];


Const.DEVELOP_NAME = [
      '経済'
    , '政治'
    , '科学'
];

Const.RESOURCE_NAME = [
      '土'
    , '羊'
    , '鉄'
    , '麦'
    , '木'
    , '服'
    , '貨'
    , '紙'
];

Const.CARD_NAME = [
    ''
  , '錬金術師'
  , 'クレーン'
  , '技術者'
  , '発明家'
  , '灌漑'
  , '医学'
  , '鉱山'
  , '印刷'
  , '街道'
  , '鍛冶'
  , '司教'
  , '憲法'
  , '投降兵'
  , '外交官'
  , '陰謀'
  , '妨害工作'
  , 'スパイ'
  , '司令官'
  , '婚礼'
  , '交易港'
  , '交易長'
  , '商人'
  , '交易船団'
  , '資源独占'
  , '交易独占'
]

Const.ALPHABET_CHIP = [
      5     // A
    , 2     // B
    , 6     // C
    , 3     // D
    , 8     // E
    , 10    // F
    , 9     // G
    , 12    // H
    , 11    // i
    , 4     // J
    , 8     // K
    , 10    // L
    , 9     // M
    , 4     // N
    , 5     // O
    , 6     // P
    , 3     // Q
    , 11    // R
];

Const.ALPHABET_SIGNPOST = [
      [0, 3, 7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 4, 8, 13, 14, 10, 5, 9]
    , [7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 0, 3, 8, 13, 14, 10, 5, 4, 9]
    , [16, 17, 18, 15, 11, 6, 2, 1, 0, 3, 7, 12, 13, 14, 10, 5, 4, 8, 9]
    , [18, 15, 11, 6, 2, 1, 0, 3, 7, 12, 16, 17, 14, 10, 5, 4, 8, 13, 9]
    , [11, 6, 2, 1, 0, 3, 7, 12, 16, 17, 18, 15, 10, 5, 4, 8, 13, 14, 9]
    , [2, 1, 0, 3, 7, 12, 16, 17, 18, 15, 11, 6, 5, 4, 8, 13, 14, 10, 9]
];

Const.SETTLEMENT_LINK = [
      [0, 6]        // 0
    , [0, 1]        // 1
    , [1, 2, 7]     // 2
    , [2, 3]        // 3
    , [3, 4, 8]     // 4
    , [4, 5]        // 5
    , [5, 9]        // 6
    , [10, 18]      // 7
    , [6, 10, 11]   // 8
    , [11, 12, 19]  // 9
    , [7, 12, 13]   // 10
    , [13, 14, 20]  // 11
    , [8, 14, 15]   // 12
    , [15, 16, 21]  // 13
    , [9, 16, 17]   // 14
    , [17, 22]      // 15
    , [23, 33]      // 16
    , [18, 23, 24]  // 17
    , [24, 25, 34]  // 18
    , [19, 25, 26]  // 19
    , [26, 27, 35]  // 20
    , [20, 27, 28]  // 21
    , [28, 29, 36]  // 22
    , [21, 29, 30]  // 23
    , [30, 31, 37]  // 24
    , [22, 31, 32]  // 25
    , [32, 38]      // 26
    , [33, 39]      // 27
    , [39, 40, 49]  // 28
    , [34, 40, 41]  // 29
    , [41, 42, 50]  // 30
    , [35, 42, 43]  // 31
    , [43, 44, 51]  // 32
    , [36, 44, 45]  // 33
    , [45, 46, 52]  // 34
    , [37, 46, 47]  // 35
    , [47, 48, 53]  // 36
    , [38, 48]      // 37
    , [49, 54]      // 38
    , [54, 55, 62]  // 39
    , [50, 55, 56]  // 40
    , [56, 57, 63]  // 41
    , [51, 57, 58]  // 42
    , [58, 59, 64]  // 43
    , [52, 59, 60]  // 44
    , [60, 61, 65]  // 45
    , [53, 61]      // 46
    , [62, 66]      // 47
    , [66, 67]      // 48
    , [63, 67, 68]  // 49
    , [68, 69]      // 50
    , [64, 69, 70]  // 51
    , [70, 71]      // 52
    , [65, 71]      // 53
];

Const.ROAD_LINK = [
      [1, 0]    // 0
    , [1, 2]    // 1
    , [2, 3]    // 2
    , [3, 4]    // 3
    , [4, 5]    // 4
    , [5, 6]    // 5
    , [0, 8]    // 6
    , [2, 10]   // 7
    , [4, 12]   // 8
    , [6, 14]   // 9
    , [7, 8]    // 10
    , [8, 9]    // 11
    , [9, 10]   // 12
    , [10, 11]  // 13
    , [11, 12]  // 14
    , [12, 13]  // 15
    , [13, 14]  // 16
    , [14, 15]  // 17
    , [7, 17]   // 18
    , [9, 19]   // 19
    , [11, 21]  // 20
    , [13, 23]  // 21
    , [15, 25]  // 22
    , [16, 17]  // 23
    , [17, 18]  // 24
    , [18, 19]  // 25
    , [19, 20]  // 26
    , [20, 21]  // 27
    , [21, 22]  // 28
    , [22, 23]  // 29
    , [23, 24]  // 30
    , [24, 25]  // 31
    , [25, 26]  // 32
    , [16, 27]  // 33
    , [18, 29]  // 34
    , [20, 31]  // 35
    , [22, 33]  // 36
    , [24, 35]  // 37
    , [26, 37]  // 38
    , [27, 28]  // 39
    , [28, 29]  // 40
    , [29, 30]  // 41
    , [30, 31]  // 42
    , [31, 32]  // 43
    , [32, 33]  // 44
    , [33, 34]  // 45
    , [34, 35]  // 46
    , [35, 36]  // 47
    , [36, 37]  // 48
    , [28, 38]  // 49
    , [30, 40]  // 50
    , [32, 42]  // 51
    , [34, 44]  // 52
    , [36, 46]  // 53
    , [38, 39]  // 54
    , [39, 40]  // 55
    , [40, 41]  // 56
    , [41, 42]  // 57
    , [42, 43]  // 58
    , [43, 44]  // 59
    , [44, 45]  // 60
    , [45, 46]  // 61
    , [39, 47]  // 62
    , [41, 49]  // 63
    , [43, 51]  // 64
    , [45, 53]  // 65
    , [47, 48]  // 66
    , [48, 49]  // 67
    , [49, 50]  // 68
    , [50, 51]  // 69
    , [51, 52]  // 70
    , [52, 53]  // 71
];

Const.LAND_LINK = [
      [0, 1, 2, 8, 9, 10]       // 0
    , [2, 3, 4, 10, 11, 12]     // 1
    , [4, 5, 6, 12, 13, 14]     // 2
    , [7, 8, 9, 17, 18, 19]     // 3
    , [9, 10, 11, 19, 20, 21]   // 4
    , [11, 12, 13, 21, 22, 23]  // 5
    , [13, 14, 15, 23, 24, 25]  // 6
    , [16, 17, 18, 27, 28, 29]  // 7
    , [18, 19, 20, 29, 30, 31]  // 8
    , [20, 21, 22, 31, 32, 33]  // 9
    , [22, 23, 24, 33, 34, 35]  // 10
    , [24, 25, 26, 35, 36, 37]  // 11
    , [28, 29, 30, 38, 39, 40]  // 12
    , [30, 31, 32, 40, 41, 42]  // 13
    , [32, 33, 34, 42, 43, 44]  // 14
    , [34, 35, 36, 44, 45, 46]  // 15
    , [39, 40, 41, 47, 48, 49]  // 16
    , [41, 42, 43, 49, 50, 51]  // 17
    , [43, 44, 45, 51, 52, 53]  // 18
];

Const.HATA_TRI = [
  [0, 7, 9],
  [1, 3, 10],
  [2, 9, 11],
  [3, 5, 12],
  [4, 11, 13],
  [6, 13, 15],
  [7, 16, 18],
  [8, 10, 19],
  [9, 18, 20],
  [10, 12, 21],
  [11, 20, 22],
  [12, 14, 23],
  [13, 22, 24],
  [15, 24, 26],
  [17, 19, 29],
  [18, 28, 30],
  [19, 21, 31],
  [20, 30, 32],
  [21, 23, 33],
  [22, 32, 34],
  [23, 25, 35],
  [24, 34, 36],
  [27, 29, 38],
  [29, 31, 40],
  [30, 39, 41],
  [31, 33, 42],
  [32, 41, 43],
  [33, 35, 44],
  [34, 43, 45],
  [35, 37, 46],
  [38, 40, 47],
  [40, 42, 49],
  [41, 48, 50],
  [42, 44, 51],
  [43, 50, 52],
  [44, 46, 53]
]

module.exports = Const;