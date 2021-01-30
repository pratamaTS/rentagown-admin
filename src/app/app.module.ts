import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PromoComponent } from './promo/promo.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { AddBankAccountComponent } from './bank-account/add-bank-account/add-bank-account.component';
import { UpdateBankAccountComponent } from './bank-account/update-bank-account/update-bank-account.component';
import { UpdateProductCategoryComponent } from './product-category/update-product-category/update-product-category.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { BookingOrderComponent } from './booking/booking-order/booking-order.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesOrderDetailComponent } from './sales-order/sales-order-detail/sales-order-detail.component';
import { JwtModule } from "@auth0/angular-jwt";
import { SalesInvoiceDetailComponent } from './sales-invoice/sales-invoice-detail/sales-invoice-detail.component';
import { AddNewsletterComponent } from './newsletter/add-newsletter/add-newsletter.component';
import { UpdateNewsletterComponent } from './newsletter/update-newsletter/update-newsletter.component';
import { WishlistDetailComponent } from './wishlist/wishlist-detail/wishlist-detail.component';
import { UpdatePromoComponent } from './promo/update-promo/update-promo.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    SidebarComponent,
    TopbarComponent,
    ControlSidebarComponent,
    FooterComponent,
    UserComponent,
    ProductComponent,
    ProductCategoryComponent,
    WishlistComponent,
    PromoComponent,
    BankAccountComponent,
    AddBankAccountComponent,
    UpdateBankAccountComponent,
    UpdateProductCategoryComponent,
    AddPromoComponent,
    AddProductComponent,
    UpdateProductComponent,
    BookingOrderComponent,
    NewsletterComponent,
    SalesOrderComponent,
    SalesInvoiceComponent,
    SalesOrderDetailComponent,
    SalesInvoiceDetailComponent,
    AddNewsletterComponent,
    UpdateNewsletterComponent,
    WishlistDetailComponent,
    UpdatePromoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["absdigital.id"],
        disallowedRoutes: ["http://absdigital.id/guard/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
