import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-transaction-report",
  templateUrl: "./transaction-report.component.html",
  styleUrls: ["./transaction-report.component.css"],
})
export class TransactionReportComponent implements OnInit {
  @Input() generateReportClicked: boolean;
  @Input() duplicateReferences: string[];
  @Input() invalidTransactionReferences: string[];

  constructor() {}

  ngOnInit(): void {}
}
