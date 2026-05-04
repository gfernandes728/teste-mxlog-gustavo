import { 
  createContext, 
  useState 
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};