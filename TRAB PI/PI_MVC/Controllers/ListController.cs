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
    public class ListController : Controller
    {

         readonly IRepository _repo;
         readonly IUserRepository _userRepo;
        string currUser;
        
        public ListController(){
             _repo = RepoLocator.Get();
             _userRepo = RepoLocator.GetUsers();
             
       }
        //
        // GET: /List/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /List/Details/5

        public ActionResult Details(string board, string id)
        {
            currUser = User.Identity.Name;
            int bid = int.Parse(board);
            int lid = int.Parse(id);
            if (_repo.GetList(bid, lid) == null) return new HttpNotFoundResult("A Lista não existe");
            if (!_userRepo.HasBoard(bid, currUser)) return new HttpUnauthorizedResult("Não tem acesso a esta lista");
            ListDetailsDTO dto = new ListDetailsDTO();

            if (_userRepo.BoardOnlyVis(bid,currUser))
            {
                dto.IsOwned = false;
                dto.IsVisual = true;
                dto.SingleList = new Pair(_userRepo.GetVis(bid,currUser).First,_repo.GetList(bid, lid));
                

            }
            else if (_userRepo.BoardOnlyEdit(bid,currUser))
            {
                dto.IsOwned = false;
                dto.IsVisual = false;
                dto.SingleList = new Pair(_userRepo.GetEdit(bid,currUser).First, _repo.GetList(bid, lid));

            }
            else
            {
                dto.IsOwned = true;
                dto.IsVisual = false;
                dto.SingleList = new Pair(currUser, _repo.GetList(bid, lid));
            }
            dto.ListCards = _repo.ShowListsAndCards(bid)[lid];
            return View(dto);

        }

        //
        // GET: /List/Create

        public ActionResult Create(int bid)
        {
            ViewData["userListName"] = _repo.GetAllListsNameExceptArchive(bid);
            ViewData["boardId"] = bid;
            return View();
        } 

        //
        // POST: /List/Create

        [HttpPost]
        public ActionResult Create(string board, List l)
        {
            if(_repo.AddList(int.Parse(board), l))
                return RedirectToAction("Details", "Board", new { id = board });
            return new HttpNotFoundResult("Erro");
        }
        
        //
        // GET: /List/Edit/5
 
        public ActionResult Edit(int board, int list)
        {
            currUser = User.Identity.Name;
           
            List l=_repo.GetList(board, list);
            if ( l == null) return new HttpNotFoundResult("A Lista não existe");
            if (!_userRepo.HasBoard(board, currUser)) return new HttpUnauthorizedResult("Não tem acesso a esta lista");
            ListDetailsDTO listDto = new ListDetailsDTO();
            listDto.SingleList = new Pair(currUser, l);
            listDto.IsOwned = _userRepo.IsUserBoard(board, currUser);
            listDto.IsVisual= _userRepo.BoardOnlyVis(board,currUser);
            listDto.BoardId = board;
            ViewData["userListName"] = _repo.GetAllListsNameExceptArchive(board);
            return View(listDto);
        }

        //
        // POST: /List/Edit/5

        [HttpPost]
        public ActionResult Edit(int board, List l, bool isAjaxRequest)
        {
            if (_repo.SubList(board, l))
            {
                currUser = User.Identity.Name;
                int lid = l.Id;
                ListDetailsDTO listDto = new ListDetailsDTO();
                listDto.SingleList = new Pair(currUser, l);
                listDto.IsOwned = _userRepo.IsUserBoard(board, currUser);
                listDto.IsVisual = _userRepo.BoardOnlyVis(board, currUser);
                listDto.BoardId = board;
                if (!isAjaxRequest)
                    return View(listDto);
                return PartialView("ListDetailsPartial", listDto);
            }
            return View(_repo.GetList(board, l.Id));
        }

        //
        // GET: /List/Delete/5
 
        //
        // POST: /List/Delete/5

       
        public ActionResult Delete(string board, string list)
        {
            
            _repo.DeleteList(int.Parse(board), int.Parse(list));

            return RedirectToAction("Index", "Board");

        }
    }
}
