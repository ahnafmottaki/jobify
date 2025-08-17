import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import type { JobStatResProp } from "../types/statsTypes";
import { useState } from "react";

type ChartsContainerProp = Omit<JobStatResProp, "defaultStats">;

const ChartsContainer = ({ monthlyApplications }: ChartsContainerProp) => {
  const [barChart, setBarChart] = useState<boolean>(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
