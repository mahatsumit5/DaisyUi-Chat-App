const other = [
  0x1f480, // 💀 Skull
  0x2620, // ☠ Skull and Crossbones
  0x1f4a9, // 💩 Pile of Poo
  0x1f921, // 🤡 Clown Face
  0x1f479, // 👹 Ogre
  0x1f47a, // 👺 Goblin
  0x1f47b, // 👻 Ghost
  0x1f47d, // 👽 Alien
  0x1f47e, // 👾 Alien Monster
  0x1f916, // 🤖 Robot Face

  0x1f648, // 🙈 See-No-Evil Monkey
  0x1f649, // 🙉 Hear-No-Evil Monkey
  0x1f64a, // 🙊 Speak-No-Evil Monkey
  0x1f48b, // 💋 Kiss Mark
  0x1f4af, // 💯 Hundred Points
  0x1f4a2, // 💢 Anger Symbol
  0x1f4a5, // 💥 Collision
  0x1f4ab, // 💫 Dizzy
  0x1f4a6, // 💦 Sweat Droplets
  0x1f4a8, // 💨 Dashing Away
  0x1f573, // 🕳 Hole
  0x1f4a3, // 💣 Bomb
  0x1f4ac, // 💬 Speech Balloon
  0x1f441, // 👁 Eye
  0x1f5e8, // 🗨 Left Speech Bubble
  0x1f5ef, // 🗯 Right Anger Bubble
  0x1f4ad, // 💭 Thought Balloon
  0x1f4a4, // 💤 Zzz

  0x1f933, // 🤳 Selfie
  0x1f4aa, // 💪 Flexed Biceps
  0x1f9be, // 🦾 Mechanical Arm
  0x1f9b5, // 🦵 Leg
  0x1f9b6, // 🦶 Foot
  0x1f9bf, // 🦿 Mechanical Leg
  0x1f9b7, // 🦷 Tooth
  0x1f9b4, // 🦴 Bone
  0x1f440, // 👀 Eyes
  0x1f441, // 👁 Eye
  0x1f445, // 👅 Tongue
  0x1f444, // 👄 Mouth
  0x1fae0, // 🫠 Melting Face

  0x1f9df, // 🧟 Zombie
  0x1f9db, // 🧛 Vampire
  0x1f9dc, // 🧜 Merperson
  0x1f9da, // 🧚 Fairy
  0x1f9e3, // 🧣 Scarf
  0x1f9e4, // 🧤 Gloves
  0x1f9e5, // 🧥 Coat
  0x1f9e6, // 🧦 Socks
  0x1f457, // 👗 Dress
  0x1f458, // 👘 Kimono
  0x1f459, // 👙 Bikini
  0x1f45a, // 👚 Woman’s Clothes
  0x1f45b, // 👛 Purse
  0x1f45c, // 👜 Handbag
  0x1f45d, // 👝 Clutch Bag
  0x1f392, // 🎒 Backpack
  0x1fa74, // 🩴 Thong Sandal
  0x1f45e, // 👞 Man’s Shoe
  0x1f45f, // 👟 Running Shoe
  0x1f460, // 👠 High-Heeled Shoe
  0x1f461, // 👡 Woman’s Sandal
  0x1f462, // 👢 Woman’s Boot
  0x1f451, // 👑 Crown
  0x1f452, // 👒 Woman’s Hat
  0x1f3a9, // 🎩 Top Hat
  0x1f393, // 🎓 Graduation Cap
  0x1f9e2, // 🧢 Billed Cap
  0x26d1, // ⛑ Rescue Worker’s Helmet
  0x1f4ff, // 📿 Prayer Beads
  0x1fa9e, // 🪞 Mirror
  0x1fa9f, // 🪟 Window
  0x1fa78, // 🩸 Drop of Blood
  0x1fa7a, // 🩺 Stethoscope
  0x1f48d, // 💍 Ring
  0x1f484, // 💄 Lipstick
  0x1f48e, // 💎 Gem Stone
  0x1f507, // 🔇 Muted Speaker
  0x1f508, // 🔈 Speaker Low Volume
  0x1f509, // 🔉 Speaker Medium Volume
  0x1f50a, // 🔊 Speaker High Volume
  0x1f4e2, // 📢 Loudspeaker
  0x1f4e3, // 📣 Megaphone
  0x1f4ef, // 📯 Postal Horn
  0x1f514, // 🔔 Bell
  0x1f515, // 🔕 Bell With Slash
  0x1f3bc, // 🎼 Musical Score
  0x1f3b5, // 🎵 Musical Note
  0x1f3b6, // 🎶 Musical Notes
  0x1f399, // 🎙 Studio Microphone
  0x1f39a, // 🎚 Level Slider
  0x1f39b, // 🎛 Control Knobs
  0x1f3a4, // 🎤 Microphone
  0x1f3a7, // 🎧 Headphone
  0x1f4fb, // 📻 Radio
  0x1f3b7, // 🎷 Saxophone
  0x1f3b8, // 🎸 Guitar
  0x1f3b9, // 🎹 Musical Keyboard
  0x1f3ba, // 🎺 Trumpet
  0x1f3bb, // 🎻 Violin
  0x1fa95, // 🪕 Banjo
  0x1f941, // 🥁 Drum
  0x1fa98, // 🪘 Long Drum
  0x1fa87, // 🪇 Maracas
  0x1fa88, // 🪈 Flute
  0x1f4f1, // 📱 Mobile Phone
  0x1f4f2, // 📲 Mobile Phone With Arrow
  0x1f4bb, // 💻 Laptop
  0x1f5a5, // 🖥 Desktop Computer
  0x1f5a8, // 🖨 Printer
  0x2328, // ⌨ Keyboard
  0x1f5b1, // 🖱 Computer Mouse
  0x1f5b2, // 🖲 Trackball
  0x1f4bd, // 💽 Computer Disk
  0x1f4be, // 💾 Floppy Disk
  0x1f4bf, // 💿 Optical Disk
  0x1f4c0, // 📀 DVD
  0x1f9ee, // 🧮 Abacus
  0x1f3a5, // 🎥 Movie Camera
  0x1f39e, // 🎞 Film Frames
  0x1f4fd, // 📽 Film Projector
  0x1f3ac, // 🎬 Clapper Board
  0x1f4fa, // 📺 Television
  0x1f4f7, // 📷 Camera
  0x1f4f8, // 📸 Camera With Flash
  0x1f4f9, // 📹 Video Camera
  0x1f4fc, // 📼 Videocassette
  0x1f50d, // 🔍 Magnifying Glass Tilted Left
  0x1f50e, // 🔎 Magnifying Glass Tilted Right
  0x1f56f, // 🕯 Candle
  0x1f4a1, // 💡 Light Bulb
  0x1f526, // 🔦 Flashlight
  0x1f3ee, // 🏮 Red Paper Lantern
  0x1fa94, // 🪔 Diya Lamp
  0x1f4d4, // 📔 Notebook With Decorative Cover
  0x1f4d5, // 📕 Closed Book
  0x1f4d6, // 📖 Open Book
  0x1f4d7, // 📗 Green Book
  0x1f4d8, // 📘 Blue Book
  0x1f4d9, // 📙 Orange Book
  0x1f4da, // 📚 Books
  0x1f4d3, // 📓 Notebook
  0x1f4d2, // 📒 Ledger
  0x1f4c3, // 📃 Page With Curl
  0x1f4dc, // 📜 Scroll
  0x1f4c4, // 📄 Page Facing Up
  0x1f4f0, // 📰 Newspaper
  0x1f5de, // 🗞 Rolled-Up Newspaper
  0x1f4d1, // 📑 Bookmark Tabs
  0x1f516, // 🔖 Bookmark
  0x1f3f7, // 🏷 Label
  0x1f4b0, // 💰 Money Bag
  0x1f4b4, // 💴 Yen Banknote
  0x1f4b5, // 💵 Dollar Banknote
  0x1f4b6, // 💶 Euro Banknote
  0x1f4b7, // 💷 Pound Banknote
  0x1f4b8, // 💸 Money With Wings
  0x1f4b3, // 💳 Credit Card
  0x1f9fe, // 🧾 Receipt
  0x1f4b9, // 💹 Chart Increasing With Yen
  0x1f4b2, // 💲 Heavy Dollar Sign
  0x2709, // ✉ Envelope
  0x1f4e7, // 📧 E-Mail
  0x1f4e8, // 📨 Incoming Envelope
  0x1f4e9, // 📩 Envelope With Arrow
  0x1f4e4, // 📤 Outbox Tray
  0x1f4e5, // 📥 Inbox Tray
  0x1f4e6, // 📦 Package
  0x1f4eb, // 📫 Closed Mailbox With Raised Flag
  0x1f4ea, // 📪 Closed Mailbox With Lowered Flag
  0x1f4ec, // 📬 Open Mailbox With Raised Flag
  0x1f4ed, // 📭 Open Mailbox With Lowered Flag
  0x1f4ee, // 📮 Postbox
  0x1f5f3, // 🗳 Ballot Box With Ballot
  0x270f, // ✏ Pencil
  0x2712, // ✒ Black Nib
  0x1f58b, // 🖋 Fountain Pen
  0x1f58a, // 🖊 Pen
  0x1f58c, // 🖌 Paintbrush
  0x1f58d, // 🖍 Crayon
  0x1f4dd, // 📝 Memo
  0x1f4bc, // 💼 Briefcase
  0x1f4c1, // 📁 File Folder
  0x1f4c2, // 📂 Open File Folder
  0x1f5c2, // 🗂 Card Index Dividers
  0x1f4c5, // 📅 Calendar
  0x1f4c6, // 📆 Tear-Off Calendar
  0x1f5d2, // 🗒 Spiral Notepad
  0x1f5d3, // 🗓 Spiral Calendar
  0x1f4c7, // 📇 Card Index
  0x1f4c8, // 📈 Chart Increasing
  0x1f4c9, // 📉 Chart Decreasing
  0x1f4ca, // 📊 Bar Chart
  0x1f4cb, // 📋 Clipboard
  0x1f4cc, // 📌 Pushpin
  0x1f4cd, // 📍 Round Pushpin
  0x1f4ce, // 📎 Paperclip
  0x1f587, // 🖇 Linked Paperclips
  0x1f4cf, // 📏 Straight Ruler
  0x1f4d0, // 📐 Triangular Ruler
  0x2702, // ✂ Scissors
  0x1f5c3, // 🗃 Card File Box
  0x1f5c4, // 🗄 File Cabinet
  0x1f5d1, // 🗑 Wastebasket
  0x1f512, // 🔒 Locked
  0x1f513, // 🔓 Unlocked
  0x1f50f, // 🔏 Locked With Pen
  0x1f510, // 🔐 Locked With Key
  0x1f511, // 🔑 Key
  0x1f5dd, // 🗝 Old Key
  0x1f528, // 🔨 Hammer
  0x1fa93, // 🪓 Axe
  0x26cf, // ⛏ Pick
  0x2692, // ⚒ Hammer and Pick
  0x1f6e0, // 🛠 Hammer and Wrench
  0x1f5e1, // 🗡 Dagger
  0x2694, // ⚔ Crossed Swords
  0x1f52b, // 🔫 Water Pistol
  0x1fa83, // 🪃 Boomerang
  0x1f3f9, // 🏹 Bow and Arrow
  0x1f6e1, // 🛡 Shield
  0x1fa9b, // 🪛 Screwdriver
  0x1f527, // 🔧 Wrench
  0x1fa9c, // 🪜 Ladder
  0x1f529, // 🔩 Nut and Bolt
  0x2699, // ⚙ Gear
  0x1f5dc, // 🗜 Clamp
  0x2696, // ⚖ Balance Scale
  0x1f9af, // 🦯 White Cane
  0x1f517, // 🔗 Link
  0x26d3, // ⛓ Chains
  0x1fa9d, // 🪝 Hook
  0x1f9f0, // 🧰 Toolbox
  0x1f9f2, // 🧲 Magnet
  0x1f6cf, // 🛏 Bed
  0x1f6cb, // 🛋 Couch and Lamp
  0x1fa91, // 🪑 Chair
  0x1f6bd, // 🚽 Toilet
  0x1faa0, // 🪠 Plunger
  0x1f6bf, // 🚿 Shower
  0x1f6c1, // 🛁 Bathtub
  0x1faa4, // 🪤 Mouse Trap
  0x1fa92, // 🪒 Razor
  0x1f9f4, // 🧴 Lotion Bottle
  0x1f9f7, // 🧷 Safety Pin
  0x1f9f9, // 🧹 Broom
  0x1f9fa, // 🧺 Basket
  0x1f9fb, // 🧻 Roll of Paper
  0x1f9fc, // 🧼 Soap
  0x1f9fd, // 🧽 Sponge
  0x1f9ef, // 🧯 Fire Extinguisher
  0x1f6d2, // 🛒 Shopping Cart
  0x1f6ac, // 🚬 Cigarette
  0x26b0, // ⚰ Coffin
  0x1faa6, // 🪦 Headstone
  0x1f5ff, // 🗿 Moai
  0x1faa7, // 🪧 Placard
  0x1f3e7, // 🏧 ATM Sign
  0x1f6ae, // 🚮 Litter in Bin Sign
  0x1f6b0, // 🚰 Potable Water
  0x267b, // ♻ Recycling Symbol
];
// Convert Unicode code points to emojis
export const otherArrayConverted = other.map((codePoint) =>
  String.fromCodePoint(codePoint)
);
