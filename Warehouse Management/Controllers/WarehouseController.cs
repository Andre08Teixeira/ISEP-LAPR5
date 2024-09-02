using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Warehouse;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Controllers
{

    [Route("api/warehouse")]
    [ApiController]

    public class WarehouseController : ControllerBase
    {
            private readonly WarehouseService _service;

            public WarehouseController(WarehouseService service)
        {
            _service = service;
        }

        // GET: api/Warehouse
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseDTO>>> GetAll()
        {
            return  await _service.GetAllAsync();
        }

         // GET: api/Warehouse/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDTO>> GetGetById(String id)
        {
            var warehouse = await _service.GetByIdAsync(new WarehouseID(id));

            if (warehouse== null)
            {
                return NotFound();
            }

            return warehouse;
        }

        
        // POST: api/Warehouse/5
        [HttpPost]
        public async Task<ActionResult<WarehouseDTO>> Create(WarehouseDTO dto)
        {
            try
            {
                var warehouse = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = warehouse.Id }, warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/Warehouse/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WarehouseDTO>> Update(String id, WarehouseDTO dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var warehouse = await _service.UpdateAsync(dto);
                
                if (warehouse == null)
                {
                    return NotFound();
                }
                return Ok(warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Warehouse/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WarehouseDTO>> SoftDelete(String id)
        {
            System.Diagnostics.Debug.WriteLine("This is a log");
            var deli = await _service.InactivateAsync(new WarehouseID(id));

            if (deli == null)
            {
                return NotFound();
            }

            return Ok(deli);
        }
        
        // DELETE: api/Delivery/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<WarehouseDTO>> HardDelete(String id)
        {
            try
            {
                var deli = await _service.DeleteAsync(new WarehouseID(id));

                if (deli == null)
                {
                    return NotFound();
                }

                return Ok(deli);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        } 
    
    }
}