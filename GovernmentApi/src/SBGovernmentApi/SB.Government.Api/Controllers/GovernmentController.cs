

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SB.Government.Api.Controllers;
using SB.Government.Application;
using SB.Government.Domain;

namespace SB.Api.Controllers;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class GovernmentController : ControllerBase
{
    private readonly GovernmentEntityService _service;
    public GovernmentController(GovernmentEntityService service)
    {
        _service = service;
    }

    //[HttpGet("token")]
    //public IActionResult GetToken()
    //{
    //    var issuer = "SBIssuer";
    //    var audience = "SBAudience";
    //    var secret = "LTApM8O0WrrboE9YvQIkifeAzkT0Vg6JFEVU8uEyCxg=";

    //    var token = JwtTokenGenerator.GenerateToken(issuer, audience, secret, 7);
    //    return Ok(new { Token = token });
    //}

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null) return NotFound();
        return Ok(entity);
    }

    [HttpPost]
    public async Task<IActionResult> Create(GovernmentEntity entity)
    {
        await _service.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, GovernmentEntity entity)
    {
        if (id != entity.Id) return BadRequest();
        await _service.UpdateAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}