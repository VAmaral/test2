using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using PI_MVC.Models;
using PI_MVC.Models.DTO;
using WebGarden_PI.Model;

namespace PI_MVC.Controllers
{
    
    public class CardController : Controller
    {

        readonly IRepository _repo;
        readonly IUserRepository _userRepo;
        string currUser;
        public CardController()
        {
            _repo = RepoLocator.Get();
            _userRepo = RepoLocator.GetUsers();
        }
       

        //
        // GET: /Card/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Card/Details/5

        public ActionResult Details(string board, string list, string id)
        {
            currUser = User.Identity.Name;
            int bid = int.Parse(board);
            int lid = int.Parse(list);
            int cid = int.Parse(id);
            if (!_userRepo.HasBoard(bid,currUser))
                return new HttpNotFoundResult("Erro");
            
            CardDetailsDTO dto = new CardDetailsDTO();

            if (_userRepo.BoardOnlyVis(bid,currUser))
            {
                dto.IsOwned = false;
                dto.IsVisual = true;
                dto.SingleCard = new Pair(_userRepo.GetVis(bid,currUser).First, _repo.GetCard(bid, lid, cid));
            }
            if (_userRepo.BoardOnlyEdit(bid,currUser))
            {
                dto.IsOwned = false;
                dto.IsVisual = false;
                dto.SingleCard = new Pair(_userRepo.GetEdit(bid,currUser).First, _repo.GetCard(bid, lid, cid));
            }
            else
            {
                dto.IsOwned = true;
                dto.IsVisual = false;
                dto.SingleCard = new Pair(currUser, _repo.GetCard(bid, lid, cid));
            }
           
            return View(dto);
        }

        //
        // GET: /Card/Create

        public ActionResult Create(int board, int list)
        {
            string s=_repo.GetAllCardNames(board, list);
            ViewData["UserCardNames"] = s;
            return View();
        } 

        //
        // POST: /Card/Create

        [HttpPost]
        public ActionResult Create(string board, string list, Card card)
        {
            if (_repo.AddCard(int.Parse(board), int.Parse(list), card))
                return RedirectToAction("Details", "Board", new { id = board });
            return new HttpNotFoundResult("Erro");
        }
        
        //
        // GET: /Card/Edit/5
 
        public ActionResult Edit(string board, string list, string id)
        {
            currUser = User.Identity.Name;
            int bid = int.Parse(board);
            int lid = int.Parse(list);
            int cid = int.Parse(id);
            Card c = _repo.GetCard(bid, lid, cid);
            if (c == null) return new HttpNotFoundResult("O Cartão não existe");
            CardDetailsDTO cardDto= new CardDetailsDTO();
            cardDto.Board = board;
            cardDto.List = list;
            cardDto.SingleCard = new Pair(currUser, c);
            cardDto.IsOwned = _userRepo.IsUserBoard(bid, currUser);
            cardDto.IsVisual = _userRepo.BoardOnlyVis(bid, currUser);
            ViewData["UserCardNames"] = _repo.GetAllCardNames(bid, lid);
            return View(cardDto);
        }

        //
        // POST: /Card/Edit/5

        [HttpPost]
        public ActionResult Edit(string board, string list,string cId, Card c)
        {
            c.Id= int.Parse(cId);
            if (_repo.SubCard(int.Parse(board), int.Parse(list), c))
                //return View("Board", "Details", board);
                return RedirectToAction("Details", "Card", new { board = board,list = list, id = c.Id});
            return new HttpNotFoundResult("Error");
        }

        //
        // GET: /Card/Delete/5
 
        public ActionResult Delete(string board, string list, string id)
        {
            return View(board, list, id);
        }

        //
        // POST: /Card/Delete/5

        [HttpPost]
        public ActionResult Delete(string board, string list, Pair card)
        {
            if ((bool)card.First)
            {
                _repo.DeleteCard(int.Parse(board), int.Parse(list), (int)card.Second);
                return View("Board", "Details", board);
            }
            return new HttpNotFoundResult("Erro");
        }
    }
}
