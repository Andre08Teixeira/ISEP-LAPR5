using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Deliveries.DTOs;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Controllers
{
    [Route("api/delivery")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly DeliveryService _service;

        public DeliveryController(DeliveryService service)
        {
            _service = service;
        }

        // GET: api/Delivery
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Delivery/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetGetById(Guid id)
        {
            var deli = await _service.GetByIdAsync(new DeliveryID(id));

            if (deli == null)
            {
                return NotFound();
            }

            return deli;
        }

        // POST: api/Delivery
        [HttpPost]
        public async Task<ActionResult<DeliveryDto>> Create(CreatingDeliveryDto dto)
        {
            try
            {
                var deli = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = deli.Id }, deli);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        
        // PUT: api/Delivery/5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(Guid id, DeliveryDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var deli = await _service.UpdateAsync(dto);
                
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
        [HttpPatch("{id}")]
        public async Task<ActionResult<DeliveryDto>> UpdateSpecific(Guid id, DeliveryDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var deli = await _service.UpdateSpecificAsync(dto);
                
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

        // Inactivate: api/Delivery/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> SoftDelete(Guid id)
        {
            var deli = await _service.InactivateAsync(new DeliveryID(id));

            if (deli == null)
            {
                return NotFound();
            }

            return Ok(deli);
        }
        
        // DELETE: api/Delivery/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DeliveryDto>> HardDelete(Guid id)
        {
            try
            {
                var deli = await _service.DeleteAsync(new DeliveryID(id));

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