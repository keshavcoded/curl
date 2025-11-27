import type { deviceAnalyticsType } from "@/lib/types";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DeviceCount = Record<string, number>;

export const Device = ({ analytics }: { analytics: deviceAnalyticsType[] }) => {
  console.log(analytics);
  const deviceCount = analytics.reduce<DeviceCount>((acc, item) => {
    if (!item.device) return acc;
    acc[item.device] = (acc[item.device] || 0) + 1;
    return acc;
  }, {});

  const devices = Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));

  const COLORS = ["#3B82F6", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={devices}
            dataKey="count"
            nameKey="device"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            stroke="none"
            cornerRadius={8}
          >
            {devices.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Device;
