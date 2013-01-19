using System;
using System.Collections.Generic;
using System.Web.UI;
using PI_MVC;
using System.Linq;
using PI_MVC.Models;
using WebGarden_PI.Model;

namespace PI_MVC.Models.Repository
{
    public class UserMemoryRepository : IUserRepository
    {


        private readonly IRepository _repo = RepoLocator.Get();

        //repositorio de users
        private readonly Dictionary<string, User> _users = new Dictionary<string, User>();

        //ids das boards que cada user <user, lista de ids de board>
        private readonly Dictionary<string, LinkedList<int>> userBoards = new Dictionary<string, LinkedList<int>>();

        //boards que o user so pode visualizar <user, Pair(user, board id)>
        private readonly Dictionary<string, LinkedList<Pair>> userVisBoard = new Dictionary<string, LinkedList<Pair>>();

        //boards que o user pode editar <user, Pair(user, board id)>
        private readonly Dictionary<string, LinkedList<Pair>> userEditBoard = new Dictionary<string, LinkedList<Pair>>();

        //boards que o user disponibilizou a outro user para visualização <user que disponibliza,< user, lista de ids de board>>
        private readonly Dictionary<string, Dictionary<string, LinkedList<int>>> letSee = new Dictionary<string, Dictionary<string, LinkedList<int>>>();

        //boards que o user disponibilizou para edição a cada user <user que disponibliza,< user, lista de ids de board>>
        private readonly Dictionary<string, Dictionary<string, LinkedList<int>>> letEdit = new Dictionary<string, Dictionary<string, LinkedList<int>>>();

        //Diz se o user tem acesso a board, seja dele, ou de o deixarem ver ou editar
        public bool HasBoard(int bid,string currentUser)
        {

            if (userBoards[currentUser].Contains(bid)) return true;
            if (BoardOnlyEdit(bid,currentUser)) return true;
            return BoardOnlyVis(bid,currentUser);

        }

        //Diz se a board é mesmo do user
        public bool IsUserBoard(int bid,string currentUser)
        {
            return userBoards[currentUser].Contains(bid);
        }

        //Diz se o user pode aceder à board so para visualização
        public bool BoardOnlyVis(int bid,string currentUser)
        {

            foreach (Pair p in userVisBoard[currentUser])
            {
                int aux = int.Parse(string.Format("{0}", p.Second));
                if (aux == bid) return true;
            }
            return false;

        }

        //Diz se o user pode aceder à board para edição
        public bool BoardOnlyEdit(int bid,string currentUser)
        {

            foreach (Pair p in userEditBoard[currentUser])
            {
                int aux = int.Parse(string.Format("{0}", p.Second));
                if (aux == bid) return true;
            }
            return false;
        }

        //Retorna o par (user, id de board) que pode aceder para visualização
        public Pair GetVis(int bid,string currentUser)
        {

            foreach (Pair p in userVisBoard[currentUser])
            {
                int aux = int.Parse(string.Format("{0}", p.Second));
                if (aux == bid) return new Pair(p.First, _repo.GetBoard((int)p.Second));
            }
            return null;

        }

        public string ValidateUser(string userId, string pass)
        {
            User u = GetUser(userId);
            
            if (u == null || !u.Password.Equals(pass)) return null;
            return u.Role;
        }

        public User GetUser(string userId)
        {
            User u = null;
            _users.TryGetValue(userId, out u);
            return u;
        }

        //Retorna o par (user, id de board) que pode aceder para edição
        public Pair GetEdit(int bid, string currentUser)
        {

            foreach (Pair p in userEditBoard[currentUser])
            {
                int aux = int.Parse(string.Format("{0}", p.Second));
                if (aux == bid) return new Pair(p.First, _repo.GetBoard((int)p.Second));
            }
            return null;

        }

        //Retorna todas as boards do user
        public IEnumerable<Board> AllUserBoards(string user)
        {
            foreach (int id in userBoards[user])
                yield return _repo.GetBoard(id);
        }

