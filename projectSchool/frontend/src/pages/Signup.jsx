import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SelectBox } from "../components/SelectBox";
import { MovingText } from "../components/MovingText";
import Snowfall from "react-snowfall";
import ThemeSwitch from "../components/theme/ThemeSwitch";
export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  return (
    <div className=" h-screen flex justify-center ">
      <div className="flex flex-col  justify-center ">
        <div className="bg-white rounded-lg w-80 text-center p-2  px-4">
          <Snowfall snowflakeCount={50} />
          <Heading label={"sign up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputBox>

          <SelectBox
            label={"User Role"}
            options={["Student", "Teacher", "Admin"]}
            onChange={(e) => {
              setRole(e.target.value); // e.target.value will be "student", "teacher", or "admin"
            }}
          />

          <InputBox
            label={"Password"}
            placeholder={"********"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>

          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    email,
                    firstName,
                    lastName,
                    password,
                    role,
                  }
                );
                localStorage.setItem("token", response.data.token);
                // Navigate to dashboard or signin on success
                // Assuming you have navigation, e.g., from react-router-dom
                // navigate("/dashboard");
                navigate("/Dashboard");
                alert("User created successfully");
              } catch (error) {
                console.error("Signup error:", error);
                alert(
                  "Signup failed: " +
                    (error.response?.data?.message || error.message)
                );
              }
            }}
            label={"Sign up"}
          ></Button>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
      <ThemeSwitch />
      <MovingText></MovingText>
    </div>
  );
}
