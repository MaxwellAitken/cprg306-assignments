import { AuthContextProvider } from "./_utils/auth-context";
import Header from "./header";

const Layout = ({ children }) => {
  return <AuthContextProvider><Header /> {children} </AuthContextProvider>;
};
 
export default Layout;