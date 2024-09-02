import { Component,OnInit,Input } from '@angular/core';
import { Planning } from '../planning';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanningService } from '../planning.service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-planning-detail',
  templateUrl: './planning-detail.component.html',
  styleUrls: ['./planning-detail.component.css']
})
export class PlanningDetailComponent implements OnInit{
/*
  constructor(
    private route: ActivatedRoute,
    private planningService: PlanningService,
    private location: Location
  ) {}

getPlanning():void{

  const id = String(this.route.snapshot.paramMap.get('id')!);
  this.planningService.getPlanning(id)
    .subscribe((planning) => this.planning = planning);

}
*/
ngOnInit(): void {
 // this.getPlanning();
}
goBack(): void {
//  this.location.back();
}

  @Input() planning?: Planning;
}
