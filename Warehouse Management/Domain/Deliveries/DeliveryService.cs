using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Deliveries.DTOs;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouse;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        //readondly significa que esta referencia
        //estara sempre ligada ao mesmo objeto, a instancia pode ser modificada
        //mas impede a instancia de ser mudar o tipo ?

        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;
        private readonly IWarehouseRepository _repoWarehouse;



        public DeliveryService(IUnitOfWork unitOfWork,IDeliveryRepository repo, IWarehouseRepository repoWarehouse){

            this._unitOfWork= unitOfWork;
            this._repo = repo;
            this._repoWarehouse = repoWarehouse;

        }


        //Get all deliveries 
        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            
            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>(deli => 
                new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time));

            return listDto;
        }

        
        //Get delivery by ID
        public async Task<DeliveryDto> GetByIdAsync(DeliveryID id)
        {
            var deli = await this._repo.GetByIdAsync(id);
            
            if(deli == null)
                return null;

            return new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time);
        }
         
        //Add a delivery
        public async Task<DeliveryDto> AddAsync(CreatingDeliveryDto dto)
        {
             
            await checkWarehouseIdAsync(new WarehouseID(dto.deliverywarehouseID));
   
            var deli = new Delivery(dto.dia,dto.mes,dto.ano,dto.weight,new WarehouseID(dto.deliverywarehouseID),dto.put_truck_time,dto.remove_Truck_time);

            await this._repo.AddAsync(deli);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time);
        }


        //Update an existing delivery
        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            await checkWarehouseIdAsync(new WarehouseID(dto.deliverywarehouseID));
            var deli = await this._repo.GetByIdAsync(new DeliveryID(dto.Id)); 

            if (deli == null)
                return null;   

            // change all fields
            deli.changeWarehouseId(new WarehouseID(dto.deliverywarehouseID));
            deli.changeWeight(dto.weight);
            deli.changePutTruckTime(dto.put_truck_time);
            deli.changeRemoveTruckTime(dto.remove_Truck_time);
            deli.changeDeliveryDate(dto.dia,dto.mes,dto.ano);
            
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time);
        }
        //Update an existing delivery
        public async Task<DeliveryDto> UpdateSpecificAsync(DeliveryDto dto)
        {
         await checkWarehouseIdAsync(new WarehouseID(dto.deliverywarehouseID));
            var deli = await this._repo.GetByIdAsync(new DeliveryID(dto.Id)); 

            if (deli == null)
                return null;   

            // change some fields
            deli.changeWarehouseId(new WarehouseID(dto.deliverywarehouseID));
            
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time);
        }

        //Inactivate a delivery
        public async Task<DeliveryDto> InactivateAsync(DeliveryID id)
        {
            var deli = await this._repo.GetByIdAsync(id); 

            if (deli == null)
                return null;   

            deli.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time);
        }


        //Delete a delivery
        public async Task<DeliveryDto> DeleteAsync(DeliveryID id)
        {
            var deli = await this._repo.GetByIdAsync(id); 

            if (deli == null)
                return null;   

            if (deli.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active delivery.");
            
            this._repo.Remove(deli);
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(),deli.delivery_date.dia,deli.delivery_date.month,deli.delivery_date.year,deli.weight.weight, deli.deliverywarehouseID.AsString(),deli.put_truck_time.time,deli.remove_Truck_time.time);
        }

        //Check if the delivery warehouse actually exists
        private async Task checkWarehouseIdAsync(WarehouseID warehouseID)
        {
           var warehouse = await _repoWarehouse.GetByIdAsync(warehouseID);
           if (warehouse == null)
                throw new BusinessRuleValidationException("Invalid warehouse Id.");
        }
    }
}