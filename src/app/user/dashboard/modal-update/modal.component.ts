import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible = false;
  @Input() connectData: any = {
    idFirst: '',
    portSource: '',
    idLast: '',
    portTo: '',
    note: '',
  };
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.submit.emit(this.connectData);
  }
}
