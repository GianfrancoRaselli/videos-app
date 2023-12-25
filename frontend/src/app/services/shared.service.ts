import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private videoUploadedEventSubject = new Subject<void>();

  videoUploadedEvent = this.videoUploadedEventSubject.asObservable();

  emitVideoUploadedEvent() {
    this.videoUploadedEventSubject.next();
  }
}
