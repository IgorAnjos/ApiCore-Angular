using System;
using System.Linq;
using CrudAPICore.Data;
using CrudAPICore.Model;
using Microsoft.AspNetCore.Mvc;

namespace CrudAPICore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly DataContext _dbContext;

        public ClienteController(DataContext dataContext)
        {
            this._dbContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var result = _dbContext.Clientes.Where(_ => _.Ativo == true).ToList();
                return Ok(result);
            }
            catch (Exception errGetAll)
            {
                return BadRequest($"Error: {errGetAll.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var result = _dbContext.Clientes.Where(_ => _.Ativo == true).First(_ => _.Id == id);
                return Ok(result);
            }
            catch (Exception errGetId)
            {
                return NotFound($"Error: {errGetId.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            try
            {
                Cliente c = new Cliente();
                c.Nome = cliente.Nome;
                c.Ativo = true;
                c.CreatedOn = DateTime.Now;

                _dbContext.Clientes.Add(c);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch(Exception errPost)
            {
                return BadRequest($"Error: {errPost.Message}");
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Cliente cliente)
        {
            if (cliente.Id > 0)
            {
                try
                {
                    var c = _dbContext.Clientes.First(_ => _.Id == cliente.Id);
                    
                    c.Nome = cliente.Nome;
                    
                    _dbContext.SaveChanges();

                    return Ok();
                }
                catch (Exception errPut)
                {
                    return NotFound($"Error: {errPut.Message}");
                }   
            }else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var c = _dbContext.Clientes.First(_ => _.Id == id);

                c.Ativo =false;
                c.DeletedOn = DateTime.Now;
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception errDelete)
            {
                return NotFound($"Error: {errDelete}");
            }
        }
    }
}