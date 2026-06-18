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
Phase.SETUP = 0;

Pattern = function () { }
Pattern.NONE = -1;
Pattern.VERTEX = 0;
Pattern.EDGE = 1;
Pattern.BLOCK = 2;

BLOCK_PATTERN= [
  [
    // .
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX],
    [Pattern.EDGE,   Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX],
  ],
  [
    // ..
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    // ...
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    //   .
    //  ..
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    // ..
    // ..
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    // ....
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK,Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    // .
    // ...
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    //  ..
    // ..
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
  ],
  [
    //   .
    //  ...
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    // .....
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK,Pattern.BLOCK,Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],

  ],
  [
    //  . .
    //  ...
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
  ],
  [
    // ....
    //  .
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE, Pattern.NONE],

  ],
  [
    //  ....
    //  .
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE, Pattern.NONE],

  ],
  [
    //    ..
    //   ..
    //   .
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],
  ],
  [
    // ...
    // ..
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],

  ],
  [
    //    .
    //   ...
    //    .
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
  ],
  [
    //   .
    //  ...
    //  .
    [Pattern.NONE, Pattern.VERTEX,  Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],

  ],
  [
    //     .
    //   ...
    //   .
    [Pattern.NONE, Pattern.NONE,  Pattern.VERTEX, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],
  ],
  [
    //     ..
    //   ...
    [Pattern.NONE, Pattern.NONE,  Pattern.VERTEX, Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX, Pattern.NONE],
  ],
  [
    //  .
    //  ...
    //  .
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],

  ],
  [
    // ...
    // .
    // .
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.BLOCK, Pattern.BLOCK, Pattern.EDGE],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.EDGE, Pattern.VERTEX],
    [Pattern.EDGE, Pattern.BLOCK,  Pattern.EDGE, Pattern.NONE, Pattern.NONE],
    [Pattern.VERTEX, Pattern.EDGE,  Pattern.VERTEX, Pattern.NONE, Pattern.NONE],
  ],
];