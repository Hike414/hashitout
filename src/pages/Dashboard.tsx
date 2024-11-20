import React from 'react';
import { SpeedGauge } from '../components/SpeedGauge';
import { SecurityStatus } from '../components/SecurityStatus';
import { NetworkStats } from '../components/NetworkStats';
import { NetworkInfo } from '../components/NetworkInfo';

export const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <SpeedGauge />
        <NetworkStats />
        <NetworkInfo />
      </div>
      <div className="space-y-6">
        <SecurityStatus />
      </div>
    </div>
  );
};