import type { locationAnalyticsType } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type CityCount = Record<string, number>;

// #endregion
export const Location = ({
  analytics,
}: {
  analytics: locationAnalyticsType[];
}) => {
  const cityCount = analytics.reduce<CityCount>((acc, item) => {
    if (!item.city) return acc;
    acc[item.city] = (acc[item.city] || 0) + 1;
    return acc;
  }, {});

  console.log("city count", cityCount);

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          style={{
            aspectRatio: 1.618,
          }}
          responsive
          data={cities.slice(0, 6)}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="city" />
          <YAxis width="auto" allowDecimals={false} />
          <Tooltip labelFormatter={(label) => label} labelClassName="text-teal-600"/>
          <Legend />
          <Bar
            dataKey="count"
            name={"visits"}
            fill="#3B82F6"
            barSize={35}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Location;
