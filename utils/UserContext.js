import { createContext } from "react";

const UserContext = createContext({
  user: {
    name: "Mohit",
    email: "mohit1paul@gmail.com",
  },
});

export default UserContext;

