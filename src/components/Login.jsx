import React from "react";
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
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you already one</CardDescription>
        <Error message={"Something Wrong"} />
      </CardHeader>
      <CardContent className=" space-y-2 ">
        <div className=" space-y-1 ">
          <Input
            OnChange={handleInputChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
          />
          <Error message={"Something Wrong"} />
        </div>
        <div className=" space-y-1 ">
          <Input
            OnChange={handleInputChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
          <Error message={"Something Wrong"} />
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          {true ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
