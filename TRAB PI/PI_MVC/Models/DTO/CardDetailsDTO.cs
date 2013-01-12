using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace PI_MVC.Models.DTO
{
    public class CardDetailsDTO
    {
        //par (user, lista)
        public Pair SingleCard { get; set; }
        //a lista é do user?
        public bool IsOwned { get; set; }
        //a lista so pode ser visualizada?
        public bool IsVisual { get; set; }

        public string Board { get; set; }

        public string List { get; set; }
    }
}