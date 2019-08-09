import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styles: []
})
export class TemplateDrivenFormComponent implements OnInit {

  constructor() { }
  public bookTile:string;
  public bookAuthor:string;
  public bookNoOfPages:number;
  ngOnInit() {
  }

  onSubmit(form){
    console.log(form.value);
  }
}
