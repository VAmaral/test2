using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using WebGarden_PI.Model;

namespace PI_MVC.Models.DTO
{
    public class BoardDetailsDTO
    {
        //par (user, board)
        public Pair SingleBoard { get; set; }
        //lista das listas da board
        public IEnumerable<List> BoardLists { get; set; }
        //dicionarios de listas de cartoes da board
        public IDictionary<int, LinkedList<Card>> BoardCards { get; set; }
        //a board é do user?
        public bool IsOwned { get; set; }
        //a board so pode ser visualizada?
        public bool IsVisual { get; set; }
        //Lista dos nomes das boards do user para efeitos de validação
        public IEnumerable<string> UserBoardsName { get; set; }
    }
}