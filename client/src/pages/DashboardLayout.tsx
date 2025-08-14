import { Outlet } from "react-router";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";

type User = { name: string } | null;
type DashboardContextProps = {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSideBar: () => void;
  logoutUser: () => void;
};
const DashboardContext = createContext<DashboardContextProps>({
  user: null,
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme() {},
  toggleSideBar() {},
  logoutUser() {},
});

const DashboardLayout = () => {
  //temp
  const user = { name: "john" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => {};
  const toggleSideBar = () => {
    setShowSidebar((prev) => !prev);
  };

  const logoutUser = async () => {
    console.log("logout user");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
export default DashboardLayout;
