import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-newsletter',
  templateUrl: './add-newsletter.component.html',
  styleUrls: ['./add-newsletter.component.css']
})
export class AddNewsletterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCreateNewsletter(): void {
    this.router.navigateByUrl('master-newsletter')
  }

}
