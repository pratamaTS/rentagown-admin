import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { NewsletterService } from 'src/app/_services/newsletter.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataNewsletter: any = []
  Realdata: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private newsletterService: NewsletterService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.newsletterService.getAllNewsletter(this.tokenType, this.token).subscribe(
        data => {
          this.dataNewsletter = data.data
          this.Realdata = data.data
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

  refreshData(): void {
    this.newsletterService.getAllNewsletter(this.tokenType, this.token).subscribe(
      data => {
        this.dataNewsletter = data.data
        this.Realdata = data.data
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onDeleteNewsletter(id: any): void {
    const data = {
      newsletter_id: id
    };
    this.newsletterService.deleteNewsletter(id, data, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
   }
}
