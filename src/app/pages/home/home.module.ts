import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from './../../shared/shared.module';
import { CartModule } from './cart/cart.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PdpComponent } from './pdp/pdp.component';

const components = [HomeComponent, PdpComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    CartModule
  ],
  exports: [...components],
})
export class HomeModule {}
