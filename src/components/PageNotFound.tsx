import broken from "../assets/broken.jpg";
const PageNotFound = () => {
  return (
    <div className="h-screen overflow-hidden flex items-center w-screen justify-center  flex-col gap-5 p-2">
      <h1 className="text-3xl">Oops! Page not found</h1>
      <span className=" h-72 md:h-80 overflow-hidden w-full md:w-80">
        <img src={broken} alt="404 Icon" className="object-fill" />
      </span>
      <h1 className="text-3xl">404 ! Error</h1>

      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a href="/" className="btn btn-primary ">
        Go to Home
      </a>
    </div>
  );
};

export default PageNotFound;
