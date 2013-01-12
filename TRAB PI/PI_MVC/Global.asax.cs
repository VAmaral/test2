using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using PI_MVC.Models;
using WebGarden_PI.Model;

namespace PI_MVC
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

            routes.MapRoute(
                "ListDetails", // Route name
                "Board/Details/{board}/{controller}/{action}/{id}", // URL with parameters  - action= details/delete
                new { controller = "List", action = "Details" }, new {id = @"\d" } // Parameter defaults
            );

            routes.MapRoute(
                "CardDetails", // Route name
                "Board/Details/{board}/List/Details/{list}/{controller}/{action}/{id}", // URL with parameters  - action= details/delete
                new { controller = "Card", action = "Details" }, new {id=@"\d" } // Parameter defaults
            );

        }

        protected void Application_Start()
        {
            IUserRepository _userRepo = RepoLocator.GetUsers();
            IRepository _repo = RepoLocator.Get();
            int endDate = RepoLocator.GetEndDate();
            _userRepo.CreateUser(new User
            {
                Name = "Patrick Costa",
                NickName = "patrick",
                Email = "32294@alunos.isel.pt",
                Password = "123456",
                Role = "admin"
            });
            _userRepo.CreateUser(new User
            {
                Name = "Nuno Assunção",
                NickName = "nuno",
                Email = "29199@alunos.isel.pt",
                Password = "password",
                Role = "user"
            });
            _userRepo.CreateUser(new User
            {
                Name = "Vitor",
                NickName = "vitor",
                Email = "29167@alunos.isel.pt",
                Password = "123456",
                Role = "user"
            });
            _userRepo.AddBoard(new Board {Name = "PI",Description = "Quadro sobre PI" }, "patrick");//id 1
            _repo.AddList(1, new List { Name = "ToDo" });
            _repo.AddList(1, new List {Name = "Doing" });
            _repo.AddCard(1,2,new Card {Name = "Java",Description ="JavaScript",BeginDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(endDate) });
            _userRepo.AddBoard(new Board {Name = "AVE",Description = "Quadro sobre AVE"}, "vitor");
            _userRepo.AddBoard(new Board { Name = "PC", Description = "Quadro sobre PC" }, "patrick");
            
            // Use LocalDB for Entity Framework by default
            //Database.DefaultConnectionFactory = new SqlConnectionFactory(@"Data Source=(localdb)\v11.0; Integrated Security=True; MultipleActiveResultSets=True");

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
        }
    }
}