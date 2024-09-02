import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Warehouse Tracker";

  constructor() { }

  ngOnInit(): void { // fazer requests basicamente
  }

  toogleAddTask(){
    console.log("welele");
  }
}
