import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.sass'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  safeUrl!: any;

  constructor(private sanitizer: DomSanitizer) {}

  @Input() videoUrl!: any;

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  onResize(): void {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
      videoPlayer.style.height = videoPlayer.clientWidth * 0.5625 + 'px';
    }
  }
}
