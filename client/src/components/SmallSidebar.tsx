import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
const SmallSidebar = () => {
  const dashboardCtx = useDashboardContext();
  console.log(dashboardCtx);
  return <Wrapper>SmallSidebar</Wrapper>;
};

export default SmallSidebar;
