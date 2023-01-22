import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';


import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';


const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatInputModule
];

const components = [ErrorDialogComponent, MiniCartComponent];

@NgModule({
  declarations: [components],
  imports: [ReactiveFormsModule, CommonModule, materialModules],
  exports: [materialModules, components],
})
export class SharedModule {}
