import { createContext } from "react";

const UserContext = createContext({
  user: {
    name: "Mohit",
    email: "dummygmail.com",
  },
});

export default UserContext;
