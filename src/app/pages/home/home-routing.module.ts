import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { PdpComponent } from './pdp/pdp.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'product/:id',
        component: PdpComponent
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
