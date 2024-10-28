import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { historyService } from '../../../services/history.service';
import { AuthService } from '../../../services/auth.service';
import axios from 'axios';
import { formatDate } from '../../../utils/formatDateTime';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  connects: any[] = [];
  name: string = '';
  userId: number | null = null;

  page: number = 1;
  limit: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private authService: AuthService,
    private historyService: historyService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userId = user ? user.id : null;
    this.name = user ? user.name : null;
    if (this.userId) {
      this.getAllConnectHistories();
    } else {
      this.router.navigate(['/signin']);
    }
  }

  async getAllConnectHistories() {
    try {
      const response = await this.historyService.getAllConnectHistories(
        this.page,
        this.limit
      );

      this.connects = response.data.map((connect: any) => ({
        ...connect,
        formattedUpdatedAt: formatDate(connect.updatedAt),
      }));
      this.totalItems = response.totalItems;
      this.totalPages = response.totalPages;
    } catch (error) {
      console.error('Error fetching all connects:', error);
      throw error;
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllConnectHistories();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllConnectHistories();
    }
  }

  backAdminDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
