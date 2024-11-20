import React from 'react';
import { Shield, AlertTriangle, Lock, Key } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const Security: React.FC = () => {
  const { securityState, socket } = useNetworkStore();
  const [selectedAlert, setSelectedAlert] = React.useState<any>(null);

  const toggleFirewall = () => {
    socket?.emit('toggleFirewall', !securityState.firewallActive);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Firewall Status</p>
              <p className={`text-xl font-semibold mt-1 ${
                securityState.firewallActive ? 'text-green-500' : 'text-red-500'
              }`}>
                {securityState.firewallActive ? 'Active' : 'Disabled'}
              </p>
            </div>
            <Shield className={`w-8 h-8 ${
              securityState.firewallActive ? 'text-green-500' : 'text-red-500'
            }`} />
          </div>
          <button
            onClick={toggleFirewall}
            className={`mt-4 px-4 py-2 rounded-lg w-full ${
              securityState.firewallActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
          >
            {securityState.firewallActive ? 'Disable Firewall' : 'Enable Firewall'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Threats</p>
              <p className="text-xl font-semibold mt-1 text-yellow-500">
                {securityState.alerts.length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">SSL Certificate</p>
              <p className="text-xl font-semibold mt-1 text-green-500">Valid</p>
            </div>
            <Lock className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Security Alerts</h3>
          <div className="space-y-3">
            {securityState.alerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium dark:text-white">{alert.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.type === 'high'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : alert.type === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {alert.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedAlert && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Alert Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Message</p>
                <p className="text-lg font-medium dark:text-white">{selectedAlert.message}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Severity</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                  selectedAlert.type === 'high'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : selectedAlert.type === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {selectedAlert.type}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Timestamp</p>
                <p className="text-lg font-medium dark:text-white">
                  {new Date(selectedAlert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};