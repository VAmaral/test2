using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PI_MVC.Models;
using PI_MVC.Models.Repository;

namespace WebGarden_PI.Model
{
    class RepoLocator
    {
        private readonly static IRepository repository = new MemoryRepository();
        private readonly static IUserRepository userRepo = new UserMemoryRepository();
        private readonly static int estimateDate = 8;
        private readonly static List<string> roles = new List<string> { "user", "admin" };
        public static IRepository Get(){
            return repository;
        }
        public static int GetEndDate()
        {
            return estimateDate;
        }

        public static IUserRepository GetUsers() {
            return userRepo;
        }
        public static List<string> GetValidRoles()
        {
            return roles;
        }   
    }
}
