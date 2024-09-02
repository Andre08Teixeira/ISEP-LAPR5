import { Component, OnInit } from '@angular/core';
import { Planning } from '../planning';
import { PlanningService } from '../planning.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plannings',
  templateUrl: './plannings.component.html',
  styleUrls: ['./plannings.component.css']
})
export class PlanningsComponent implements OnInit{

  plannings: Planning[] = [];


constructor(private planningService: PlanningService, private messageService: MessageService, private location:Location){}


ngOnInit(): void {
  this.getPlannings();
}

getPlannings(): void {
  this.planningService.getPlannings()
  .subscribe((plannings) => this.plannings = plannings);
}
goBack(): void {
  this.location.back();
}

}
