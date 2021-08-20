import { Component, Input, OnInit } from "@angular/core";
import { ParsedImportedFile } from "../app.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() data: ParsedImportedFile[];
  @Input() displayedColumns: string[];

  constructor() {}

  ngOnInit(): void {}
}
