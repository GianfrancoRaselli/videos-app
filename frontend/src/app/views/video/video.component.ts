import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { presentDatetime } from '../../helpers/datetime.helpers';
import { backendUrl } from '../../ref';
import { Video } from '../../models/Video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  video: Video | undefined;
  videoUrl = '';
  duration = '';
  sizeInMB = '';
  localDatetime = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoUrl = `${backendUrl}videos/display/${params['filename']}.mp4`;
      this.http.get(`videos/${params['filename']}`).subscribe((res: any) => {
        this.video = res.data as Video;
        this.sizeInMB = `${((this.video?.size as number) / (1024 * 1024)).toFixed(2)} MB`;
        this.localDatetime = presentDatetime(this.video?.datetime as string, { format: 'numbers', withTime: true });
      });
    });
  }

  onVideoMetadataLoaded(event: Event): void {
    const videoDuration = this.videoElement?.nativeElement.duration;
    const minutes = Math.floor(videoDuration / 60);
    const seconds = Math.floor(videoDuration % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    this.duration = `${formattedMinutes}:${formattedSeconds}`;
  }
}
