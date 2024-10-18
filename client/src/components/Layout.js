import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
