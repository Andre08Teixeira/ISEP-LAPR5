using System;
using DDDSample1.Domain.Warehouse;


namespace DDDSample1.Domain.Deliveries.DTOs
{
    public class DeliveryDto
    {
        public Guid Id { get; set; }

         public int dia {get; private set;}

        public int mes {get; private set;}

        public int ano {get; private set;}

        public double weight{get; private set;}

        public String deliverywarehouseID{get; private set;}

        public int put_truck_time {get; private set;}

        public int remove_Truck_time {get; private set;}


        public DeliveryDto(Guid Id,int dia,int mes,int ano, double weight, String deliverywarehouseID, int put_truck_time, int remove_Truck_time)
        {
            this.Id = Id;
            this.dia = dia;
            this.mes = mes;
            this.ano =ano;
            this.weight = weight;
            this.deliverywarehouseID = deliverywarehouseID;
            this.put_truck_time = put_truck_time;
            this.remove_Truck_time = remove_Truck_time;
        }
    }
}