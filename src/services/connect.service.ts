import { Injectable } from '@angular/core';
import { environment } from '../environment/env';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private connectUrl = `${environment.apiUrl}/connect`;

  constructor() {}

  async getAllByUserId(userId: number) {
    try {
      const response = await axios.get(`${this.connectUrl}/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.log('Error fetching: ', error);
    }
  }

  async getAllConnects() {
    try {
      const response = await axios.get(this.connectUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching all connects:', error);
      throw error;
    }
  }

  async createConnect(connectData: any) {
    try {
      const response = await axios.post(this.connectUrl, connectData);
      return response.data;
    } catch (error) {
      console.error('Error creating new connect:', error);
      throw error;
    }
  }

  async updateConnect(id: number, connectData: any) {
    try {
      const response = await axios.put(`${this.connectUrl}/${id}`, connectData);
      return response.data;
    } catch (error) {
      console.error('Error updating connect:', error);
      throw error;
    }
  }

  async deleteConnect(id: number) {
    try {
      const response = await axios.delete(`${this.connectUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting connect:', error);
      throw error;
    }
  }
}
