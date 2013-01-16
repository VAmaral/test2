using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace WebGarden_PI.Model
{
    public interface IRepository
    {
        IEnumerable<Board> GetAllBoard();
        Board GetBoard(int bid);
        bool AddBoard(Board board);
        bool DeleteBoard(int bid);
        IEnumerable<List> GetAllListsExceptArchive(int bid);
        List GetList(int bid, int lid);
        bool AddList(int bid, List list);
        bool DeleteList(int bid, int lid);
        IEnumerable<Card> GetAllCards(int bid, int lid);
        Card GetCard(int bid, int lid, int cid);
        bool AddCard(int bid, int lid, Card card);
        bool DeleteCard(int bid, int lid, int cid);
        bool MoveCard(int bid, int l1, int l2, int cid, int pos);
        bool BoardHasCard(int bid, int cid);
        IDictionary<int, LinkedList<Card>> ShowListsAndCards(int bid);
        bool MoveList(int bid, int lid, int position);
        bool SubBoard(Board b);
        bool SubList(int bid, List l);
        bool SubCard(int bid, int lid, Card c);


        string GetAllListsNameExceptArchive(int bid);

        string GetAllCardNames(int bid, int lid);

        IEnumerable<Card> GetArchive(int bid);

        void ArchiveCard(int board, int list, int card);
    }
}
