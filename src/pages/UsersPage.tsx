import { ReactElement, useState } from "react";
import { User } from "../types/user.d";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { NavLink, Route, Routes } from "react-router-dom";
import PostsPage from "./PostsPage";

function UsersPage(): ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [fetchId, setFetchId] = useState<number>(1);

  const handleAddUser = () => {
    if (fetchId === 10) {
      setFetchId(1);
    } else setFetchId(fetchId + 1);

    const client = new ApolloClient({
      uri: "https://graphqlzero.almansi.me/api",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          {
            user(id: ${fetchId}) {
              id
              name
              email
            }
          }
        `,
      })
      .then((response) => {
        const fetchedUser: User = response.data.user;
        setUsers((prevUsers) => [...prevUsers, fetchedUser]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between m-4">
        <h1>User List</h1>
        <button className="btn btn-primary" onClick={handleAddUser}>
          + Add User
        </button>
      </div>
      <div className="row gx-5 gy-5">
        {users.map((user) => (
          <div key={user.id} className="col-4">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title">{user.name}</h5>
                <NavLink
                  to={`/users/${user.id}/posts`}
                  className="btn btn-primary btn-lg"
                >
                  Posts
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Routes>
        <Route path=":userId/posts" element={<PostsPage />} />
      </Routes>
    </div>
  );
}

export default UsersPage;
