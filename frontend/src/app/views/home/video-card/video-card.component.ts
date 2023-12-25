import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { presentDatetime } from '../../../helpers/datetime.helpers';
import { Video } from '../../../models/Video';
import { backendUrl } from '../../../ref';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  @Input() video: Video | undefined;
  videoUrl = '';
  imageUrl = '';
  duration = '';
  sizeInMB = '';
  localDatetime = '';
  videoLink = '';

  ngOnInit() {
    this.videoUrl = `${backendUrl}videos/display/${this.video?.filename}.mp4`;
    this.imageUrl = `${backendUrl}videos/preview/${this.video?.filename}.png`;
    this.sizeInMB = `${((this.video?.size as number) / (1024 * 1024)).toFixed(2)} MB`;
    this.localDatetime = presentDatetime(this.video?.datetime as string, { format: 'numbers', withTime: true });
    this.videoLink = `/video/${this.video?.filename}`;
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
