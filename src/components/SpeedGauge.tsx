import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { useNetworkStore } from '../store/networkStore';

export const SpeedGauge: React.FC = () => {
  const networkInfo = useNetworkStore((state) => state.networkInfo);
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    setData(prev => {
      const newData = [...prev, {
        timestamp: Date.now(),
        download: networkInfo.speed.download,
        upload: networkInfo.speed.upload,
      }];
      return newData.slice(-20);
    });
  }, [networkInfo.speed]);

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-[300px]">
      <h3 className="text-lg font-semibold text-white mb-4">Network Speed</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => formatDistanceToNow(timestamp, { addSuffix: true })}
            stroke="#94a3b8"
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
            labelFormatter={(timestamp) => formatDistanceToNow(timestamp, { addSuffix: true })}
          />
          <Area
            type="monotone"
            dataKey="download"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.2}
            name="Download (Mbps)"
          />
          <Area
            type="monotone"
            dataKey="upload"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
            name="Upload (Mbps)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};