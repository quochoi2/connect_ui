import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ConnectService } from '../../../services/connect.service';
import { Router } from '@angular/router';
import { formatDate, formatTime } from '../../../utils/formatDateTime';
import { historyService } from '../../../services/history.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class AdminDashboardComponent {
  connects: any[] = [];
  name: string = '';
  userId: number | null = null;

  isModalCreate: boolean = false;
  isModalUpdate: boolean = false;
  currentConnect: any = null;

  constructor(
    private authService: AuthService,
    private connectService: ConnectService,
    private historyService: historyService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userId = user ? user.id : null;
    this.name = user ? user.name : null;
    if (this.userId) {
      this.getAllConnects();
    } else {
      this.router.navigate(['/signin']);
    }
  }

  async getAllConnects() {
    try {
      this.connects = await this.connectService.getAllConnects();
      this.connects = this.connects.map((connect) => ({
        ...connect,
        formattedUpdatedAt: formatDate(connect.updatedAt),
      }));
    } catch (error) {
      console.error('Error fetching connects:', error);
    }
  }

  async handleOpenAndCloseConnect(
    id: number,
    action: 'open' | 'close',
    name?: string
  ) {
    try {
      if (action === 'open') {
        await this.connectService.openConnect(id, name!);
        await this.historyService.historyAddConnect({
          action: 'open',
          moderator: name,
          connect_id: id,
        });
      } else if (action === 'close') {
        await this.connectService.closeConnect(id);
        if (name) {
          await this.historyService.historyAddConnect({
            action: 'close',
            moderator: name,
            connect_id: id,
          });
        } else {
          console.warn('Moderator name is not defined for closing action.');
        }
      }
      this.getAllConnects();
    } catch (error) {
      console.error(`Error ${action}ing connect:`, error);
    }
  }

  goToHistoryActions() {
    this.router.navigate(['/admin/history']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
