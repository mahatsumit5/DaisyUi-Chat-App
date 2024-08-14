const emojiArray = [
  // Smileys & Emotion
  0x1f600, // 😀 Grinning Face
  0x1f603, // 😃 Grinning Face With Big Eyes
  0x1f604, // 😄 Grinning Face With Smiling Eyes
  0x1f601, // 😁 Beaming Face With Smiling Eyes
  0x1f606, // 😆 Grinning Squinting Face
  0x1f605, // 😅 Grinning Face With Sweat
  0x1f923, // 🤣 Rolling on the Floor Laughing
  0x1f602, // 😂 Face With Tears of Joy
  0x1f642, // 🙂 Slightly Smiling Face
  0x1f643, // 🙃 Upside-Down Face
  0x1f609, // 😉 Winking Face
  0x1f60a, // 😊 Smiling Face With Smiling Eyes
  0x1f607, // 😇 Smiling Face With Halo
  0x1f60d, // 😍 Smiling Face With Heart-Eyes
  0x1f929, // 🤩 Star-Struck
  0x1f618, // 😘 Face Blowing a Kiss
  0x1f617, // 😗 Kissing Face
  0x1f61a, // 😚 Kissing Face With Closed Eyes
  0x1f619, // 😙 Kissing Face With Smiling Eyes
  0x1f970, // 🥰 Smiling Face with Hearts
  0x1f60b, // 😋 Face Savoring Food
  0x1f61b, // 😛 Face With Tongue
  0x1f61c, // 😜 Winking Face With Tongue
  0x1f92a, // 🤪 Zany Face
  0x1f61d, // 😝 Squinting Face With Tongue
  0x1f911, // 🤑 Money-Mouth Face
  0x1f917, // 🤗 Hugging Face
  0x1f92d, // 🤭 Face With Hand Over Mouth
  0x1f92b, // 🤫 Shushing Face
  0x1f914, // 🤔 Thinking Face
  0x1f910, // 🤐 Zipper-Mouth Face
  0x1f928, // 🤨 Face With Raised Eyebrow
  0x1f610, // 😐 Neutral Face
  0x1f611, // 😑 Expressionless Face
  0x1f636, // 😶 Face Without Mouth
  0x1f60f, // 😏 Smirking Face
  0x1f612, // 😒 Unamused Face
  0x1f644, // 🙄 Face With Rolling Eyes
  0x1f62c, // 😬 Grimacing Face
  0x1f925, // 🤥 Lying Face
  0x1f60c, // 😌 Relieved Face
  0x1f614, // 😔 Pensive Face
  0x1f62a, // 😪 Sleepy Face
  0x1f924, // 🤤 Drooling Face
  0x1f634, // 😴 Sleeping Face
  0x1f637, // 😷 Face With Medical Mask
  0x1f912, // 🤒 Face With Thermometer
  0x1f915, // 🤕 Face With Head-Bandage
  0x1f922, // 🤢 Nauseated Face
  0x1f92e, // 🤮 Face Vomiting
  0x1f927, // 🤧 Sneezing Face
  0x1f975, // 🥵 Hot Face
  0x1f976, // 🥶 Cold Face
  0x1f974, // 🥴 Woozy Face
  0x1f635, // 😵 Dizzy Face
  0x1f92f, // 🤯 Exploding Head
  0x1f920, // 🤠 Cowboy Hat Face
  0x1f973, // 🥳 Partying Face
  0x1f60e, // 😎 Smiling Face With Sunglasses
  0x1f913, // 🤓 Nerd Face
  0x1f9d0, // 🧐 Face With Monocle
  0x1f615, // 😕 Confused Face
  0x1f61f, // 😟 Worried Face
  0x1f641, // 🙁 Slightly Frowning Face
  0x2639, // ☹ Frowning Face
  0x1f62e, // 😮 Face With Open Mouth
  0x1f62f, // 😯 Hushed Face
  0x1f632, // 😲 Astonished Face
  0x1f633, // 😳 Flushed Face
  0x1f97a, // 🥺 Pleading Face
  0x1f626, // 😦 Frowning Face With Open Mouth
  0x1f627, // 😧 Anguished Face
  0x1f628, // 😨 Fearful Face
  0x1f630, // 😰 Anxious Face With Sweat
  0x1f625, // 😥 Sad but Relieved Face
  0x1f622, // 😢 Crying Face
  0x1f62d, // 😭 Loudly Crying Face
  0x1f631, // 😱 Face Screaming in Fear
  0x1f616, // 😖 Confounded Face
  0x1f623, // 😣 Persevering Face
  0x1f61e, // 😞 Disappointed Face
  0x1f613, // 😓 Downcast Face With Sweat
  0x1f629, // 😩 Weary Face
  0x1f62b, // 😫 Tired Face
  0x1f971, // 🥱 Yawning Face
  0x1f624, // 😤 Face With Steam From Nose
  0x1f621, // 😡 Pouting Face
  0x1f620, // 😠 Angry Face
  0x1f92c, // 🤬 Face With Symbols on Mouth
  0x1f608, // 😈 Smiling Face With Horns
  0x1f47f, // 👿 Angry Face With Horns
];

// Convert Unicode code points to emojis
export const emojiArrayConverted = emojiArray.map((codePoint) =>
  String.fromCodePoint(codePoint)
);
