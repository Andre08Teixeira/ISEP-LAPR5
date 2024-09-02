using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System.Diagnostics;


namespace DDDSample1.Domain.Warehouse
{
    public class WarehouseService
    {
        //readondly significa que esta referencia
        //estara sempre ligada ao mesmo objeto, a isntancia pode ser modificada
        //mas impede a instancia de ser mudar o tipo ?
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWarehouseRepository _repo;

        public WarehouseService(IUnitOfWork unitOfWork,IWarehouseRepository repo){

            this._unitOfWork= unitOfWork;
            this._repo = repo;
            

        }


        public async Task<List<WarehouseDTO>> GetAllAsync()
        {       
            var list = await this._repo.GetAllAsync();

            Debug.WriteLine(list);

            List<WarehouseDTO> listDTO = new List<WarehouseDTO>();
            
            foreach(var warehouse in list){
                if(warehouse.Active == true){
                    listDTO.Add(new WarehouseDTO(warehouse.Id.AsString(),warehouse.designation.designation,
                warehouse.adress.street,warehouse.adress.codigoPostal,warehouse.adress.country,
                warehouse.coordinates.longitude,warehouse.coordinates.latitude,warehouse.coordinates.altitude));

                }
            }
                
            return listDTO;
        }

         public async Task<WarehouseDTO> GetByIdAsync(WarehouseID id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);
            
            if(warehouse == null)
                return null;

            return new WarehouseDTO(warehouse.Id.AsString(),warehouse.designation.designation,
                warehouse.adress.street,warehouse.adress.codigoPostal,warehouse.adress.country,
                warehouse.coordinates.longitude,warehouse.coordinates.latitude,warehouse.coordinates.altitude);
        }

         public async Task<WarehouseDTO> AddAsync(WarehouseDTO dto)
        {
             
            var warehouse = new WareHouse(dto.Id,dto.designation,
                dto.street,dto.codigoPostal,dto.country,
                dto.longitude,dto.latitude,dto.altitude);

            await this._repo.AddAsync(warehouse);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDTO(warehouse.Id.AsString(),dto.designation,
                dto.street,dto.codigoPostal,dto.country,
                dto.longitude,dto.latitude,dto.altitude);
        }

        public async Task<WarehouseDTO> UpdateAsync(WarehouseDTO dto)
        {
            await checkWarehouseIdAsync(dto.Id);
            var warehouse = await this._repo.GetByIdAsync(new WarehouseID(dto.Id)); 

            if (warehouse == null)
                return null;   

            // change all fields
            warehouse.changeDesignation(dto.designation);
            warehouse.changeAdress(dto.street,dto.codigoPostal,dto.country);
            warehouse.changeCoordinates(dto.latitude,dto.longitude,dto.altitude);
            
            await this._unitOfWork.CommitAsync();

            return new WarehouseDTO(warehouse.Id.AsString(),warehouse.designation.designation,
                warehouse.adress.street,warehouse.adress.codigoPostal,warehouse.adress.country,
                warehouse.coordinates.longitude,warehouse.coordinates.latitude,warehouse.coordinates.latitude);
        }
        
        public async Task<WarehouseDTO> InactivateAsync(WarehouseID id)
        {
            var warehouse = await this._repo.GetByIdAsync(id); 

            if (warehouse == null)
                return null;   

            warehouse.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

           return new WarehouseDTO(warehouse.Id.AsString(),warehouse.designation.designation,
                warehouse.adress.street,warehouse.adress.codigoPostal,warehouse.adress.country,
                warehouse.coordinates.longitude,warehouse.coordinates.latitude,warehouse.coordinates.latitude);
        }


        //Delete a Warehouse
        public async Task<WarehouseDTO> DeleteAsync(WarehouseID id)
        {
            var warehouse = await this._repo.GetByIdAsync(id); 

            if (warehouse == null)
                return null;   

            if (warehouse.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active delivery.");
            
            this._repo.Remove(warehouse);
            await this._unitOfWork.CommitAsync();

            return new WarehouseDTO(warehouse.Id.AsString(),warehouse.designation.designation,
                warehouse.adress.street,warehouse.adress.codigoPostal,warehouse.adress.country,
                warehouse.coordinates.longitude,warehouse.coordinates.latitude,warehouse.coordinates.latitude);
        }




         private async Task checkWarehouseIdAsync(string warehouseID)
        {   
            var WarehouseID = new WarehouseID(warehouseID);
            var warehouse = await _repo.GetByIdAsync(WarehouseID);
            if (warehouse == null)
                throw new BusinessRuleValidationException("Invalid warehouse Id.");
        }

 


        // vou implementar aqui metodos usados na interface
    }
}