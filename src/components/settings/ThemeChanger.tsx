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
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 p-2 overflow-y-scroll w-full h-[79dvh] bg-base-100">
      {themes.map((item) => (
        <input
          data-theme={item}
          key={item}
          type="radio"
          name="theme-buttons"
          className="btn bg-primary h-28 md:h-48 text-primary-content"
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
