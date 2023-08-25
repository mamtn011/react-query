import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; 
import { fetchPost } from "./api/posts";

function Post()
{
    const navigate = useNavigate()
    const {id} = useParams()
    // were getting data form json
    const {isLoading, data : post, isError, error,} = useQuery({
    queryKey : ["posts", id],
    queryFn : () => fetchPost(id)
    }); 

    if(isLoading) return <h2>loding...</h2>
    if(isError) return <h2>{error.message}</h2>

    return(
       <>
            <h2>Post</h2>
            <button onClick={() => navigate(`/giash`)}>Back to list post</button>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
       </>
    );
}

export default Post;
