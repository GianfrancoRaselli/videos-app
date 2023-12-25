import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private toastr: ToastrService) {}

  notifySuccess(message: string) {
    this.toastr.success(message, 'Success', { positionClass: 'toast-bottom-right' });
  }

  notifyError(message: string) {
    this.toastr.error(message, 'Error', { positionClass: 'toast-bottom-right' });
  }
}
