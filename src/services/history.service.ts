import { Injectable } from '@angular/core';
import { environment } from '../environment/env';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class historyService {
  private connectUrl = `${environment.apiUrl}/history`;

  constructor() {}

  async getAllConnectHistories(page: number, limit: number) {
    try {
      const response = await axios.get(
        `${this.connectUrl}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching all connects:', error);
      throw error;
    }
  }

  async historyAddConnect(historyData: any) {
    try {
      await axios.post(`${this.connectUrl}`, historyData);
    } catch (error) {
      console.log('Error adding connect in history');
      throw error;
    }
  }

  async historyDeleteConnect(id: number) {
    try {
      await axios.delete(`${this.connectUrl}/${id}`);
    } catch (error) {
      console.log('Error deleting connect in history');
      throw error;
    }
  }
}
