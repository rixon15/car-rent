import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api.auth";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const { code } = useParams();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code as string),
  });

  return (
    <div className="bg-slate-300 w-screen font-sans text-gray-900 min-h-svh flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isPending
        ? toast.loading("loading")
        : isSuccess
        ? toast.success("Email verified successfully")
        : isError
        ? toast.error("Invalid link")
        : null}
        <Link to={'/'} replace>Back to Home</Link>
    </div>
  );
};

export default VerifyEmail;
