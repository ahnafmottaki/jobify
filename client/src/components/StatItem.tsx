import type { ReactNode } from "react";
import Wrapper from "../assets/wrappers/StatItem";

interface StatProp {
  count: string;
  title: string;
  icon: ReactNode;
  color: string;
  bcg: string;
}
const StatItem = ({ title, icon, color, bcg, count }: StatProp) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
