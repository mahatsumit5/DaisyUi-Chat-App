const cats = [
  0x1f63a, //  😺 Smiling Cat Face With Open Mouth
  0x1f638, // 😸 Grinning Cat Face With Smiling Eyes
  0x1f639, // 😹 Cat Face With Tears of Joy
  0x1f63b, // 😻 Smiling Cat Face With Heart-Eyes
  0x1f63c, // 😼 Cat Face With Wry Smile
  0x1f63d, // 😽 Kissing Cat Face With Closed Eyes
  0x1f640, // 🙀 Weary Cat Face
  0x1f63f, // 😿 Crying Cat Face
  0x1f63e, // 😾 Pouting Cat Face
];

export const catsArrayConverted = cats.map((codePoint) =>
  String.fromCodePoint(codePoint)
);
