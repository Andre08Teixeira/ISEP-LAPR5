import { Component,OnInit,Input } from '@angular/core';
import { Delivery } from '../delivery';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeliveryService } from '../delivery.service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.css']
})
export class DeliveryDetailComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private location: Location
  ) {}

getDelivery():void{

  const id = String(this.route.snapshot.paramMap.get('id')!);
  this.deliveryService.getDelivery(id)
    .subscribe((delivery) => this.delivery = delivery);

}

ngOnInit(): void {
  this.getDelivery();
}
goBack(): void {
  this.location.back();
}

  @Input() delivery?: Delivery;
}
