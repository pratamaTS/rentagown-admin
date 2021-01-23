import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
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
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
