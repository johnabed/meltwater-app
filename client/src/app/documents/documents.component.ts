import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  censorList = [];
  originalDocument = '';
  modifiedDocument = '';
  caseSensitive = true;

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      censored: ['', Validators.required],
      document: ['', Validators.required],
      caseSensitive: [true]
    });
  }

  onSubmit(censored: string, document: string, caseSensitive: boolean) {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    // Create censor list to parse document text
    this.createCensors(censored);

    // Parse document text
    this.originalDocument = document;
    this.modifiedDocument = document;
    this.caseSensitive = caseSensitive;

    for (let i = 0; i < this.censorList.length; i++) {
      // OPTIONAL: Creates censor mask to replace in document text ("Hello World" => "XXXXX XXXXX")
      // const replacementString = this.censorList[i].replace(/\S/g, 'X');

      // If capitalization is not important we turn on i flag to ignore case
      const flags = this.caseSensitive ? 'g' : 'gi';
      // Censor every occurrence of String in text with 'XXXX'
      this.modifiedDocument = this.modifiedDocument.replace(new RegExp('\\b' + this.censorList[i] + '\\b', flags), 'XXXX');
    }

    this.success = true;

  }

  createCensors(str: string) {
    // Extract words and phrases using Regular Expressions
    this.censorList = str.match(/(["'][^("|')]+["']|[^,"'\s]+)/g);

    // Remove single and double quotations from being stored in censorList arr
    this.censorList.forEach(function(value, index) {
      this[index] = value.replace(/^["']([^"']+)["']$/, '$1');
    }, this.censorList);
  }

  ngOnInit() {
  }

}
