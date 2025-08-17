import type { JobStatResProp } from "../types/statsTypes";
import {
  ResponsiveContainer,
  AreaChart as MyAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type AreaChartProp = {
  data: JobStatResProp["monthlyApplications"];
};

export default function AreaChart({ data }: AreaChartProp) {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <MyAreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          dataKey={"count"}
          type={"monotone"}
          stroke="#2cb1bc"
          fill="#bef8fd"
        />
      </MyAreaChart>
    </ResponsiveContainer>
  );
}
