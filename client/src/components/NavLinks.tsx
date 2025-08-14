import { NavLink } from "react-router";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
const NavLinks = ({ isBigSideBar }: { isBigSideBar?: boolean }) => {
  const { toggleSideBar } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map(({ text, path, icon }) => (
        <NavLink
          to={path}
          key={text}
          className={"nav-link"}
          onClick={isBigSideBar ? () => {} : toggleSideBar}
          end
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
