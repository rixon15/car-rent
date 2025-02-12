import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { verifyEmail } from "../../lib/api.auth";

const VerifyEmail = () => {
  const { code } = useParams();

  const {isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code as string),
  });

  return (
    <div className="bg-slate-300 w-screen font-sans text-gray-900 min-h-svh flex items-center justify-center text-opacity-0">
      <Toaster position="top-center" reverseOrder={false} />
      {isSuccess
        ? toast.success("Email verified successfully")
        : isError
        ? toast.error("Invalid link")
        :''}
      <Link to={"/"} replace className="font-bold text-xl text-blue-600">
        Back to Home
      </Link>
    </div>
  );
};

export default VerifyEmail;
