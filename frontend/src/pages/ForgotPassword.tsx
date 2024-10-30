import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api.auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { mutate: sendPasswordReset, error } = useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess: () => {
      toast.success("Email sent! Check your inbox for further instructions.");
    },
    onError: () => {
      toast.error(error?.message || "Wrong email address!");
    },
  });

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
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl ">
        <form
          className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8 bg-[#F6F7F9]"
          id="registerForm"
          //   onSubmit={() => sendPasswordReset(email)}
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
          <div className="flex items-center justify-center">
            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
              type="button"
              onClick={() => sendPasswordReset(email)}
            >
              Reset password
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p className="mt-4 text-xl">
              Go back to{" "}
              <Link
                to={"/login"}
                className="font-bold text-blue-600"
              >{` Sign in `}</Link>{" "}
              or
              <Link
                to={"/register"}
                className="font-bold text-blue-600"
              >{` Sign up`}</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
