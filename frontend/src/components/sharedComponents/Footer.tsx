import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container mx-auto mb-6 mt-20">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col items-start justify-center gap-y-4">
          <h1 className="uppercase text-5xl text-blue-500 flex items-center justify-center">
            morent
          </h1>
          <p className="font-semibold">
            Our vision is to provide convenience <br></br> and help increase
            your sales business.
          </p>
        </div>
        <div className="flex flex-row gap-x-14 mt-12 md:mt-0 w-full md:w-auto justify-between flex-wrap md:gap-y-0 gap-y-8">
          <div className="flex flex-col gap-y-6">
            <p className="font-bold text-xl">About</p>
            <ul className="flex flex-col gap-y-5">
              <li className="text-gray-500">
                <Link to={"/howItWorks"}>How it works</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/featured"}>Featured</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/partnership"}>Partnership</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/relations"}>Bussiness Relation</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-6">
            <p className="font-bold text-xl">Community</p>
            <ul className="flex flex-col gap-y-5">
              <li className="text-gray-500">
                <Link to={"/events"}>Events</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/blog"}>Blog</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/podcast"}>Podcast</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/refer"}>Invite a friend</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-6">
            <p className="font-bold text-xl">Socials</p>
            <ul className="flex flex-col gap-y-5">
              <li className="text-gray-500">
                <Link to={"/discord"}>Discord</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/instagram"}>Instagram</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/twitter"}>Twitter</Link>
              </li>
              <li className="text-gray-500">
                <Link to={"/facebook"}>Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-500 mt-9"></div>
      <div className="flex items-center justify-between mt-9 flex-col-reverse md:flex-row w-full">
        <div className="flex w-full items-center justify-start  md:mt-0 mt-8">
          <p className="font-extrabold">@2022{" "}Morent.{" "}All rights reserved</p>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-14 w-full md:w-auto">
          <Link to={"privacyAndPolicy"} className="font-bold text-wrap sm:text-nowrap">
            Privacy & Policy
          </Link>
          <Link to={"termsAndCondition"} className="font-bold text-wrap sm:text-nowrap">
            Terms & Condition
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
