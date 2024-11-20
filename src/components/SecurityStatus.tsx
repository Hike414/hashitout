import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const SecurityStatus: React.FC = () => {
  const { securityState, socket } = useNetworkStore();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Shield className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <ShieldCheck className="w-5 h-5 text-green-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const toggleFirewall = () => {
    socket?.emit('toggleFirewall', !securityState.firewallActive);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Security Status</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Firewall</span>
          <button
            onClick={toggleFirewall}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              securityState.firewallActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
            }`}
          >
            {securityState.firewallActive ? 'Active' : 'Disabled'}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {securityState.alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg"
          >
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <p className="text-white text-sm">{alert.message}</p>
              <p className="text-gray-400 text-xs">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};