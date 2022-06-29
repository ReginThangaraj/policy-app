using FullStackTest.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullStackTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoliciesController : ControllerBase
    {
        private readonly IPolicyRepository _policyRepository;

        public PoliciesController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }

        [HttpGet]
        public IEnumerable<Policy> Get()
        {
            return _policyRepository.Get();
        }

        [HttpPost]
        public void Create([FromBody] Policy policy)
        {
            _policyRepository.Add(policy);
        }

        [HttpPut]
        public void Update([FromBody] Policy policy)
        {
            _policyRepository.Update(policy);
        }

        [HttpDelete("{policyNumber}")]
        public void Delete(int policyNumber)
        {
            _policyRepository.Remove(policyNumber);
        }
    }
}
