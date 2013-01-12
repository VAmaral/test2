using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGarden_PI.Model
{
    public class List
    {
        public string Name { get; set; }
        public int Id{ get; set; }
        public List<Card> Cards { get; set; } 
    }
}