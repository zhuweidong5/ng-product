import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { PathLibrary } from '../library/path-library';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private router: Router,
  ) {
  }

  navigate(commands: any[], extras?: NavigationExtras) {
    commands.unshift(PathLibrary.frame);
    console.log('----navigate-----', commands);
    this.router.navigate(commands, extras).then(this.navigateSuccess, this.navigateFailed);
  }

  // 第三方监管路由
  navigate1(commands: any[], extras?: NavigationExtras) {
    console.log('----navigate-----', commands);
    this.router.navigate(commands, extras).then(this.navigateSuccess, this.navigateFailed);
  }

  navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  goByPath(path: string) {
    window.location.href = path;
  }

  private navigateSuccess(value: any) {
    if (value !== true) {
      console.log(value);
    }
  }

  private navigateFailed(reason: any) {
    console.log(reason);
  }
}
