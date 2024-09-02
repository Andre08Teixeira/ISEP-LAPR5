using DDDSample1.Domain.Warehouse;
using DDDSample1.Domain.Shared;

using System;


namespace DDDSample1.Domain.Deliveries{
    public class Delivery :Entity<DeliveryID>,IAggregateRoot
    {
/* 
• Identificador da entrega, ex., “220909/1” v.o
• Data da Entrega (dia, mês, ano)
• Massa da entrega (em kg, associada ao peso dos produtos a entregar)
• Armazém para efetuar a entrega: identificador da loja
• Tempo para colocar uma entrega no camião (em minutos)
• Tempo para retirar a entrega do camião (em minutos)
*/

        public Date delivery_date {get; private set;}

        public Weight weight{get; private set;}

        public WarehouseID deliverywarehouseID{get; private set;}

        public PutTruckTime put_truck_time {get; private set;}

        public RemoveTruckTime remove_Truck_time {get; private set;}
        public bool Active{ get;  private set; }

        public Delivery(){
            this.Active=true;
        }
        
        public Delivery (int dia, int mes, int ano, double weight, WarehouseID delivery_warehouse, int put_truck_time, int remove_truck_time){
            this.Id = new DeliveryID(Guid.NewGuid());
            this.delivery_date= new Date(dia,mes,ano);
            this.weight = new Weight(weight);
            this.deliverywarehouseID = delivery_warehouse;
            this.put_truck_time = new PutTruckTime(put_truck_time);
            this.remove_Truck_time = new RemoveTruckTime(remove_truck_time);
            this.Active=true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void changeWeight(double weight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the weight to an inactive delivery.");
            this.weight = new Weight(weight);
        }

        public void changeWarehouseId(WarehouseID warehouseID)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the warehouse of an inactive delivery.");
       /*     if (warehouseID == null)
                throw new BusinessRuleValidationException("Every delivery requires a delivery warehouse.");*/
            this.deliverywarehouseID = warehouseID;
        }
        public void changePutTruckTime(int PutTruckTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the time to put in truck to an inactive delivery.");
            this.put_truck_time = new PutTruckTime(PutTruckTime);
        }
         public void changeRemoveTruckTime(int RemoveTruckTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the time to remove delivery from truck to an inactive delivery.");
            this.remove_Truck_time = new RemoveTruckTime(RemoveTruckTime);
        }
        public void changeDeliveryDate(int dia, int mes, int ano)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the time to remove delivery from truck to an inactive delivery.");
            this.delivery_date = new Date(dia,mes,ano);
        }
    }
}
