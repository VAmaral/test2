using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace PI_MVC.Models
{
    public class User : MembershipUser
    {
        public string Name { get; set; }
        public string NickName { get; set; }
        public string Password { get; set; }
        public override string Email { get; set; }
        public string Role { get; set; }

        public string Image { get; set; }

        public override bool ChangePassword(string oldPassword, string newPassword)
        {
            if (!PassConfirmed(oldPassword)) return false;
            Password = newPassword;
            return true;

        }
        public bool PassConfirmed(string password)
        {
            return Password.Equals(password);
        }
    }
}