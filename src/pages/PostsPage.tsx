import { ReactElement } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "../types/post";
import { useParams } from "react-router";

function PostsPage(): ReactElement {
  const { userId } = useParams();

  const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.post("https://graphqlzero.almansi.me/api", {
      query: `
        {
          user(id:${userId}) {
            posts {
              data {
                id
                title
              }
            }
          }
        }
      `,
    });

    console.log(response.data.data);
    return response.data.data.user.posts.data;
  };

  const { data, isLoading, isError } = useQuery(["posts"], fetchPosts, {
    staleTime: 600000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="row gx-5 gy-5">
        {data?.map((post: { id: string; title: string }) => (
          <div key={post.id} className="col-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsPage;
