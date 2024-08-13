import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  config: any;

  constructor(private toastr: ToastrService) {
    this.config = {
      timeOut: 3000,
    };
  }

  success(message: string) {
    return this.toastr.success(message, 'Success', this.config);
  }

  error(message: string) {
    return this.toastr.error(message, 'Error', this.config);
  }

  info(message: string) {
    return this.toastr.info(message, 'Info', this.config);
  }

  warning(message: string) {
    return this.toastr.warning(message, 'Warning', this.config);
  }
}
