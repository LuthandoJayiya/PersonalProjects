﻿using LLJ_CarInsuranceMS_RESTAPI.AuthModels;
using Microsoft.AspNetCore.Identity;

namespace LLJ_CarInsuranceMS_RESTAPI.Services
{
    public class IdentityHelper
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly AuthenticationContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityHelper(UserManager<ApplicationUser> userManager,
            AuthenticationContext context, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
        }


        public async Task<bool> IsUserInRole(string userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            List<string> userRoles = new List<string>(await _userManager.GetRolesAsync(user));

            if (user != null)
            {
                return userRoles.Any(r => r.Equals(roleName, StringComparison.CurrentCultureIgnoreCase));
            }
            else
            {
                return false;
            }
        }


        public async Task<bool> IsSuperUserRole(string userId)
        {
            string superUserRole1 = "Administrator";

            var user = await _userManager.FindByIdAsync(userId);

            List<string> userRoles = new List<string>(await _userManager.GetRolesAsync(user));

            if (user != null)
            {
                return (userRoles.Contains(superUserRole1));
            }
            else
            {
                return false;
            }
        }
    }

}
