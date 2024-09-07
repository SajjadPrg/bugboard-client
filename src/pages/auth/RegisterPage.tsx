import { FC, useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BaseAuth from "../../components/Layouts/AuthLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Cookie from "js-cookie";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<Inputs>();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (res.status == 201) {
        const result = await res.json();
        Cookie.set("token", result.token, { expires: 30 });
        toast.success("ثبت‌نام با موفقیت امجام شد");
        setTimeout(() => navigate("/"), 1500);
      } else if (res.status == 500) {
        toast.error("خطای ناشناخته سرور");
      } else {
        toast.error("این نام کاربری و یا ایمیل قبلا ثبت نام کرده‌است");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("خطای ناشنخته");
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: Record<string, any>) => {
    if (Object.keys(errors).length > 0) {
      for (const error of Object.values(errors)) {
        if (error?.message) {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <>
      <BaseAuth tile="Register" desc="ثبت نام در وبسایت BugBoard">
        <h1 className="text-3xl font-bold mb-6 text-center font-Lalezar text-gray-600">
          ساخت‌ حساب‌کاربری
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Username Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-3"
              {...register("username", {
                required: "لطفاً نام کاربری را وارد کنید",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "نام کاربری باید فقط شامل حروف و اعداد باشد",
                },
              })}
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-3"
              {...register("email", {
                required: "لطفاً ایمیل را وارد کنید",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "لطفاً یک ایمیل معتبر وارد کنید",
                },
              })}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-gray-200 rounded-full pl-10 pr-10 py-3"
              {...register("password", {
                required: "لطفاً رمز عبور را وارد کنید",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    "رمز عبور باید شامل حروف، اعداد و کاراکترهای خاص باشد و بین 6 تا 16 کاراکتر باشد",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="h-6 w-6 text-gray-400" />
              ) : (
                <FaEye className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-brandActive font-bold py-3 px-12 rounded-full font-Lalezar text-gray-50 flex items-center justify-center"
            disabled={isLoading} // غیرفعال کردن دکمه هنگام لودینگ
          >
            {isLoading ? (
              <FaSpinner className="animate-spin h-5 w-5 mr-3" /> // نمایش چرخ دنده لودینگ
            ) : (
              "ثبت‌نام"
            )}
          </button>
        </form>
        <div className="mt-4 text-center font-Vazirmatn">
          <p className="text-gray-600">
            آیا قبلا ثبت‌نام کرده‌اید؟
            <Link to="/auth/login" className="text-purple-500 hover:underline">
              <strong> ورود</strong>
            </Link>
          </p>
        </div>
      </BaseAuth>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "font-Vazirmatn",
          style: {
            direction: "rtl",
          },
        }}
      />
    </>
  );
};

export default Register;
