namespace API.Application
{
    public class UserAlreadyExistsException : Exception
    {
        public UserAlreadyExistsException(string email)
            : base($"User with email '{email}' already exists.") { }
    }

    public class NoMatchingEmailException : Exception
    {
        public NoMatchingEmailException(string email)
            : base($"User with email '{email}' was not found.") { }
    }

    public class PasswordDoesntMatchException : Exception
    {
        public PasswordDoesntMatchException()
            : base($"Invalid password") { }
    }

    public class EntityAlreadyExistsException : Exception
    {
        public EntityAlreadyExistsException(string entityName, Guid id)
            : base($"Entity {entityName} with id {id} already exists.") { }

    }

    public class DuplicateNameException : Exception
    {
        public DuplicateNameException(string entityName, string duplicateName)
            : base($"An entity of type '{entityName}' with name '{duplicateName}' already exists.") { }
    }



}
