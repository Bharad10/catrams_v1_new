
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  private interval: any;
  private isPaused: boolean = false;

  @Input() start: boolean= false;
  @Output() pauseEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() resumeEvent: EventEmitter<void> = new EventEmitter<void>();

  public seconds: number = 0;
  public minutes: number = 0;
  public hours: number = 0;

  ngOnInit() {
    this.loadElapsedTime();
    this.startOrResume();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnChanges() {
    this.startOrResume();
  }

  private startOrResume() {
    if (this.start && !this.interval) {
      this.interval = setInterval(() => {
        if (!this.isPaused) {
          this.seconds++;

          if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;

            if (this.minutes === 60) {
              this.minutes = 0;
              this.hours++;
            }
          }

          this.saveElapsedTime();
        }
      }, 1000);
    }
  }

  pause() {
    this.isPaused = true;
    this.pauseEvent.emit();
    this.saveElapsedTime();
  }

  resume() {
    this.isPaused = false;
    this.resumeEvent.emit();
    this.saveElapsedTime();
  }

  private saveElapsedTime() {
    localStorage.setItem('stopwatchTime', JSON.stringify({
      seconds: this.seconds,
      minutes: this.minutes,
      hours: this.hours
    }));
  }

  private loadElapsedTime() {
    const storedTime = JSON.parse(localStorage.getItem('stopwatchTime') || '{}');
    this.seconds = storedTime.seconds || 0;
    this.minutes = storedTime.minutes || 0;
    this.hours = storedTime.hours || 0;
  }
}

