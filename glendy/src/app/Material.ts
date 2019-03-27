import {MatButtonModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  imports: [MatButtonModule,MatButtonToggleModule,MatSortModule,MatSelectModule,MatChipsModule,MatStepperModule,
    MatProgressSpinnerModule,MatPaginatorModule, MatTabsModule,MatListModule,MatSnackBarModule,MatRadioModule,
    MatDividerModule,MatDialogModule,MatInputModule, MatCheckboxModule,MatGridListModule,MatSlideToggleModule,
    MatIconModule,MatMenuModule,MatToolbarModule,MatCardModule,MatSidenavModule,MatTableModule],
  
  exports: [MatButtonModule,MatButtonToggleModule,MatSortModule,MatSelectModule,MatChipsModule,MatStepperModule,
    MatProgressSpinnerModule,MatPaginatorModule, MatTabsModule,MatListModule,MatSnackBarModule,MatRadioModule,
    MatDividerModule,MatDialogModule,MatInputModule, MatCheckboxModule,MatGridListModule,MatSlideToggleModule,
    MatIconModule,MatMenuModule,MatToolbarModule,MatCardModule,MatSidenavModule,MatTableModule],
})
export class MaterialModule { }