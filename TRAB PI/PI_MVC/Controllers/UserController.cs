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

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /User/Delete/5

        [HttpPost]
        public ActionResult Delete(User u)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
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
