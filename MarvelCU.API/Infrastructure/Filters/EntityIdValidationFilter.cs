using MarvelCU.Dal;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MarvelCU.API.Infrastructure.Filters
{
    public class EntityIdValidationFilter<T> : IAsyncActionFilter where T : BaseEntity
    {
        private readonly IRepository<T> _repository;

        public EntityIdValidationFilter(IRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            int id = default;

            if (context.ActionArguments.ContainsKey("id"))
            {
                id = (int)context.ActionArguments["id"];
            }

            var entity = await _repository.GetAsync(id);

            if (entity is null)
            {
                context.Result = new NotFoundResult();
                return;
            }

            context.HttpContext.Items.Add("Entity", entity);

            await next();
        }
    }

    public class EntityIdValidationFilter<T, E> : IAsyncActionFilter where T : BaseEntity where E : BaseEntity
    {
        private readonly IRepository<T> _repository;
        private readonly IRepository<E> _entityRepository;

        public EntityIdValidationFilter(
            IRepository<T> repository, 
            IRepository<E> entityRepository
            )
        {
            _repository = repository;
            _entityRepository = entityRepository;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            int id = default;
            int entityId = default;

            if (context.ActionArguments.ContainsKey("id"))
            {
                id = (int)context.ActionArguments["id"];
            }

            if (context.ActionArguments.ContainsKey("entityId"))
            {
                entityId = (int)context.ActionArguments["entityId"];
            }

            var entity = await _repository.GetAsync(id);
            var entityToAdd = await _entityRepository.GetAsync(entityId);

            if (entity is null || entityToAdd is null)
            {
                context.Result = new NotFoundResult();
                return;
            }

            context.HttpContext.Items.Add("Entity", entity);

            await next();
        }
    }
}
