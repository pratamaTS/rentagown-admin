import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  url = '';

  constructor(private router: Router) {
    router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.url = route.url;
        if (this.url && this.url.length > 0) {
          this.url = this.url.slice(1);
        }
      }
    });
  }

  ActiveClass(link: any): String {
    if (link == this.url)
      return "active"
    return ""
  }
  MenuOpen(arr: any): String {
    if (arr.includes(this.url))
      return "menu-open"
    return ""
  }
  ngOnInit(): void {
  }

}
