import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface NetworkState {
  networkInfo: {
    type: string | null;
    interfaces: any[];
    speed: {
      download: number;
      upload: number;
    };
    latency: number;
    packetLoss: number;
  };
  securityState: {
    firewallActive: boolean;
    sslCertificates: any[];
    alerts: any[];
    intrusions: any[];
  };
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  updateNetworkInfo: (info: any) => void;
  updateSecurityState: (state: any) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  networkInfo: {
    type: null,
    interfaces: [],
    speed: { download: 0, upload: 0 },
    latency: 0,
    packetLoss: 0,
  },
  securityState: {
    firewallActive: true,
    sslCertificates: [],
    alerts: [],
    intrusions: [],
  },
  socket: null,
  setSocket: (socket) => set({ socket }),
  updateNetworkInfo: (info) => set({ networkInfo: info }),
  updateSecurityState: (state) => set({ securityState: state }),
}));