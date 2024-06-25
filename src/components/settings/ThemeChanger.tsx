const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];
const ThemeChanger = () => {
  return (
    <div className="join join-vertical overflow-y-scroll w-full h-[79dvh]">
      {themes.map((item) => (
        <input
          key={item}
          type="radio"
          name="theme-buttons"
          className="btn theme-controller join-item"
          aria-label={item}
          value={item}
          onChangeCapture={(e) => {
            localStorage.setItem("theme", e.currentTarget.value);
            window.location.reload();
          }}
        />
      ))}
    </div>
  );
};

export default ThemeChanger;
