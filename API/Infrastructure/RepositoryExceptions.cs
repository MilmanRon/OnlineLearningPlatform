namespace API.Infrastructure
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(string entityName, Guid entityId)
            : base($"Entity {entityName} with id {entityId} was not found.") { }

    }


}
