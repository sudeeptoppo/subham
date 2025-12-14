import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { MovingText } from "../components/MovingText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snowfall from 'react-snowfall'
import ThemeSwitch from "../components/theme/ThemeSwitch";
export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className=" h-screen flex justify-center ">
      <div className="flex flex-col  justify-center ">
        <div className="bg-white rounded-lg w-80 text-center p-2  px-4">
          <Snowfall snowflakeCount={50} />
          <Heading label={"sign in"}></Heading>
          <SubHeading
            label={"Enter your information to access the account"}
          ></SubHeading>

          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputBox>
          <InputBox label={"Password"} placeholder={"********"} onChange={(e) => {
              setPassword(e.target.value);
            }}></InputBox>
          <Button onClick={async () => {
                        try {
                          const response = await axios.post(
                            "http://localhost:3000/api/v1/user/signin",
                            {
                              email,
                              password,
                            }
                          );
                          localStorage.setItem("token", response.data.token);
                          // Navigate to dashboard or signin on success
                          // Assuming you have navigation, e.g., from react-router-dom
                          // navigate("/dashboard");
                          navigate("/Dashboard");
                          
                          alert("User sign in successfully");
                        } catch (error) {
                          console.log(email, password);
                          console.error("Signin error:", error);
                          alert(
                            "Signin failed: " +
                              (error.response?.data?.message || error.message)
                          );
                        }
                      }}
          label={"Sign in"}></Button>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
      <ThemeSwitch />
      <MovingText></MovingText>
    </div>
  );
}
