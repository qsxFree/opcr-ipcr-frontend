import React from "react";

const UserContext = React.createContext({
  user: null,
  set: null,
});

export const UserProvider = UserContext.Provider;

export default UserContext;

// {
//     id: null,
//     user_code: null,
//     name: null,
//     role: null,
//     access: [],
//   }
