using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using PI_MVC.Infrastructure;
using PI_MVC.Models;
using WebGarden_PI.Model;


namespace PI_MVC.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        IUserRepository _userRepo = RepoLocator.GetUsers();

        public ActionResult Profile(string userId)
        {
            if (userId != null)
            {
                if (_userRepo.GetUser(User.Identity.Name).Role.Equals("admin"))
                {
                    ViewData["Role"] = "admin"; 
                }
            }
            else
            {
                userId = User.Identity.Name;
            }
            ViewData["user"] = userId;

            return View(_userRepo.GetUser(userId));
        }

        //
        // GET: /User/Edit/5

        public ActionResult EditProfile(string userId)
        {
            return View(_userRepo.GetUser(userId));
        }

        //
        // POST: /User/Edit/5

        [HttpPost]
        public ActionResult EditProfile(string userId, User u)
        {
            u.NickName = User.Identity.Name;
            _userRepo.UpdateUser(u);
            return RedirectToAction("Profile");
        }

        //
        // GET: /User/Delete/5

        public ActionResult Delete(string userId)
        {
            _userRepo.DeleteUser(_userRepo.GetUser(userId));
            if (userId.Equals(User.Identity.Name))
            {
                FormsAuthentication.SignOut();
               return RedirectToAction("Index", "Home");
            }
            return RedirectToAction("ManageUser", "Account");

        }

        [AuthorizationFilter("admin")]
        public ActionResult ChangeRole(string userId)
        {
            _userRepo.ChangeUserRole(userId);    
             //return RedirectToAction("ManageUsers", "Account");
             return RedirectToAction("Profile", new { userId = userId });
        }
    }
}
