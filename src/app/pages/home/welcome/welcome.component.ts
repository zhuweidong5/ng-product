import { Component, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
// import content from 'npm-dom-zhu';
// import * as  content from 'npm-dom-zhu';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    // private dd: content,
    // tslint:disable-next-line: no-shadowed-variable
    // private add: add
  ) { }

  ngOnInit() {
    const dd = require('npm-dom-zhu');
    dd.lai();
    dd.add(1, 5);

    this.studyRxjx();
    this.init();
  }

  // Rxjs demo
  studyRxjx() {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 3000);
    });

    observable.subscribe({
      next(res) { console.log('got value ' + res); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
  }


  init() {
    // map(
    //   (x) => x * x)(of(1, 2, 3)).subscribe(
    //     (v) => {
    //       console.log(`value: ${v}`);
    //     }
    // );


    const observable1 = interval(400);
    const observable2 = interval(300);

    const subscription = observable1.subscribe(x => console.log('first: ' + x));
    const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

    subscription.add(childSubscription);

    setTimeout(() => {
      // Unsubscribes BOTH subscription and childSubscription
      subscription.unsubscribe();
    }, 1000);

  }





}
