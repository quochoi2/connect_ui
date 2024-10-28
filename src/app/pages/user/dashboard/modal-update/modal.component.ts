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
export class ModalUpdateComponent {
  @Input() isVisible = false;
  @Input() connectData: any = {};
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.submit.emit(this.connectData);
  }
}
