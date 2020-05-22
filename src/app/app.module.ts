import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { MonitorErrorsHandler } from '@bigtree/monitor';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MonitorModule } from '../libs/monitor.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    NzButtonModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MonitorModule.forRoot({appId: '1aade23c045230cd9a367ae2c72ce07c'})
  ],
  providers: [
    {provide: ErrorHandler, useClass: MonitorErrorsHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
