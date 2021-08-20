import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import * as xmlToJs from "xml-js";

function parseCSV(file: Blob, onLoadCallback: (data: object[]) => void) {
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = () => {
    if (!reader.result) return;
    const result = (<string>reader.result).split(/\r?\n/);
    const headers = result[0].split(",");
    const parsed = [...result.slice(0, result.length - 1)].reduce(
      (prev, next, index) => {
        if (index === 0) return [];
        const items = next
          .split(",")
          .reduce((prev: object, next: string, itemIndex: number) => {
            return {
              ...prev,
              [headers[itemIndex]]: next,
            };
          }, {});
        return [...prev, items];
      },
      [] as object[]
    );
    onLoadCallback(parsed);
  };
}

function parseXML(file: Blob, onLoadCallback: (data: object[]) => void) {
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = () => {
    var result = xmlToJs.xml2json(<string>reader.result, {
      compact: false,
      spaces: 4,
    });
    onLoadCallback(
      JSON.parse(result).elements[0].elements.reduce(
        (prev: object[], next: any) => {
          return [
            ...prev,
            {
              // TODO: Automate this part below.
              Reference: next.attributes.reference,
              ["Account Number"]: next.elements[0].elements[0].text,
              Description: next.elements[1].elements[0].text,
              ["Start Balance"]: next.elements[2].elements[0].text,
              ["Mutation"]: next.elements[3].elements[0].text,
              ["End Balance"]: next.elements[4].elements[0].text,
            },
          ];
        },
        [] as object[]
      )
    );
  };
}

@Component({
  selector: "file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
})
export class FileUploadComponent implements OnInit {
  @Output() importedCSV = new EventEmitter();
  @Output() importedXML = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // TODO: add correct fileInputEvent type
  uploadInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];

    if (file.type === "text/xml") {
      parseXML(fileInputEvent.target.files[0], (data) => {
        this.importedXML.emit(data);
      });
    }
    if (file.type === "text/csv") {
      parseCSV(fileInputEvent.target.files[0], (data) => {
        this.importedCSV.emit(data);
      });
    }
  }
}
