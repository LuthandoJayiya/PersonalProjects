﻿namespace MELLBankRestAPI.AuthModels
{
    public class ApplicationUserModel
    {
        public string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public string? Password { get; set; }
    }
}
