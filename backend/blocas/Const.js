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

Const.State = function () { }
Const.State.READY = 0;
Const.State.PLAYING = 1;

Const.Phase = function () { }
Const.Phase.NONE = -1;
Const.Phase.SETUP = 0;
Const.Phase.MAIN = 1;

Const.Pattern = function () { }
Const.Pattern.NONE = -1;
Const.Pattern.VERTEX = 0;
Const.Pattern.EDGE = 1;
Const.Pattern.BLOCK = 2;

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

Const.BLOCK_PATTERN= [
  [
    // .
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX],
    [Const.Pattern.EDGE,   Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX],
  ],
  [
    // ..
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    // ...
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    //   .
    //  ..
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    // ..
    // ..
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    // ....
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK,Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    // .
    // ...
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    //  ..
    // ..
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
  ],
  [
    //   .
    //  ...
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    // .....
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK,Const.Pattern.BLOCK,Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],

  ],
  [
    //  . .
    //  ...
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
  ],
  [
    // ....
    //  .
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],

  ],
  [
    //  ....
    //  .
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE, Const.Pattern.NONE],

  ],
  [
    //    ..
    //   ..
    //   .
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],
  ],
  [
    // ...
    // ..
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],

  ],
  [
    //    .
    //   ...
    //    .
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
  ],
  [
    //   .
    //  ...
    //  .
    [Const.Pattern.NONE, Const.Pattern.VERTEX,  Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],

  ],
  [
    //     .
    //   ...
    //   .
    [Const.Pattern.NONE, Const.Pattern.NONE,  Const.Pattern.VERTEX, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],
  ],
  [
    //     ..
    //   ...
    [Const.Pattern.NONE, Const.Pattern.NONE,  Const.Pattern.VERTEX, Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX, Const.Pattern.NONE],
  ],
  [
    //  .
    //  ...
    //  .
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],

  ],
  [
    // ...
    // .
    // .
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.BLOCK, Const.Pattern.BLOCK, Const.Pattern.EDGE],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.EDGE, Const.Pattern.VERTEX],
    [Const.Pattern.EDGE, Const.Pattern.BLOCK,  Const.Pattern.EDGE, Const.Pattern.NONE, Const.Pattern.NONE],
    [Const.Pattern.VERTEX, Const.Pattern.EDGE,  Const.Pattern.VERTEX, Const.Pattern.NONE, Const.Pattern.NONE],
  ],
];

module.exports = Const;