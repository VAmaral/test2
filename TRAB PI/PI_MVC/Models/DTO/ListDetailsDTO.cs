using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using WebGarden_PI.Model;

namespace PI_MVC.Models.DTO
{
    public class ListDetailsDTO
    {
        //par (user, lista)
        public Pair SingleList { get;set;}
        //a lista é do user?
        public bool IsOwned { get; set; }
        //a lista so pode ser visualizada?
        public bool IsVisual { get; set;} 
        //Lista de cartoes da lista
        public IEnumerable<Card> ListCards { get; set; }

        public int BoardId { get; set; }
         

    }
}