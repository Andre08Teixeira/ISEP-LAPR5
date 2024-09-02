import { Component,OnInit,Input } from '@angular/core';
import { Truck } from '../truck';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TruckService } from '../truck.service';


@Component({
  selector: 'app-truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.css']
})
export class TruckDetailComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private truckService: TruckService,
    private location: Location
  ) {}

getTruck():void{

  const registration = this.route.snapshot.paramMap.get('registration')!;
  this.truckService.getTruck(registration)
    .subscribe((truck) => this.truck = truck);

}

ngOnInit(): void {
  this.getTruck();
}
goBack(): void {
  this.location.back();
}

  @Input() truck?: Truck;
}
