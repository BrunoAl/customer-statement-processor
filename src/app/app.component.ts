import { Component } from "@angular/core";

// TODO: add type (currently TS doesn't support Set)
const toFindDuplicates = (data: any) => {
  const duplicates = new Set(
    data.filter((item: string, index: number) => data.indexOf(item) !== index)
  );

  return [...duplicates];
};

export interface ParsedImportedFile {
  Reference: string;
  ["Account Number"]: string;
  Description: string;
  ["Start Balance"]: string;
  ["Mutation"]: string;
  ["End Balance"]: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  data: ParsedImportedFile[] = [];
  displayedColumns: string[] = [
    "Reference",
    "Account Number",
    "Description",
    "Start Balance",
    "Mutation",
    "End Balance",
  ];

  // TODO: add type (currently TS doesn't support Set)
  duplicateReferences: any[] = [];
  invalidTransactionReferences: string[] = [];
  generateReportClicked = false;

  importXML(data: ParsedImportedFile[]) {
    this.resetState();
    this.data = data;
  }

  importCSV(data: ParsedImportedFile[]) {
    this.resetState();
    this.data = data;
  }

  resetState() {
    this.duplicateReferences = [];
    this.invalidTransactionReferences = [];
    this.generateReportClicked = false;
  }

  generateReport() {
    this.resetState();
    this.generateReportClicked = true;

    this.data.forEach((item) => {
      const sum = Number(item["Start Balance"]) + Number(item["Mutation"]);
      const reportedEndBalance = Number(item["End Balance"]);
      if (Number(sum.toFixed(2)) !== Number(reportedEndBalance.toFixed(2))) {
        this.invalidTransactionReferences.push(item["Reference"]);
      }
    });

    this.duplicateReferences = toFindDuplicates(
      this.data.map((item) => item["Reference"])
    );
  }
}
