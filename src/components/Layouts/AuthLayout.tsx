import { FC, ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CheckRegisterAndLogin from "../middlewares/ChechRegisterAndLogin";
import { FaSpinner } from "react-icons/fa";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

const BaseAuth: FC<{ tile: string; desc: string; children: ReactNode }> = ({
  tile,
  desc,
  children,
}) => {
  const loading = CheckRegisterAndLogin();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="spinner" size={50} color={"#123abc"} />
      </div>
    );
  }
  const token = Cookie.get("token");
  if (token) {
    return <Navigate to="/" />; // هدایت به صفحه اصلی در صورت داشتن توکن معتبر
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>BugBoard - {tile}</title>
          <meta name="description" content={desc} />
        </Helmet>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            {children}
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};

export default BaseAuth;
