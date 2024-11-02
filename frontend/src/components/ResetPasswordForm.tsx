import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../lib/api.auth";
import { useNavigate } from "react-router-dom";

interface iProps {
  code: string;
}

const ResetPasswordForm = ({ code }: iProps) => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: resetUserPassword, isError } = useMutation({
    mutationFn: resetPassword,
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Password changed successfully! You'll be redirected in 5 seconds");
      setTimeout(() => {
        navigate('/' ,{replace: true})
      }, 5000);
    },
  });

  return (
    <div className="bg-slate-300 w-screen font-sans text-gray-900 min-h-svh">
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl ">
        <form
          className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8 bg-[#F6F7F9]"
          id="registerForm"
          onSubmit={(e) => {
            e.preventDefault();
            resetUserPassword({ password, verificationCode: code });
          }}
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              New Password
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="password"
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                resetUserPassword({ password, verificationCode: code })
              }
              autoFocus
            />
            <span className="my-2 block"></span>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
              type="submit"
              disabled={isError ? true : false}
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
