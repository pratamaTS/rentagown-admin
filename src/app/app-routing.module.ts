import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PromoComponent } from './promo/promo.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { AddBankAccountComponent } from './bank-account/add-bank-account/add-bank-account.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateBankAccountComponent } from './bank-account/update-bank-account/update-bank-account.component';
import { UpdateProductCategoryComponent } from './product-category/update-product-category/update-product-category.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';

const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'master-user', component: UserComponent },
  { path: 'master-product', component: ProductComponent },
  { path: 'master-product-category', component: ProductCategoryComponent },
  { path: 'master-wishlist', component: WishlistComponent },
  { path: 'master-promo', component: PromoComponent },
  { path: 'master-bank-account', component: BankAccountComponent },
  { path: 'add-bank-account', component: AddBankAccountComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-bank-account/:id', component: UpdateBankAccountComponent },
  { path: 'update-product-category/:id', component: UpdateProductCategoryComponent },
  { path: 'update-product/:id', component: UpdateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
