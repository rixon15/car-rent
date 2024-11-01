import { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();

  const linkIsValid = code && exp && now < exp;

  return (
    <div className="bg-slate-300 w-screen font-sans text-gray-900 min-h-svh">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" ">
        <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
            <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
              Reset your password
            </h1>
          </div>
        </div>
      </div>
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <div className=" ">
          <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
              <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
                The link is either invalid or expired
              </h1>
              <Link
                to={"/password/reset"}
                replace
                className="text-xl to-blue-700"
              >
                Request a new reset link
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
