using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PI_MVC.Models;
using WebGarden_PI.Model;



namespace PI_MVC.Controllers
{
    public class HomeController : Controller
    {

        IUserRepository _userRepo = RepoLocator.GetUsers();

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }


        public ActionResult SendMail(string userId)
        {
            return View(_userRepo.GetUser(userId));
        }

        public ActionResult Validate(string Id)
        {
            return View(_userRepo.ChangeUserRole(Id));
        }

    }
}
