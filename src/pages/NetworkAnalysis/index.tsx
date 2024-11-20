import React from 'react';
import { Activity, ArrowDown, ArrowUp, Zap } from 'lucide-react';
import { useNetworkStore } from '../../store/networkStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const NetworkAnalysis: React.FC = () => {
  const networkInfo = useNetworkStore((state) => state.networkInfo);
  const [historicalData, setHistoricalData] = React.useState<any[]>([]);

  React.useEffect(() => {
    setHistoricalData(prev => {
      const newData = [...prev, {
        time: new Date().toLocaleTimeString(),
        download: networkInfo.speed.download,
        upload: networkInfo.speed.upload,
        latency: networkInfo.latency
      }];
      return newData.slice(-30);
    });
  }, [networkInfo]);

  const stats = [
    {
      label: 'Download Speed',
      value: `${(networkInfo.speed.download / 1024 / 1024).toFixed(2)} Mbps`,
      icon: ArrowDown,
      color: 'text-blue-500',
    },
    {
      label: 'Upload Speed',
      value: `${(networkInfo.speed.upload / 1024 / 1024).toFixed(2)} Mbps`,
      icon: ArrowUp,
      color: 'text-green-500',
    },
    {
      label: 'Latency',
      value: `${networkInfo.latency.toFixed(1)} ms`,
      icon: Activity,
      color: 'text-yellow-500',
    },
    {
      label: 'Network Type',
      value: networkInfo.type || 'Unknown',
      icon: Zap,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl font-semibold mt-1 dark:text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Network Performance History</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="download" stroke="#3b82f6" name="Download Speed" />
              <Line type="monotone" dataKey="upload" stroke="#10b981" name="Upload Speed" />
              <Line type="monotone" dataKey="latency" stroke="#eab308" name="Latency" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};