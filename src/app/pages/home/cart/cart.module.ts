import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CartService } from './../../../shared/services/cart/cart.service';
import { SharedModule } from './../../../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { ResumeComponent } from './resume/resume.component';


@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [CartService]
})
export class CartModule { }
