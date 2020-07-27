import { Component, OnInit } from '@angular/core';
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
    dd.add(1, 2);
  }

}
