using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using WebGarden_PI.Model;

namespace PI_MVC.Models.DTO
{
    public class AllBoardsDTO
    {
        //lista das boards do user
        public IEnumerable<Board> UserBoard { get; set; }
        //lista das boards  que pode editar de outros users
        public IEnumerable<Pair> EditBoard { get; set; }
        //lista de boards que pode visualizar
        public IEnumerable<Pair> VisualBoard { get; set; }
    }
}