import axios from 'axios';

export class BeaconNodeClient {
  private readonly beaconUrl: string;

  constructor() {
    this.beaconUrl = process.env.BEACON_URL || 'https://api.lighthouse.sigmaprime.io/eth/v1';
  }

  async getLatestSlot(): Promise<number> {
    const response = await axios.get(`${this.beaconUrl}/beacon/states/head`);
    return response.data.data.slot;
  }

  async getStateBySlot(slot: number): Promise<{ stateRoot: string }> {
    const response = await axios.get(`${this.beaconUrl}/beacon/states/${slot}`);
    return { stateRoot: response.data.data.stateRoot };
  }
}