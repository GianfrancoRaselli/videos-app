import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { Video } from '../../models/Video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.sharedService.videoUploadedEvent.subscribe(() => this.getVideos());
    this.getVideos();
  }

  getVideos() {
    this.http.get('videos').subscribe((res: any) => {
      this.videos = res.data as Video[];
    });
  }
}
