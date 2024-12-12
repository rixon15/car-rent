import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { register } from "../../lib/api.auth";
import {useAuthStore} from "../../store/authStore.ts";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {signup} = useAuthStore();


  const { mutate: createAccount, error} = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error(error?.message || "An error occured");
    },
  });

  return (
    <div className="bg-slate-300 w-screen font-sans text-gray-900 min-h-svh">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" ">
        <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
            <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
              Sign up
            </h1>
            <div className="text-lg sm:text-xl">
              <div className="">
                <p className="mb-4">
                  Let's do this! Start your journey by filling in our simple
                  form below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl ">
        <form
          className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8 bg-[#F6F7F9]"
          id="registerForm"
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
            <label className="mb-2 block text-sm font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="phone"
              type="phone"
              placeholder="Phone"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
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
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="confirmPassword"
              type="password"
              placeholder="******************"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                createAccount({ email, phoneNumber, password, confirmPassword })
              }
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 flex text-sm">
              <input type="checkbox" name="accept" className="mr-2" required />
              <div className="text-gray-800">
                <p className="">
                  {`I accept the `}
                  <a
                    href="#"
                    className="cursor-pointer text-blue-500 underline"
                  >
                    terms of use
                  </a>
                  {` and `}
                  <a
                    href="#"
                    className="cursor-pointer text-blue-500 underline"
                  >
                    privacy policy
                  </a>
                </p>
              </div>
            </label>
          </div>
          <div className="flex items-center">
            <div className="flex-1"></div>

            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
              type="button"
              onClick={() =>
              {createAccount({ email, phoneNumber, password, confirmPassword }); console.log(typeof error?.message)}
              }
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
