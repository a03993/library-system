import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="flex-fill">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
