Index = function () { }
Index.NONE = -1;

Option = function () { }
Option.ALPHABET_SETUP = 0;
Option.RANDOM_SETUP = 1;

State = function () { }
State.READY = 0;
State.PLAYING = 1;

Phase = function () { }
Phase.NONE = -1;
Phase.SETUP_SETTLEMENT1 = 0;
Phase.SETUP_ROAD1 = 1;
Phase.SETUP_SETTLEMENT2 = 2;
Phase.SETUP_ROAD2 = 3;
Phase.DICE = 4;
Phase.BURST = 5;
Phase.ROBBER1 = 6;
Phase.ROBBER2 = 7;
Phase.MAIN = 8;
Phase.BUILD_ROAD = 9;
Phase.BUILD_SETTLEMENT = 10;
Phase.BUILD_CITY = 11;
Phase.DOMESTIC_TRADE1 = 12;
Phase.DOMESTIC_TRADE2 = 13;
Phase.INTERNATIONAL_TRADE = 14;
Phase.SOLDIER1 = 15;
Phase.SOLDIER2 = 16;
Phase.ROAD_BUILDING1 = 17;
Phase.ROAD_BUILDING2 = 18;
Phase.YEAR_OF_PLENTY1 = 19;
Phase.YEAR_OF_PLENTY2 = 20;
Phase.MONOPOLY = 21;
Phase.DOMESTIC_TRADE3 = 22;
Phase.BARBARIAN_SAVE1 = 23;
Phase.BARBARIAN_SAVE2 = 24;
Phase.BARBARIAN_DEFEAT1 = 25;
Phase.BUILD_KNIGHT = 27;
Phase.ACTIVATE_KNIGHT = 28;
Phase.PROMOTE_KNIGHT = 29;
Phase.MOVE_KNIGHT1 = 30;
Phase.MOVE_KNIGHT2 = 31;
Phase.MOVE_KNIGHT3 = 32;
Phase.MOVE_ROBBER1 = 33;
Phase.MOVE_ROBBER2 = 34;
Phase.MOVE_ROBBER3 = 35;
Phase.DEVELOPMENT1 = 36;
Phase.BUILD_METROPOLIS = 37;
Phase.GAIN_RESOURCE = 38;
Phase.BUILD_CITYWALL = 39;
Phase.DISCARD_CARD = 40;
Phase.USE_CARD = 41;
Phase.CRANE = 42;
Phase.ENGINEER = 43;
Phase.INVENTOR1 = 44;
Phase.INVENTOR2 = 45;
Phase.MEDICINE = 46;
Phase.SMITH1 = 47;
Phase.SMITH2 = 48;
Phase.BISHOP = 49;
Phase.DESERTER1 = 50;
Phase.DESERTER2 = 51;
Phase.DESERTER3 = 52;
Phase.DIPLOMAT1 = 53;
Phase.DIPLOMAT2 = 54;
Phase.INTRIGUE = 55;
Phase.SABOTEUR = 56;
Phase.SPY1 = 57;
Phase.SPY2 = 58;
Phase.WEDDING = 59;
Phase.ALCHEMIST = 60;
Phase.COMMERCIAL_HARBOR1 = 61;
Phase.COMMERCIAL_HARBOR2 = 62;
Phase.MASTER_MERCHANT1 = 63;
Phase.MASTER_MERCHANT2 = 64;
Phase.MASTER_MERCHANT3 = 65;
Phase.MERCHANT_FLEET = 66;
Phase.RESOURCE_MONOPOLY = 67;
Phase.TRADE_MONOPOLY = 68;
Phase.MERCHANT = 69;
Phase.CHOICE_PILLAGED_METROPOLIS = 70;
Phase.DISCARD_CARD_OTHER = 71;

Land = function () { }
Land.DESERT = -1;

Resource = function () { }
Resource.BRICK = 0;
Resource.WOOL = 1;
Resource.ORE = 2;
Resource.GRAIN = 3;
Resource.LUMBER = 4;
Resource.CLOTH = 5;   // 布
Resource.COIN = 6;    // コイン
Resource.PAPER = 7;   // 紙

Development = function () {}
Development.TRADE = 0;
Development.POLITICS = 1;
Development.SCIENCE = 2;

SettlementRank = function () { }
SettlementRank.NONE = 0x0000;
SettlementRank.SETTLEMENT = 0x0100;
SettlementRank.CITY = 0x0200;
SettlementRank.METROPOLIS = 0x0300;

KnightRank = function () {} 
KnightRank.NONE = 0x000000;
KnightRank.BASIC = 0x010000;
KnightRank.STRONG = 0x020000;
KnightRank.MIGHTY = 0x030000;
KnightStatus = function () {} 
KnightStatus.ACTIVATE = 0x000100;
KnightStatus.ACTIVE = 0x001100;
KnightStatus.DEACTIVATE = 0xFF00FF;
KnightStatus.PROMOTED = 0x002000;
KnightStatus.OFF_PROMOTED = 0xFFDFFF;

Card = function () { }
// Science Card
Card.BACK = 0;
Card.ALCHEMIST = 1;
Card.CRANE = 2;
Card.ENGINEER = 3;
Card.INVENTOR = 4;
Card.IRRIGATION = 5;
Card.MEDICINE = 6;
Card.MINING = 7;
Card.PRINTER = 8;
Card.ROAD_BUILDING = 9;
Card.SMITH = 10;
// Politics Card
Card.BISHOP = 11;
Card.CONSTITUTION = 12;
Card.DESERTER = 13;
Card.DIPLOMAT = 14;
Card.INTRIGUE = 15;
Card.SABOTEUR = 16;
Card.SPY = 17;
Card.WARLORD = 18;
Card.WEDDING = 19;
// Trade Card
Card.COMMERCIAL_HARBOR = 20;
Card.MASTER_MERCHANT = 21;
Card.MERCHANT = 22;
Card.MERCHANT_FLEET = 23;
Card.RESOURCE_MONOPOLY = 24;
Card.TRADE_MONOPOLY = 25;

// Back
Card.BACK_TRADE = 26;
Card.BACK_POLITICS = 27;
Card.BACK_SCIENCE = 28;



Harbor = function () { }
Harbor.GENERIC = 0;
Harbor.BRICK = 1;
Harbor.WOOL = 2;
Harbor.ORE = 3;
Harbor.GRAIN = 4;
Harbor.LUMBER = 5;

FONT_COLOR = [
      'red'
    , 'dodgerblue'
    , 'yellow'
    , 'lime'
];

COLOR_NAME = [
      '��'
    , '��'
    , '��'
    , '��'
];

RESOURCE_NAME = [
      '�y'
    , '�r'
    , '�S'
    , '��'
    , '��'
];

DEVELOPMENT_NAME = [
  '経済'
  , '政治'
  , '科学'
]; 

SETTLEMENT_LINK = [
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

ROAD_LINK = [
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

LAND_LINK = [
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