import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

export default function LineCharts({
  data,
}: {
  data?: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Tooltip wrapperClassName="!bg-white z-20 dark:!bg-neutral-900 rounded-lg" />
        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#00bba7"
          strokeWidth={2}
        />
        <XAxis dataKey="name" className="!hide !opacity-0" />
      </LineChart>
    </ResponsiveContainer>
  );
}
