namespace Application.UnitTests.TestUtils.Constants;

public static partial class Constants
{
    public static class Authentication
    {
        public const string Email = "email@email.com";
        public const string Password = "password";
        public const string CorrectPasswordHash = "$2a$12$5Usm27NZeHNREb/r7xQpLuNOqVqxzrLor/nUXx6ia35JxpId/09AG";
        public const string WrongPasswordHash = "$2a$12$kYjwqxC8qAr6Mlhq0kwAR.zM7ijGxYaL.fGC2EGyaFiHDZftHj1e2";
        public const string Username = "username";
        public const string Token = "token";
        public static readonly Guid UserIdClaim = Guid.NewGuid();
    }
}