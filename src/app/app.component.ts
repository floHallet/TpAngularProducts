import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'st-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  //title = 'tp-angular';
  navEnd: Observable<NavigationEnd>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private title: Title) {
    // Create a new Observable that publishes only the NavigationStart event
    this.navEnd = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit(): void {
    this.navEnd.subscribe(() => {
      //console.log(event);
      this.title.setTitle(this.activatedRoute.firstChild!.snapshot.data['title']);
    });
  }
}
