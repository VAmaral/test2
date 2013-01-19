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
            string currUser = User.Identity.Name;
            int bid = int.Parse(board);
            
            if (!_userRepo.HasBoard(bid,currUser))
                return new HttpNotFoundResult("Erro");
            
            CardDetailsDTO dto = _repo.InitializeCardDetailsDTO( board,  list,  id,  currUser);
           
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
            CardDetailsDTO cardDto = new CardDetailsDTO();
            cardDto.Board = board;
            cardDto.List = list;
            cardDto.SingleCard = new Pair(currUser, c);
            cardDto.IsOwned = _userRepo.IsUserBoard(bid, currUser);
            cardDto.IsVisual = _userRepo.BoardOnlyVis(bid, currUser);
            ViewData["UserCardNames"] = _repo.GetAllCardNames(bid, lid);
            ViewData["board"] = board;
            return View(cardDto);
        }

        //
        // POST: /Card/Edit/5

        [HttpPost]
        public ActionResult Edit(int board, int list, Card c, bool isAjaxRequest)
        {
            _repo.SubCard(board, list, c);
            ViewData["board"] = board;
            //return View("Board", "Details", board);
            if (!isAjaxRequest)
                return RedirectToAction("Edit", "Card", new { board = board, list = list, id = c.Id });

            return PartialView("CardDetailsPartial", _repo.GetCard(board, list, c.Id));
        }

        //
        // GET: /Card/Delete/5

      
        public ActionResult Delete(string board, string list, string card)
        {

                _repo.DeleteCard(int.Parse(board), int.Parse(list), int.Parse(card));
                return RedirectToAction("Details", "Board", new {id=board });
          
        }


        [HttpPost]
        public void MoveCardToOtherList(string card, string sender, string receiver, string previousCard, string nextCard, string board)
        {
            try
            {
                currUser = User.Identity.Name;
                int cid = int.Parse(card);
                int bid = int.Parse(board);
                int sid = int.Parse(sender);
                int rid = int.Parse(receiver);

                Card c = _repo.GetCard(bid, sid, cid);
                if (c == null) throw new HttpException("O Cartão não existe");

                IDictionary<int, LinkedList<Card>> lists = _repo.ShowListsAndCards(bid);

                if (lists[sid] == null) throw new HttpException("A Lista de envio não existe");
                if (lists[rid] == null) throw new HttpException("A Lista de recepção não existe");

                //Get position
                List<Card> receiverCardList = new List<Card>();
                if (lists[rid].First != null)
                    receiverCardList = lists[rid].First.List.ToList<Card>();

                int position = 0;
                if (receiverCardList.Count > 0)
                {
                    if (!string.IsNullOrEmpty(previousCard))
                    {
                        Card receiverCard = receiverCardList.Single(rc => rc.Id.Equals(int.Parse(previousCard)));
                        position = receiverCardList.IndexOf(receiverCard) + 1;
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(nextCard))
                        {
                            Card receiverCard = receiverCardList.Single(rc => rc.Id.Equals(int.Parse(nextCard)));
                            position = receiverCardList.IndexOf(receiverCard);
                        }
                    }
                }

                //Move Card
                _repo.MoveCard(bid, sid, rid, cid, position);
            }
            catch (HttpException ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public void MoveCardInsideList(string card, string list, string previousCard, string nextCard, string board)
        {
            try
            {
                currUser = User.Identity.Name;
                int cid = int.Parse(card);
                int bid = int.Parse(board);
                int lid = int.Parse(list);

                Card c = _repo.GetCard(bid, lid, cid);
                if (c == null) throw new HttpException("O Cartão não existe");

                IDictionary<int, LinkedList<Card>> lists = _repo.ShowListsAndCards(bid);

                if (lists[lid] == null) throw new HttpException("A Lista não existe");

                //Get position
                List<Card> receiverCardList = new List<Card>();
                if (lists[lid].First != null)
                    receiverCardList = lists[lid].First.List.ToList<Card>();

                int position = 0;
                if (receiverCardList.Count > 0)
                {
                    if (!string.IsNullOrEmpty(previousCard))
                    {
                        Card receiverCard = receiverCardList.Single(rc => rc.Id.Equals(int.Parse(previousCard)));
                        position = receiverCardList.IndexOf(receiverCard) + 1;
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(nextCard))
                        {
                            Card receiverCard = receiverCardList.Single(rc => rc.Id.Equals(int.Parse(nextCard)));
                            position = receiverCardList.IndexOf(receiverCard);
                        }
                    }
                }

                //Move Card
                if (receiverCardList.IndexOf(c) != position)
                    _repo.MoveCard(bid, lid, lid, cid, position);
            }
            catch (HttpException ex)
            {
                throw ex;
            }
        }
    }
}
