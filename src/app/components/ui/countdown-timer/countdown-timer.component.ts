import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countdown-timer',
  imports: [AsyncPipe],
  templateUrl: './countdown-timer.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // Enter animation
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [ // Leave animation
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  timeLeft$ = new BehaviorSubject<string>('');
  private timerSubscription!: Subscription;

  ngOnInit(): void {
    this.timerSubscription = interval(1000)
      .pipe(
        map(() => {
          const now = new Date();
          const midnight = new Date();
          midnight.setHours(24, 0, 0, 0);
          const diff = midnight.getTime() - now.getTime();

          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        })
      )
      .subscribe(this.timeLeft$);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
