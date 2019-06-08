import { Component } from '@angular/core';
import {NavigationCancel, Event,
        NavigationEnd, NavigationStart,
        NavigationError, Router} from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Crud';

  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }

  constructor(private loadingBar: SlimLoadingBarService, private router: Router){
    this.router.events.subscribe((event: Event)=>{
      this.navigationInterceptor(event);
    });
  }
}
