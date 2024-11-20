import React, { useEffect } from 'react';
import { Bell, Menu, Moon, Sun } from 'lucide-react';
import { io } from 'socket.io-client';
import { useNetworkStore } from './store/networkStore';
import { Dashboard } from './pages/Dashboard';
import { NetworkAnalysis } from './pages/NetworkAnalysis';
import { Security } from './pages/Security';
import { Settings } from './pages/Settings';

function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const { setSocket, updateNetworkInfo, updateSecurityState } = useNetworkStore();

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    socket.on('networkUpdate', (info) => {
      updateNetworkInfo(info);
    });

    socket.on('securityUpdate', (state) => {
      updateSecurityState(state);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'network':
        return <NetworkAnalysis />;
      case 'security':
        return <Security />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Network Analyzer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {sidebarOpen && (
            <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-[calc(100vh-4rem)]">
              <nav className="p-4 space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'network', label: 'Network Analysis' },
                  { id: 'security', label: 'Security' },
                  { id: 'settings', label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>
          )}

          <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;