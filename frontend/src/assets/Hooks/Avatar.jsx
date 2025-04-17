import { useContext } from "react";
import UserContext from "../Context/UseContext";

export const Avatar = () => {
  const user = useContext(UserContext);

  const name =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";
  const lastName =
    user?.lastName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";

  const avatar = name + lastName;
  
  return (
    <>
      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-celeste text-white text-lg font-semibold">
        {avatar}
      </span>
    </>
  );
};
