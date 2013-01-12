using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace WebGarden_PI.Model
{
    public class Board
    {
        [Required]
        [Display(Name="Nome")]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        [Display(Name="Descrição")]
        public string Description { get; set; }
        public int Id { get; set; }  
    }
}
