const peoples = [
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
];
export const peoplesArrayConverted = peoples.map((codePoint) =>
  String.fromCodePoint(codePoint)
);
