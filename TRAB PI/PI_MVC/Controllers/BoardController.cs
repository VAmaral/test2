using System;
using System.Security.Principal;
using System.Web.Mvc;
using System.Web.UI;
using PI_MVC;
using PI_MVC.Models;
using PI_MVC.Models.DTO;
using WebGarden_PI.Model;

namespace PI_MVC.Controllers
{
    public class BoardController : Controller
    {
        readonly IRepository _repo;
        readonly IUserRepository _userRepo;

        public BoardController()
        {
            _repo = RepoLocator.Get();
            _userRepo = RepoLocator.GetUsers();

        }

        //
        // GET: /Board/5
        //Mostra todas as boards
        public ActionResult Index()
        {
            ViewData["userBoardsName"] = _userRepo.AllUserBoardsNames(User.Identity.Name);
           string currUser = User.Identity.Name;
            AllBoardsDTO dto= new AllBoardsDTO();
            dto.UserBoard = _userRepo.AllUserBoards(currUser);
            dto.EditBoard = _userRepo.BoardsAllowedEdit(currUser);
            dto.VisualBoard = _userRepo.BoardsAllowedVisual(currUser);
            return View(dto);
            //return PartialView("MyPartialBoards");
        }
        [HttpPost]
        public ActionResult Share(string bid, string user, bool edit) {

            if(edit)_userRepo.GiveForEdit(user, int.Parse(bid), User.Identity.Name);
            else    _userRepo.GiveForVisual(user, int.Parse(bid), User.Identity.Name);
            Object b= _userRepo.BoardsAllowedEdit(user);

            return RedirectToAction("Index");

            
        }

        //
        // GET: /Board/Edit/5

        public ActionResult Edit(int id)
        {
           string currUser = User.Identity.Name;
            if (_repo.GetBoard(id) == null) return new HttpNotFoundResult("O quadro não existe");
            if (!_userRepo.HasBoard(id, currUser)) return new HttpUnauthorizedResult("Não tem acesso a este quadro");
            BoardDetailsDTO dto= new BoardDetailsDTO();

            if (_userRepo.BoardOnlyVis(id,currUser))
            {
                dto.IsOwned = false;
                dto.IsVisual = true;
                dto.SingleBoard = _userRepo.GetVis(id,currUser);                
            }
            else if (_userRepo.BoardOnlyEdit(id,currUser))
            {
                dto.IsOwned = false;
                dto.IsVisual = false;
                dto.SingleBoard = _userRepo.GetEdit(id,currUser);
            }
            else
            {
                dto.IsOwned = true;
                dto.IsVisual = false;
                dto.SingleBoard = new Pair(currUser, _repo.GetBoard(id));
            }
            dto.BoardLists = _repo.GetAllListsExceptArchive(id);
            ViewData["userBoardsName"] = _userRepo.AllUserBoardsNames(currUser);
            return View(dto);
            
        }
        // POST: /Board/Edit/5

        [HttpPost]
        public ActionResult Edit(Board b, bool isAjaxRequest)
        {
            _repo.SubBoard(b);
            if (!isAjaxRequest)
            {
                return RedirectToAction("Edit", new { id = b.Id });
            }
            return PartialView("BoardDetailsPartial",b);
        }
        //
        //// GET: /Board/Create

        //public ActionResult Create()
        //{
        //    //Criar uma nova board
        //    return View();
        //} 

        //
        // POST: /Board/Create

        [HttpPost]
        public ActionResult Create(Board b, bool isAjaxRequest)
        {   
            _userRepo.AddBoard(b, User.Identity.Name);
            ViewData["userBoardsName"] = _userRepo.AllUserBoardsNames(User.Identity.Name);
            if (!isAjaxRequest)
            {
                return RedirectToAction("Index");
            }
            
            return PartialView("MyPartialBoards", _userRepo.AllUserBoards(User.Identity.Name));
                
        }
        
        //
        // GET: /Board/Details/5
 
        public ActionResult Details(int id)
        {
            string currUser = User.Identity.Name;
            if(_repo.GetBoard(id)==null)return new HttpNotFoundResult("O quadro não existe");

            if (_userRepo.IsUserBoard(id, currUser) || _userRepo.BoardOnlyEdit(id, currUser)||
                _userRepo.HasBoard(id,currUser))
            {

                BoardDetailsDTO dto = new BoardDetailsDTO();
                if (_userRepo.BoardOnlyVis(id, currUser))
                {
                    dto.IsOwned = false;
                    dto.IsVisual = true;
                    dto.SingleBoard = _userRepo.GetVis(id, currUser);
                }
                else if (_userRepo.BoardOnlyEdit(id, currUser))
                {
                    dto.IsOwned = false;
                    dto.IsVisual = false;
                    dto.SingleBoard = _userRepo.GetEdit(id, currUser);
                }
                else
                {
                    dto.IsOwned = true;
                    dto.IsVisual = false;
                    dto.SingleBoard = new Pair(currUser, _repo.GetBoard(id));
                }
                dto.BoardLists = _repo.GetAllListsExceptArchive(id);
                dto.BoardCards = _repo.ShowListsAndCards(id);
                ViewData["show"] = dto.IsOwned;
                return View(dto);
            }
            return new HttpUnauthorizedResult("Não tem permissão para editar este quadro");
        }

        
        public ActionResult Delete(int id,bool isAjaxRequest)
        {
            _userRepo.RemoveBoard(id, User.Identity.Name);
            if (isAjaxRequest)
            {
                return PartialView("MyPartialBoards", _userRepo.AllUserBoards(User.Identity.Name));
            }
            return RedirectToAction("Index");
        }

        public ActionResult Archive(int bid) {
            ViewData["board"] = bid;
            return View(_repo.GetArchive(bid));
        
        
        }
       
        public ActionResult ArchiveCard(int board, int list, int card)
        {

            _repo.ArchiveCard(board, list, card);
            return RedirectToAction("Index");

        }
    }
}
