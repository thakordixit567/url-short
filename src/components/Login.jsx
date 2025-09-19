import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/hooks/usefetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-border">
      <Card
        className="px-4 pb-4 rounded-2xl"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <CardHeader>
          <CardTitle className="text-white">Login</CardTitle>
          <CardDescription className="text-gray-400">
            to your account if you already one
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              className="bg-[#2A2A2A] text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500"
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              className="bg-[#2A2A2A] text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500"
              onChange={handleInputChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            onClick={handleLogin}
          >
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
