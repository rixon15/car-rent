import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../lib/api.auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: signIn } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  return (
    <div className="bg-slate-300 w-screen font-sans text-gray-900 min-h-svh">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" ">
        <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
            <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
              Sign in
            </h1>
            <div className="text-lg sm:text-xl">
              <div className="">
                <p className="mb-4">
                  Let's do this! Start your journey by signing in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl ">
        <form
          className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8 bg-[#F6F7F9]"
          id="signinForm"
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="email"
              type="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="my-2 block"></span>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="password"
              type="password"
              placeholder="******************"
              required
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && signIn({ email, password })
              }
            />
          </div>
          <div className="flex items-center justify-end text-sm font-bold text-blue-500 mb-6">
            <Link to={"/passwordReset"}>Forgot password?</Link>
          </div>
          <div className="flex items-center">
            <div className="flex-1"></div>

            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
              type="button"
              onClick={() => signIn({ email, password })}
            >
              Sign In
            </button>
          </div>
          <div className="flex justify-center items-center font-bold">
            <p>
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-blue-500"
              >{`  Sign up`}</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
