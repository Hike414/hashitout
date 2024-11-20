import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const NetworkInfo: React.FC = () => {
  const networkInfo = useNetworkStore((state) => state.networkInfo);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Network Information</h3>
        <div className="flex items-center space-x-2">
          {networkInfo.type ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm text-gray-300">
            {networkInfo.type || 'Disconnected'}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {networkInfo.interfaces.map((iface: any, index: number) => (
          <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-white text-sm font-medium">{iface.name}</p>
            {iface.addresses?.map((addr: any, i: number) => (
              <p key={i} className="text-gray-400 text-xs">
                {addr.address} ({addr.family})
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};