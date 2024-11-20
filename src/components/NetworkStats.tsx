import React from 'react';
import { Activity, Wifi } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const NetworkStats: React.FC = () => {
  const networkInfo = useNetworkStore((state) => state.networkInfo);

  const stats = [
    {
      label: 'Average Latency',
      value: `${networkInfo.latency.toFixed(1)}ms`,
      change: 0,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: 'Packet Loss',
      value: `${(networkInfo.packetLoss * 100).toFixed(2)}%`,
      change: networkInfo.packetLoss,
      icon: <Wifi className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
            {stat.icon}
          </div>
          <div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <div className="flex items-center space-x-2">
              <p className="text-white text-lg font-semibold">{stat.value}</p>
              <span
                className={`text-sm ${
                  stat.change < 0.1 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change < 0.1 ? 'Good' : 'High'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};