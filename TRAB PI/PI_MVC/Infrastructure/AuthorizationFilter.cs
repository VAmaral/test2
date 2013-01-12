using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using PI_MVC.Models;
using WebGarden_PI.Model;

namespace PI_MVC.Infrastructure
{
    public class AuthorizationFilter : AuthorizeAttribute, IAuthorizationFilter
    {
        string roles;
        IUserRepository _userRepo = RepoLocator.GetUsers();
        public AuthorizationFilter(string roles)
        {
            this.roles = roles;
        }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            IPrincipal currUser = filterContext.HttpContext.User;
            string userName = currUser.Identity.Name;
            if (userName != "" && currUser.Identity.IsAuthenticated)
            {
                string userRoles = _userRepo.GetUser(userName).Role;

                if (roles.Equals(userRoles)) return;

            }
            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        }
    }
}