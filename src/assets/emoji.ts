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
  0x1f63a, // 😺 Smiling Cat Face With Open Mouth
  0x1f638, // 😸 Grinning Cat Face With Smiling Eyes
  0x1f639, // 😹 Cat Face With Tears of Joy
  0x1f63b, // 😻 Smiling Cat Face With Heart-Eyes
  0x1f63c, // 😼 Cat Face With Wry Smile
  0x1f63d, // 😽 Kissing Cat Face With Closed Eyes
  0x1f640, // 🙀 Weary Cat Face
  0x1f63f, // 😿 Crying Cat Face
  0x1f63e, // 😾 Pouting Cat Face
  0x1f648, // 🙈 See-No-Evil Monkey
  0x1f649, // 🙉 Hear-No-Evil Monkey
  0x1f64a, // 🙊 Speak-No-Evil Monkey
  0x1f48b, // 💋 Kiss Mark
  0x1f48c, // 💌 Love Letter
  0x1f498, // 💘 Heart With Arrow
  0x1f49d, // 💝 Heart With Ribbon
  0x1f496, // 💖 Sparkling Heart
  0x1f497, // 💗 Growing Heart
  0x1f493, // 💓 Beating Heart
  0x1f49e, // 💞 Revolving Hearts
  0x1f495, // 💕 Two Hearts
  0x1f49f, // 💟 Heart Decoration
  0x2763, // ❣ Heavy Heart Exclamation
  0x1f494, // 💔 Broken Heart
  0x2764, // ❤️ Red Heart
  0x1f9e1, // 🧡 Orange Heart
  0x1f49b, // 💛 Yellow Heart
  0x1f49a, // 💚 Green Heart
  0x1f499, // 💙 Blue Heart
  0x1f49c, // 💜 Purple Heart
  0x1f90e, // 🤎 Brown Heart
  0x1f5a4, // 🖤 Black Heart
  0x1f90d, // 🤍 White Heart
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
  0x1f476, // 👶 Baby
  0x1f9d2, // 🧒 Child
  0x1f466, // 👦 Boy
  0x1f467, // 👧 Girl
  0x1f9d1, // 🧑 Person
  0x1f471, // 👱 Person: Blond Hair
  0x1f468, // 👨 Man
  0x1f9d4, // 🧔 Man: Beard
  0x1f9d4, // 🧔‍♂️ Man: Beard (Male Sign)
  0x1f469, // 👩 Woman
  0x1f9d3, // 🧓 Older Person
  0x1f474, // 👴 Old Man
  0x1f475, // 👵 Old Woman
  0x1f9d1, // 🧑‍🦰 Person: Red Hair
  0x1f471, // 👱‍♀️ Woman: Blond Hair
  0x1f469, // 👩‍🦳 Woman: White Hair
  0x1f9d1, // 🧑‍🦲 Person: Bald
  0x1f9d1, // 🧑‍⚕️ Health Worker
  0x1f468, // 👨‍⚕️ Man: Health Worker
  0x1f469, // 👩‍⚕️ Woman: Health Worker
  0x1f9d1, // 🧑‍🎓 Student
  0x1f468, // 👨‍🎓 Man: Student
  0x1f469, // 👩‍🎓 Woman: Student
  0x1f9d1, // 🧑‍🏫 Teacher
  0x1f468, // 👨‍🏫 Man: Teacher
  0x1f469, // 👩‍🏫 Woman: Teacher
  0x1f9d1, // 🧑‍⚖️ Judge
  0x1f468, // 👨‍⚖️ Man: Judge
  0x1f469, // 👩‍⚖️ Woman: Judge
  0x1f9d1, // 🧑‍🌾 Farmer
  0x1f468, // 👨‍🌾 Man: Farmer
  0x1f469, // 👩‍🌾 Woman: Farmer
  0x1f9d1, // 🧑‍🍳 Cook
  0x1f468, // 👨‍🍳 Man: Cook
  0x1f469, // 👩‍🍳 Woman: Cook
  0x1f9d1, // 🧑‍🔧 Mechanic
  0x1f468, // 👨‍🔧 Man: Mechanic
  0x1f469, // 👩‍🔧 Woman: Mechanic
  0x1f9d1, // 🧑‍🏭 Factory Worker
  0x1f468, // 👨‍🏭 Man: Factory Worker
  0x1f469, // 👩‍🏭 Woman: Factory Worker
  0x1f9d1, // 🧑‍💼 Office Worker
  0x1f468, // 👨‍💼 Man: Office Worker
  0x1f469, // 👩‍💼 Woman: Office Worker
  0x1f9d1, // 🧑‍🔬 Scientist
  0x1f468, // 👨‍🔬 Man: Scientist
  0x1f469, // 👩‍🔬 Woman: Scientist
  0x1f9d1, // 🧑‍💻 Technologist
  0x1f468, // 👨‍💻 Man: Technologist
  0x1f469, // 👩‍💻 Woman: Technologist
  0x1f9d1, // 🧑‍🎤 Singer
  0x1f468, // 👨‍🎤 Man: Singer
  0x1f469, // 👩‍🎤 Woman: Singer
  0x1f9d1, // 🧑‍🎨 Artist
  0x1f468, // 👨‍🎨 Man: Artist
  0x1f469, // 👩‍🎨 Woman: Artist
  0x1f9d1, // 🧑‍✈️ Pilot
  0x1f468, // 👨‍✈️ Man: Pilot
  0x1f469, // 👩‍✈️ Woman: Pilot
  0x1f9d1, // 🧑‍🚀 Astronaut
  0x1f468, // 👨‍🚀 Man: Astronaut
  0x1f469, // 👩‍🚀 Woman: Astronaut
  0x1f9d1, // 🧑‍🚒 Firefighter
  0x1f468, // 👨‍🚒 Man: Firefighter
  0x1f469, // 👩‍🚒 Woman: Firefighter
  0x1f46e, // 👮 Police Officer
  0x1f575, // 🕵 Detective
  0x1f482, // 💂 Guard
  0x1f977, // 🥷 Ninja
  0x1f477, // 👷 Construction Worker
  0x1fac5, // 🫅 Person With Crown
  0x1f934, // 🤴 Prince
  0x1f478, // 👸 Princess
  0x1f473, // 👳 Person Wearing Turban
  0x1f472, // 👲 Person With Skullcap
  0x1f9b8, // 🦸 Superhero
  0x1f9b9, // 🦹 Supervillain
  0x1f9d5, // 🧕 Woman With Headscarf
  0x1f935, // 🤵 Person in Tuxedo
  0x1f470, // 👰 Person With Veil
  0x1f930, // 🤰 Pregnant Woman
  0x1fac3, // 🫃 Pregnant Man
  0x1fac4, // 🫄 Pregnant Person
  0x1f931, // 🤱 Breast-Feeding
  0x1f47c, // 👼 Baby Angel
  0x1f385, // 🎅 Santa Claus
  0x1f936, // 🤶 Mrs. Claus
  0x1f9b9, // 🦹‍♂️ Man Supervillain
  0x1f9dd, // 🧝 Elf
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
export const emojiArrayConverted = emojiArray.map((codePoint) =>
  String.fromCodePoint(codePoint)
);

console.log(emojiArrayConverted);
