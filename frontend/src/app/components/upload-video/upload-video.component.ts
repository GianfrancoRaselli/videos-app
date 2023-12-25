import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
})
export class UploadVideoComponent {
  @Input() modalVisible = false;
  @Output() close = new EventEmitter();
  isLoading = false;
  title = '';
  video: File | null = null;
  image: File | null = null;

  constructor(
    private notifyService: NotifyService,
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
  ) {}

  handleVideoChange(event: any): void {
    this.video = event.target.files[0];
  }

  handleImageChange(event: any): void {
    this.image = event.target.files[0];
  }

  submitForm(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      if (!(this.title && this.video && this.image)) {
        this.notifyService.notifyError('Complete all fields');
        return;
      }
      if (!this.video.type.startsWith('video/')) {
        this.notifyService.notifyError('Select a valid video file');
        return;
      }
      if (!this.image.type.startsWith('image/')) {
        this.notifyService.notifyError('Select a valid image file');
        return;
      }
      const videoFormData: FormData = new FormData();
      videoFormData.append('title', this.title);
      videoFormData.append('video', this.video);
      this.http.post('videos', videoFormData).subscribe(
        (res: any) => {
          const imageFormData: FormData = new FormData();
          imageFormData.append('image', this.image as File);
          this.http.post(`videos/${res.data.id}`, imageFormData).subscribe(
            () => {
              this.notifyService.notifySuccess('Video uploaded');
              this.close.emit();
              this.sharedService.emitVideoUploadedEvent();
              this.router.navigate(['/']);
              this.title = '';
              this.video = null;
              this.image = null;
              this.isLoading = false;
            },
            (err) => {
              this.notifyService.notifyError('Try again');
              this.isLoading = false;
            },
          );
        },
        (err) => {
          this.notifyService.notifyError('Try again');
          this.isLoading = false;
        },
      );
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
