import { Link } from "react-router-dom";

const NavbarNoAuth = () => {
  return (
    <nav className="mx-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-x-16">
          <h1 className="uppercase text-5xl text-blue-500 flex items-center justify-center">
            morent
          </h1>
          <div className="border-blue-600 focus-within:border-none focus-within:ring focus-within:ring-offset-2 my-10  h-10 items-center justify-start border-2 leading-4 ring-blue-600 sm:w-96 rounded-full hidden md:flex">
            <input
              placeholder="Search"
              value=""
              className="peer ml-2 flex-grow bg-transparent text-gray-500 outline-none"
            />
            <button
              type="button"
              className="peer-focus:mr-2 z-20 cursor-pointer text-blue-600 outline-none duration-150 hover:scale-125"
            >
              <svg className="h-6 w-6 stroke-2" viewBox="0 0 32 32" fill="none">
                <circle
                  cx="15"
                  cy="14"
                  r="8"
                  stroke="currentColor"
                  fill="transparent"
                ></circle>
                <line
                  x1="21.1514"
                  y1="19.7929"
                  x2="26.707"
                  y2="25.3484"
                  stroke="currentColor"
                  fill="transparent"
                ></line>
              </svg>
            </button>
          </div>
        </div>
        <Link
          to={"/login"}
          className="text-2xl flex flex-row items-center justify-center"
        >
          Sign in
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="border-blue-600 focus-within:border-none focus-within:ring focus-within:ring-offset-2 my-10  h-10 items-center justify-start border-2 leading-4 ring-blue-600 rounded-full md:hidden flex w-full">
          <input
            placeholder="Search"
            value=""
            className="peer ml-2 flex w-full bg-transparent text-gray-500 outline-none"
          />
          <button
            type="button"
            className="peer-focus:mr-2 z-20 cursor-pointer text-blue-600 outline-none duration-150 hover:scale-125"
          >
            <svg className="h-6 w-6 stroke-2" viewBox="0 0 32 32" fill="none">
              <circle
                cx="15"
                cy="14"
                r="8"
                stroke="currentColor"
                fill="transparent"
              ></circle>
              <line
                x1="21.1514"
                y1="19.7929"
                x2="26.707"
                y2="25.3484"
                stroke="currentColor"
                fill="transparent"
              ></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNoAuth;
