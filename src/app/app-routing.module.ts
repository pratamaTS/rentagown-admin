import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { BookingOrderComponent } from './booking/booking-order/booking-order.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PromoComponent } from './promo/promo.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { AddBankAccountComponent } from './bank-account/add-bank-account/add-bank-account.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { AddNewsletterComponent } from './newsletter/add-newsletter/add-newsletter.component';
import { UpdateBankAccountComponent } from './bank-account/update-bank-account/update-bank-account.component';
import { UpdateProductCategoryComponent } from './product-category/update-product-category/update-product-category.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { UpdatePromoComponent } from './promo/update-promo/update-promo.component';
import { UpdateNewsletterComponent } from './newsletter/update-newsletter/update-newsletter.component';
import { SalesOrderDetailComponent } from './sales-order/sales-order-detail/sales-order-detail.component';
import { SalesInvoiceDetailComponent } from './sales-invoice/sales-invoice-detail/sales-invoice-detail.component';
import { InventoryStock } from './inventory-stock/product.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgotpass/forgotpass.component';

import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'master-user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'master-product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'master-product-category', component: ProductCategoryComponent, canActivate: [AuthGuard] },
  { path: 'master-wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'master-newsletter', component: NewsletterComponent, canActivate: [AuthGuard] },
  { path: 'master-promo', component: PromoComponent, canActivate: [AuthGuard] },
  { path: 'master-bank-account', component: BankAccountComponent, canActivate: [AuthGuard] },
  { path: 'booking-order', component: BookingOrderComponent, canActivate: [AuthGuard] },
  { path: 'sales-order', component: SalesOrderComponent, canActivate: [AuthGuard] },
  { path: 'sales-invoice', component: SalesInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'add-bank-account', component: AddBankAccountComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'add-promo', component: AddPromoComponent, canActivate: [AuthGuard] },
  { path: 'add-newsletter', component: AddNewsletterComponent, canActivate: [AuthGuard] },
  { path: 'update-bank-account/:id', component: UpdateBankAccountComponent, canActivate: [AuthGuard] },
  { path: 'update-product-category/:id', component: UpdateProductCategoryComponent, canActivate: [AuthGuard] },
  { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'update-promo/:id', component: UpdatePromoComponent, canActivate: [AuthGuard] },
  { path: 'update-newsletter/:id', component: UpdateNewsletterComponent, canActivate: [AuthGuard] },
  { path: 'sales-order-detail/:id', component: SalesOrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'sales-invoice-detail/:id', component: SalesInvoiceDetailComponent, canActivate: [AuthGuard] },
  { path: 'inventory-stock', component: InventoryStock, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgot', component: ForgotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
