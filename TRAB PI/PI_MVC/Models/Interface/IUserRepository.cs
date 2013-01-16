using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using WebGarden_PI.Model;

namespace PI_MVC.Models
{
    public interface IUserRepository
    {
        IEnumerable<Board> AllUserBoards(string user);
        IEnumerable<Pair> BoardsAllowedEdit(string user);
        IEnumerable<Pair> BoardsAllowedVisual(string user);
        bool AddBoard(Board b, string currentUser);
        bool RemoveBoard(int bid, string currentUser);
        bool GiveForVisual(string user, int id, string currentUser);
        bool GiveForEdit(string user, int id, string currentUser);
        bool RemoveEdit(string user);
        bool RemoveEdit(string givingUser, string otherUser);
        bool RemoveEdit(string givingUser, string otherUser, int board);
        bool RemoveVis(string user);
        bool RemoveVis(string givingUser, string otherUser);
        bool RemoveVis(string givingUser, string otherUser, int board);
        bool CreateUser(User u);
        bool DeleteUser(User u);
        bool HasBoard(int bid, string currentUser);
        bool IsUserBoard(int bid, string currentUser);
        bool BoardOnlyVis(int bid, string currentUser);
        bool BoardOnlyEdit(int bid, string currentUser);
        Pair GetEdit(int bid, string currentUser);
        Pair GetVis(int bid, string currentUser);
        string ValidateUser(string userId, string pass);
        User GetUser(String userId);
        bool UpdateUser(User u);
        IEnumerable<User> GetAllUser();
        User ChangeUserRole(string u);
        string AllUserBoardsNames(string currUser);



        
    }
}
