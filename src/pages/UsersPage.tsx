import { ReactElement, useState } from "react";
import { User } from "../types/user.d";
import { useQuery } from "react-query";
import { NavLink, Route, Routes } from "react-router-dom";
import PostsPage from "./PostsPage";
import axios from "axios";

function UsersPage(): ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [fetchId, setFetchId] = useState<number>(1);

  const fetchUser = async (): Promise<User> => {
    try {
      const response = await axios.post("https://graphqlzero.almansi.me/api", {
        query: `
          query GetUserById($id: ID!) {
            user(id: $id) {
              id
              username
              email
            }
          }
        `,
        variables: {
          id: fetchId,
        },
      });

      if (response.data.errors) {
        throw new Error("Error fetching data");
      }
      setUsers((prevUsers) => [...prevUsers, response.data.data.user]);
      return response.data.data.user;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { isError } = useQuery(["users", fetchId], fetchUser, {
    staleTime: 600000,
  });

  const handleAddUser = () => {
    setFetchId((prevId) => (prevId === 10 ? 1 : prevId + 1));
  };

  const renderedUsers = users.map((user) => {
    return (
      <div key={user.id} className="col-4">
        <div className="card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <h5 className="card-title">{user.username}</h5>
            <NavLink
              to={`/users/${user.id}/posts`}
              className="btn btn-primary btn-lg"
            >
              Posts
            </NavLink>
          </div>
        </div>
      </div>
    );
  });

  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="container">
      <div className="d-flex justify-content-between m-4">
        <h1>User List</h1>
        <button className="btn btn-primary" onClick={handleAddUser}>
          + Add User
        </button>
      </div>
      <div className="row gx-5 gy-5">{renderedUsers}</div>
      <Routes>
        <Route path=":userId/posts/*" element={<PostsPage />} />
      </Routes>
    </div>
  );
}

export default UsersPage;
