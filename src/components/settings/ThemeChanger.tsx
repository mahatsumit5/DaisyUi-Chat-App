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
    <div className="flex flex-wrap gap-2 p-2  w-full ">
      {themes.map((item) => (
        <input
          data-theme={item}
          key={item}
          type="radio"
          name="theme-buttons"
          className="btn bg-primary w-24  md:w-32 h-24 md:h-32 text-primary-content"
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
