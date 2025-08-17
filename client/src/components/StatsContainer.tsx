import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import type { JobStatResProp } from "../types/statsTypes";
import { type ReactNode } from "react";

type StatsContainerProp = Omit<JobStatResProp, "monthlyApplications">;
interface StatProp {
  title: string;
  count: string;
  icon: ReactNode;
  color: string;
  bcg: string;
}

const StatsContainer = ({ defaultStats }: StatsContainerProp) => {
  const stats: StatProp[] = [
    {
      title: "Pending Applications",
      count: defaultStats?.pending || "0",
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "Interview Scheduled",
      count: defaultStats?.interview || "0",
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Jobs Declined",
      count: defaultStats?.declined || "0",
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem {...item} key={item.title} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