        //Retorna todas as boards que o user tem permissão para editar(de outros utilizadores)
        public IEnumerable<Pair> BoardsAllowedEdit(string user)
        {
            foreach (Pair board in userEditBoard[user])
                yield return new Pair(board.First, _repo.GetBoard((int)board.Second));
        }

        //Retorna todas as boards que o user tem permissão para visualizar(de outros utilizadores)
        public IEnumerable<Pair> BoardsAllowedVisual(string user)
        {
            foreach (Pair board in userVisBoard[user])
                yield return new Pair(board.First, _repo.GetBoard((int)board.Second));
        }

        //Adiciona uma board ao user corrente
        public bool AddBoard(Board b, string currentUser)
        {
            _repo.AddBoard(b);
            userBoards[currentUser].AddLast(b.Id);
            return true;
        }

        //Remove uma board do user corrente
        public bool RemoveBoard(int bid,string currentUser)
        {
            if (_repo.DeleteBoard(bid))
            {
                userBoards[currentUser].Remove(bid);
                return true;
            }
            return false;

        }

        //disponibiliza uma board para visualização ao user especificado
        public bool GiveForVisual(string user, int id,string currentUser)
        {
			//Validar
			//não existe board ou não existe user?
            if (_repo.GetBoard(id) == null || !_users.ContainsKey(user)) return false;
			//Inicializar o repository letSee para o user se ainda não estiver inicializado
            if (!letSee[currentUser].ContainsKey(user)) letSee[currentUser].Add(user, new LinkedList<int>());
			//Já tinha sido partilhado com estas mesmas permissões?
            if(letSee[currentUser][user].Contains(id))return true;
			//Inicializar o repositorio letEdit para o user se ainda não estiver inicializado
			if (!letEdit[currentUser].ContainsKey(user)) letEdit[currentUser].Add(user, new LinkedList<int>());

            if(!userVisBoard.ContainsKey(user))userVisBoard[user]= new LinkedList<Pair>();
			//Já tinha partilhado mas com outras permissoes? apaga essas entradas então
			if(letEdit[currentUser][user].Contains(id)){
				letEdit[currentUser][user].Remove(id);
                foreach (Pair p in userEditBoard[user])
                    if (int.Parse(p.Second.ToString()) == id)
                    {
                        userEditBoard[user].Remove(p);
                        break;
                    }
			}
			//Adiciona uma entrada no repositorio 
			letSee[currentUser][user].AddLast(id);
            userVisBoard[user].AddLast(new Pair(currentUser, id));
            return true;
        }

        //disponibiliza uma board para edição ao user especificado
        public bool GiveForEdit(string user, int id,string currentUser)
        {
           //Validar
			//não existe board ou não existe user?
            if (_repo.GetBoard(id) == null || !_users.ContainsKey(user)) return false;
			//Inicializar o repository letSee para o user se ainda não estiver inicializado
            if (!letEdit[currentUser].ContainsKey(user)) letEdit[currentUser].Add(user, new LinkedList<int>());
			//Já tinha sido partilhado com estas mesmas permissões?
            if(letEdit[currentUser][user].Contains(id))return true;
			//Inicializar o repositorio letEdit para o user se ainda não estiver inicializado
			if (!letSee[currentUser].ContainsKey(user)) letSee[currentUser].Add(user, new LinkedList<int>());

            if (!userEditBoard.ContainsKey(user)) userEditBoard[user] = new LinkedList<Pair>();
			//Já tinha partilhado mas com outras permissoes? apaga essas entradas então
			if(letSee[currentUser][user].Contains(id)){
				letSee[currentUser][user].Remove(id);
                foreach (Pair p in userVisBoard[user])
                    if (int.Parse(p.Second.ToString()) == id)
                    {
                        userVisBoard[user].Remove(p);
                        break;
                    }
			}
			//Adiciona uma entrada no repositorio 
			letEdit[currentUser][user].AddLast(id);
            userEditBoard[user].AddLast(new Pair(currentUser, id));
            return true;
        }

