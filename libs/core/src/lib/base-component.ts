import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  subscriberMap = new Map<Observable<any>, (data?: any) => any>();
  #subscribers: Subscription[] = [];

  ngOnInit(): void {
    for (const [key, value] of this.subscriberMap.entries()) {
      this.addSafeSubscribers(key, value);
    }
  }

  addSafeSubscribers(source: Observable<any>, callback: (data?: any) => any) {
    const subscription = source.subscribe(callback);
    this.#subscribers.push(subscription);
  }

  ngOnDestroy(): void {
    for (const subscriber of this.#subscribers) {
      subscriber.unsubscribe();
    }
  }
}
