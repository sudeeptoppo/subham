import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../Appbar";
export function Name() {

  const [users, setUsers] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, []);

  return <>
    <Appbar user={users}></Appbar>
  </>;
}