        //Remove todas as boards que o user conseguia editar de outros users
        public bool RemoveEdit(string user)
        {

            if (!_users.ContainsKey(user)) return false;
            foreach (string u in letEdit.Keys)
                RemoveEdit(u, user);
            return true;

        }

        //Remove todas as boards que o user podia editar de um user em particular
        public bool RemoveEdit(string givingUser, string otherUser)
        {

            if (!_users.ContainsKey(givingUser) || !_users.ContainsKey(otherUser)) return false;
            letEdit[givingUser].Remove(otherUser);
            return true;

        }

        //Remove uma board que o user podia editar de um user em particular
        public bool RemoveEdit(string givingUser, string otherUser, int board)
        {

            if (!_users.ContainsKey(givingUser) || !_users.ContainsKey(otherUser)) return false;
            letEdit[givingUser][otherUser].Remove(board);
            return true;
        }

        //Remove todas as boards que o user conseguia visualizar de outros users
        public bool RemoveVis(string user)
        {

            if (!_users.ContainsKey(user)) return false;
            foreach (string u in letSee.Keys)
                RemoveVis(u, user);
            return true;

        }

        //Remove todas as boards que o user podia visualizar de um user em particular
        public bool RemoveVis(string givingUser, string otherUser)
        {

            if (!_users.ContainsKey(givingUser) || !_users.ContainsKey(otherUser)) return false;
            letSee[givingUser].Remove(otherUser);
            return true;

        }

        //Remove uma board que o user podia visualizar de um user em particular
        public bool RemoveVis(string givingUser, string otherUser, int board)
        {

            if (!_users.ContainsKey(givingUser) || !_users.ContainsKey(otherUser)) return false;
            letSee[givingUser][otherUser].Remove(board);
            return true;
        }

        //Adiciona um user novo
        public bool CreateUser(User u)
        {

            if (!_users.ContainsKey(u.NickName))
            {
                _users.Add(u.NickName, u);
                userBoards.Add(u.NickName, new LinkedList<int>());
                userVisBoard.Add(u.NickName, new LinkedList<Pair>());
                userEditBoard.Add(u.NickName, new LinkedList<Pair>());
                letSee.Add(u.NickName, new Dictionary<string, LinkedList<int>>());
                letEdit.Add(u.NickName, new Dictionary<string, LinkedList<int>>());
                return true;
            }
            return false;

        }

        //Remove um user
        public bool DeleteUser(User u)
        {

            if (!_users.ContainsKey(u.NickName)) return false;
            _users.Remove(u.NickName);
            userBoards.Remove(u.NickName);
            userVisBoard.Remove(u.NickName);
            userEditBoard.Remove(u.NickName);
            RemoveEdit(u.NickName);
            RemoveVis(u.NickName);
            return true;
        }

        public bool UpdateUser(User u)
        {
            User user = GetUser(u.NickName);
            user.Name = u.Name;
            user.Email = u.Email;
            return true;
        }

        public IEnumerable<User> GetAllUser()
        {
            return _users.Values;
        }
        public User ChangeUserRole(string user)
        {

            User u = GetUser(user);
            string role = u.Role;
            if (role.Equals("guest"))
            {
                u.Role = "user";
            }
            else if (role.Equals("admin"))
            {
                u.Role = "user";
            }
            else
            {
                u.Role = "admin";
            }
            return u;
        }


        public string AllUserBoardsNames(string currUser)
        {
          string res = "";
          IEnumerable<Board> boards=  AllUserBoards(currUser);
          foreach (Board b in boards) res+=b.Name+",";
          return res.Equals("") ? res : res.Substring(0, res.Count() - 1);
        }



        public string GetAllUserList()
        {
            string res = "";
            IEnumerable<User> users = GetAllUser();
            foreach (User u in users)
                res += u.NickName + ",";
            return res.Equals("") ? res : res.Substring(0, res.Count() - 1);
        }
    }
}