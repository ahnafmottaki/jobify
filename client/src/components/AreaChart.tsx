import type { JobStatResProp } from "../types/statsTypes";

type AreaChartProp = {
  data: JobStatResProp["monthlyApplications"];
};

export default function AreaChart({}: AreaChartProp) {
  return <div>AreaChart</div>;
}
