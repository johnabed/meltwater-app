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

  censors = [];

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      censored: ['', Validators.required],
      document: ['', Validators.required]
    });
  }

  onSubmit(censored: string, document: string) {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    // Create censor list to parse document text
    this.createCensors(censored);
    console.log(this.censors);

    // Parse document text


    this.success = true;

  }

  createCensors(str: string) {
    // Extracts words and phrases uses Regular Expressions
    this.censors = str.match(/(("|')[^("|')]+("|')|[^("|')\s]+)/g);

    // Removes two sets of quotations surrounding one entry in the censors
    this.censors.forEach(function(value, index) {
      this[index] = value.replace(/^"([^"]+)"$/, '$1'); // todo: Implement for single quote
    }, this.censors);
  }

  ngOnInit() {
  }

}
