import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AddPost from "./giasuddin-component/AddPost";
import { fetchPosts } from "./api/Post";

function PostList()
{
    const navigate = useNavigate()
    // were getting data form json
    const {isLoading, data : posts, isError, error,} = useQuery({
        queryKey : ["posts"],
        queryFn : fetchPosts
    }); 

    // 
    if(isLoading) return <h2>loding...</h2>
    if(isError) return <h2>{error.message}</h2>

   

    return (
         <>
            <AddPost />
            <h2>PostList</h2>
            {
                posts.map((post) => 
                {
                    return <div key={post.id} style={{background : '#777'}}>
                        <h4 style={{cursor:"pointer"}} onClick={() => navigate(`/giash/${post.id}`)}>{post.title}</h4>
                        <p style={{cursor:"pointer"}} onClick={() => navigate(`/giash/${post.id}`)}>{post.body}</p>
                        
                        <button onClick={() => navigate(`/giash/${post.id}/edit`)}>Edit</button>
                        <button>Delete</button>
                        <hr />
                    </div>
                })
            }
        </>
    )
}
export default PostList;

