const hands = [
  0x1f44b, // 👋 Waving Hand
  0x1f91a, // 🤚 Raised Back of Hand
  0x1f590, // 🖐 Hand With Fingers Splayed
  0x270b, // ✋ Raised Hand
  0x1f596, // 🖖 Vulcan Salute
  0x1f44c, // 👌 OK Hand
  0x1f90f, // 🤏 Pinching Hand
  0x270c, // ✌ Victory Hand
  0x1f91e, // 🤞 Crossed Fingers
  0x1f91f, // 🤟 Love-You Gesture
  0x1f918, // 🤘 Sign of the Horns
  0x1f919, // 🤙 Call Me Hand
  0x1f448, // 👈 Backhand Index Pointing Left
  0x1f449, // 👉 Backhand Index Pointing Right
  0x1f446, // 👆 Backhand Index Pointing Up
  0x1f595, // 🖕 Middle Finger
  0x1f447, // 👇 Backhand Index Pointing Down
  0x261d, // ☝ Index Pointing Up
  0x1f44d, // 👍 Thumbs Up
  0x1f44e, // 👎 Thumbs Down
  0x270a, // ✊ Raised Fist
  0x1f44a, // 👊 Oncoming Fist
  0x1f91b, // 🤛 Left-Facing Fist
  0x1f91c, // 🤜 Right-Facing Fist
  0x1f44f, // 👏 Clapping Hands
  0x1f64c, // 🙌 Raising Hands
  0x1f450, // 👐 Open Hands
  0x1f932, // 🤲 Palms Up Together
  0x1f91d, // 🤝 Handshake
  0x1f64f, // 🙏 Folded Hands
  0x1f90c, // 🤌 Pinched Fingers
  0x1f485, // 💅 Nail Polish
];
export const handsArrayConverted = hands.map((codePoint) =>
  String.fromCodePoint(codePoint)
);
