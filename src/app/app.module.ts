import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import localeEsMX from '@angular/common/locales/es-MX';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './challenge/tasks/tasks.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AddTaskComponent } from './challenge/add-task/add-task.component';
import { TaskHelper } from './core/helpers/taskHelper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {  MAT_DATE_FORMATS, NativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMX);


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,   
     NativeDateModule,

    CommonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    FlexLayoutModule,
    AppRoutingModule,
  
        
  ],
    
  providers: [
    TaskHelper,
    MatDatepickerModule,
    { provide: LOCALE_ID, useValue: 'es-MX' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
