using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGarden_PI.Model
{
    class MemoryRepository : IRepository
    {
        private readonly IDictionary<int, Board> boardRepo = new Dictionary<int, Board>();
        private readonly IDictionary<int, LinkedList<List>> listRepo = new Dictionary<int, LinkedList<List>>();
        private readonly IDictionary<int, SortedDictionary<int, LinkedList<Card>>> cardRepo = new SortedDictionary<int, SortedDictionary<int, LinkedList<Card>>>();

        private int bCount, lCount, cCount; 

        public IEnumerable<Board> GetAllBoard()
        {
            return boardRepo.Values;
        }

        public IDictionary<int, LinkedList<Card>> ShowListsAndCards(int bid)
        {
            return cardRepo[bid];
        }

        public bool SubBoard(Board b)
        {
            if (boardRepo[b.Id] == null) return false;
            boardRepo[b.Id] = b;
            return true;
        }

        public bool SubList(int bid, List l) {
            foreach (List li in listRepo[bid])
                if (li.Id == l.Id) { li.Name = l.Name; return true; }
            return false;
            
        
        }

        public bool SubCard(int bid, int lid, Card c)
        {
            foreach(Card ca in cardRepo[bid][lid])
                if (ca.Id == c.Id) { 
                    ca.BeginDate = c.BeginDate;
                    ca.Description = c.Description;
                    ca.EndDate = c.EndDate;
                    ca.Name = c.Name;
                    return true;
                }
            return false;
            
        }

        public Board GetBoard(int bid)
        {
            Board b = null;
            boardRepo.TryGetValue(bid, out b);
            return b;
        }

        public bool AddBoard(Board board)
        {
            int bid = ++bCount;
            board.Id = bid;
            boardRepo[bid] = board;
            listRepo.Add(bid, new LinkedList<List>());
            cardRepo.Add(bid, new SortedDictionary<int, LinkedList<Card>>());
            AddList(bid, new List { Name = "Archive"});
            return true;
        }

        public bool DeleteBoard(int bid)
        {
            listRepo.Remove(bid);
            cardRepo.Remove(bid);
            return boardRepo.Remove(bid);
        }

        public IEnumerable<List> GetAllListsExceptArchive(int bid)
        {
            LinkedList<List> l = new LinkedList<List>();
            foreach (List li in listRepo[bid])
                if (!li.Name.Equals("Archive"))
                    l.AddLast(li);
            return l;

        }

        public List GetList(int bid, int lid)
        {
            
            foreach (List list in listRepo[bid]){
                if (list.Id == lid) return list;
            }

            return null;
        }

        public bool AddList(int bid, List list)
        {
            int lid = ++lCount;
            list.Id = lid;
            if (GetBoard(bid) == null || GetList(bid, lid) != null) return false;
            listRepo[bid].AddLast(list);
            cardRepo[bid].Add(lid, new LinkedList<Card>());
            return true;
        }

        public bool DeleteList(int bid, int lid)
        {
            cardRepo[bid].Remove(lid);
            foreach (List li in listRepo[bid])
                if (li.Id == lid)
                {
                    listRepo[bid].Remove(li);
                    return true;
                }
            return false;
        }

        public IEnumerable<Card> GetAllCards(int bid, int lid)
        {
            LinkedList<Card> ret= new LinkedList<Card>();
            foreach(Card c in cardRepo[bid][lid] )
                ret.AddLast(c);
            return ret;
        }

        public Card GetCard(int bid, int lid, int cid)
        {
            Card c = null;
            foreach (Card card in cardRepo[bid][lid])
                if (card.Id.Equals(cid)) c = card;
            return c;
        }

        public bool AddCard(int bid, int lid, Card card)
        {
            card.BeginDate = DateTime.Now;
            card.Id = ++cCount;
            cardRepo[bid][lid].AddLast(card);
            return true;
        }

        public bool BoardHasCard(int bid, int cid){
             IEnumerable<List> lists = GetAllListsExceptArchive(bid);
            IEnumerable<Card> cards;
            foreach(List l in lists){
                cards = GetAllCards(bid,l.Id);
              foreach(Card c in cards)
                  if(c.Id.Equals(cid)) return true;
            }
            return false;
        }

        public bool DeleteCard(int bid, int lid, int cid)
        {
            foreach (Card c in cardRepo[bid][lid])
                if (c.Id.Equals(cid))
                {
                    cardRepo[bid][lid].Remove(c);
                    return true;
                }
            return false;
        }

        public bool MoveCard(int bid, int l_old, int l_new, int cid, int position) {
            Card c=GetCard(bid, l_old, cid);
            if (c== null) return false;
            if (cardRepo[bid][l_new].Count == 0) {
                cardRepo[bid][l_new].AddLast(c);
                cardRepo[bid][l_old].Remove(c); 
                return true;
            }
            int idx=position;
            if (idx > cardRepo[bid][l_new].Count) idx = cardRepo[bid][l_new].Count;
            LinkedListNode<Card> node=cardRepo[bid][l_new].First;
            for (int i = 0; i < idx; ++i)node = node.Next;
            cardRepo[bid][l_old].Remove(c);
            cardRepo[bid][l_new].AddBefore(node, c);
            return true;
        }

        public bool MoveList(int bid, int lid, int position)
        {
            List l = GetList(bid, lid);
            if (l == null) return false;
            if (listRepo[bid].Count == 1) return true;
            if (position > listRepo[bid].Count) position = listRepo[bid].Count;
            LinkedListNode<List> node = listRepo[bid].First;
            for (int i = 0; i < position; ++i) node = node.Next;
            listRepo[bid].Remove(l);
            listRepo[bid].AddBefore(node, l);
            return true;
        }


        public string GetAllListsNameExceptArchive(int bid)
        {
            string res = "";
            IEnumerable<List> lists = GetAllListsExceptArchive(bid);
            if (lists.Count() == 0) return res;
            foreach (List l in lists) {
                res += l.Name + ",";
            }
            return res.Substring(0, res.Count() - 1);
        }


        public string GetAllCardNames(int bid, int lid)
        {
            string res = "";
            IEnumerable<Card> cards = GetAllCards(bid, lid);
            if (cards.Count() == 0) return res;
            foreach (Card c in cards)
            {
                res += c.Name + ",";
            }
            return res.Substring(0, res.Count() - 1);
            
        }


        public IEnumerable<Card> GetArchive(int bid)
        {
           LinkedList<Card> archive = cardRepo[bid][listRepo[bid].ElementAt(0).Id];
            return archive;
        }


        public void ArchiveCard(int board, int list, int card)
        {
            MoveCard(board, list, listRepo[board].ElementAt(0).Id, card, 0);
        }
    }
}
