import { Lock, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PulseLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { FormDataTypes } from "@/lib/types";
import * as zod from "zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { login, loginWithGoogle } from "@/lib/api/auth.api";
import { useAppContext } from "@/useAppContext";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const primaryUrl = searchParams.get("createLink");

  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: loginFn } = useFetch(login);
  const { fetchuser } = useAppContext();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard? ${primaryUrl ? `createLink=${primaryUrl}` : ""}`);
      fetchuser();
    }
  }, [data, error, fetchuser, navigate, primaryUrl]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({});
    try {
      const loginDataSchema = zod.object({
        email: zod.email({ message: "Invalid Email" }),
        password: zod
          .string()
          .min(1, "Password is required")
          .min(6, "Password must be min 6 characters"),
      });
      const result = loginDataSchema.safeParse(formData);

      if (!result.success) {
        console.log(result.error);

        const errorObj: Record<string, string> = {};

        result.error.issues.forEach((issue) => {
          const pathkey = issue.path[0];
          errorObj[pathkey] = issue.message;
        });

        setFormError(errorObj);

        return;
      }
      //login api call
      await loginFn(formData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1
        className={`text-2xl sm:text-3xl font-bold text-center mt-20 ${
          theme === "dark" ? "text-neutral-300" : "text-neutral-700"
        }`}
      >
        Login to Curl
      </h1>
      <div
        className={`relative mx-auto w-full max-w-xs sm:max-w-md ${
          theme === "dark"
            ? "border border-neutral-800 bg-neutral-900"
            : "shadow-xl"
        }  flex flex-col justify-center items-center text-center py-12 sm:px-4 lg:px-6 rounded-xl mt-5`}
      >
        <Error message={error} position="top-4" />
        <div className="w-full px-5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-neutral-500" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full px-3 py-2 pl-10 text-sm sm:text-md"
                  onChange={handleInputChange}
                />
              </div>
              {formError.email && (
                <Error message={formError.email} position="left-1" />
              )}
            </div>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 sm:h-5 w-4 sm:w-5  text-neutral-500" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-3 py-2 pl-10 text-sm sm:text-md"
                  onChange={handleInputChange}
                />
              </div>
              {formError.password && (
                <Error message={formError.password} position="left-1" />
              )}
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading ? true : false}
            >
              {loading ? <PulseLoader size={6} color="#ffff" /> : "Login"}
            </Button>
            <Button
              type="button"
              className="w-full cursor-pointer"
              disabled={loading ? true : false}
              onClick={loginWithGoogle}
            >
              {loading ? (
                <PulseLoader size={6} color="#ffff" />
              ) : (
                "Sign in with Google"
              )}
              <FcGoogle />
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={"/auth/signup"}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
