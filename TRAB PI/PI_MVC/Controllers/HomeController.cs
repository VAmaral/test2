using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PI_MVC.Models;
using WebGarden_PI.Model;
using PI_MVC.Models.DTO;

namespace PI_MVC.Controllers
{
    public class HomeController : Controller
    {

        readonly IRepository _repo;
        readonly IUserRepository _userRepo;

        public HomeController()
        {
            _repo = RepoLocator.Get();
            _userRepo = RepoLocator.GetUsers();
        }

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

        [HttpGet]
        public JsonResult Search(string term)
        {
            term = term.Trim().ToLower();

            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            var searchReturn = new System.Collections.Generic.List<SearchDTO>();
            var searchReturnBoard = new System.Collections.Generic.List<SearchDTO>();
            var searchReturnList = new System.Collections.Generic.List<SearchDTO>();
            var searchReturnCard = new System.Collections.Generic.List<SearchDTO>();

            //Realiza a pesquisa nos boards
            foreach (var board in _repo.GetAllBoard())
            {
                if (board.Name.ToLower().Contains(term))
                {
                    searchReturnBoard.Add(new SearchDTO { label = board.Name, category = "Boards", url = string.Format("{0}", Url.Action("Details", "Board", new { id = board.Id })) });
                }

                //Realiza a pesquisa nas listas dos boards
                foreach (var list in _repo.GetAllListsExceptArchive(board.Id))
                {
                    if (list.Name.ToLower().Contains(term))
                    {
                        searchReturnList.Add(new SearchDTO { label = list.Name, category = "Lists", url = string.Format("{0}", Url.Action("Edit", "List", new { board = board.Id, list = list.Id })) });
                    }

                    //Realiza a pesquisa nos cartões das listas dos boards
                    foreach (var card in _repo.GetAllCards(board.Id, list.Id))
                    {
                        if (card.Name.ToLower().Contains(term))
                        {
                            searchReturnCard.Add(new SearchDTO { label = card.Name, category = "Cards", url = string.Format("{0}", Url.Action("Edit", "Card", new { board = board.Id, list = list.Id, id = card.Id })) });
                        }
                    }
                }
            }

            searchReturn.InsertRange(0, searchReturnCard);
            searchReturn.InsertRange(0, searchReturnList);
            searchReturn.InsertRange(0, searchReturnBoard);

            //Constrói resposta em JSON
            JsonResult data = new JsonResult();
            data.ContentEncoding = System.Text.Encoding.UTF8;
            data.ContentType = "json";
            data.JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet;
            data.Data = serializer.Serialize(searchReturn);
            return data;
        }
    }
}
