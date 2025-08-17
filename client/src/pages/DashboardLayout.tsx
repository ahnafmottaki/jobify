import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "react-router";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import type { SuccessResponse } from "../types/axiosTypes";
import { toast } from "react-toastify";
import type { User } from "../types/userTypes";

type DashboardContextProps = {
  user: User | null;
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

export const loader: LoaderFunction = async ({}: LoaderFunctionArgs) => {
  try {
    const response = await customFetch.get("/users/current-user");
    return response.data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData<SuccessResponse<User, "user">>();
  console.log(user);
  //temp
  // const user = { name: "john" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", String(newDarkTheme));
  };

  const toggleSideBar = () => {
    setShowSidebar((prev) => !prev);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("logging out...");
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
              <Outlet context={{ user }} />
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
