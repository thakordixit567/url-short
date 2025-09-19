import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/usefetch";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-border">
      <Card
        className="px-4 pb-4 rounded-2xl"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <CardHeader>
          <CardTitle className="text-white">Signup</CardTitle>
          <CardDescription className="text-gray-400">
            Create a new account if you haven&rsquo;t already
          </CardDescription>
          {error && <Error message={error?.message} />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              className="bg-[#2A2A2A] text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500"
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <Error message={errors.name} />}
          <div className="space-y-1">
            <Input
              className="bg-[#2A2A2A] text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500"
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="space-y-1">
            <Input
              className="bg-[#2A2A2A] text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
          <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-200">
            Upload Profile Pic
          </span>
        
          <input
            id="profile_pic"
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        
          <label
            htmlFor="profile_pic"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Choose File
          </label>
        </div>
        
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            onClick={handleSignup}
          >
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
