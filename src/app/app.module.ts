import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [AppComponent, FileUploadComponent, TransactionReportComponent, TableComponent],
  imports: [BrowserModule, MaterialModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
