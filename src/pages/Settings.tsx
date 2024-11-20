import React from 'react';
import { Bell, Moon, Shield, Wifi } from 'lucide-react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState({
    darkMode: true,
    notifications: true,
    autoScan: true,
    speedTest: '30',
    securityLevel: 'high',
  });

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    {
      title: 'Appearance',
      icon: Moon,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          type: 'toggle',
          description: 'Enable dark mode for the interface',
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'notifications',
          label: 'Enable Notifications',
          type: 'toggle',
          description: 'Receive notifications for security alerts and network changes',
        },
      ],
    },
    {
      title: 'Network',
      icon: Wifi,
      settings: [
        {
          key: 'autoScan',
          label: 'Auto Network Scan',
          type: 'toggle',
          description: 'Automatically scan for network changes',
        },
        {
          key: 'speedTest',
          label: 'Speed Test Interval',
          type: 'select',
          options: [
            { value: '15', label: 'Every 15 minutes' },
            { value: '30', label: 'Every 30 minutes' },
            { value: '60', label: 'Every hour' },
          ],
          description: 'How often to run speed tests',
        },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        {
          key: 'securityLevel',
          label: 'Security Level',
          type: 'select',
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ],
          description: 'Set the security level for threat detection',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <section.icon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold dark:text-white">{section.title}</h2>
          </div>
          <div className="space-y-6">
            {section.settings.map((setting) => (
              <div key={setting.key} className="flex items-start justify-between">
                <div>
                  <label htmlFor={setting.key} className="font-medium dark:text-white">
                    {setting.label}
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {setting.description}
                  </p>
                </div>
                {setting.type === 'toggle' ? (
                  <button
                    onClick={() => handleChange(setting.key, !settings[setting.key as keyof typeof settings])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[setting.key as keyof typeof settings]
                        ? 'bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : setting.type === 'select' ? (
                  <select
                    id={setting.key}
                    value={settings[setting.key as keyof typeof settings]}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    className="block w-48 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {setting.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};