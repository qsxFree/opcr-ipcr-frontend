import { useContext } from "react";
import UserContext from "../context/UserContext";

const useRoleChecker = (roles) => {
  const user = useContext(UserContext);
  const lowerCasedRoles = roles.map((role) => role.toLowerCase());
  return {
    check: () => lowerCasedRoles.includes(user.user._level.name.toLowerCase()),
  };
};

export default useRoleChecker;
