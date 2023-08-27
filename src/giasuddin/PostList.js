import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddPost from "./giasuddin-component/AddPost";
import { fetchPosts } from "./api/Post";
import { deletePost } from "./api/Post";

function PostList()
{
    const queryClient = useQueryClient(); 
    const navigate = useNavigate()
    // were getting data form json
    const {isLoading, data : posts, isError, error,} = useQuery({
        queryKey : ["posts"],
        queryFn : fetchPosts
    }); 

    // DELETE
    const deletePostMutation = useMutation({
        mutationFn : deletePost,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["posts"]}); 
            console.log('successfully delete')
            navigate("/giash");
          }
    })

    const handleDelete = (id) => 
    {
        deletePostMutation.mutate(id)
        console.log(id)
    }

    // 
    if(isLoading) return <h2>loding...</h2>
    if(isError) return <h2>{error.message}</h2>

    return (
         <div  className="postListDesing">
            <AddPost />
            <h3 className="heading-design"><strong>Your Post List's</strong></h3>
            {
                posts.map((post) => 
                {
                    return <div className="postListDesign" key={post.id} >
                        <h4 style={{cursor:"pointer"}} onClick={() => navigate(`/giash/${post.id}`)}>{post.title}</h4>
                        <p style={{cursor:"pointer"}} onClick={() => navigate(`/giash/${post.id}`)}>{post.body}</p>
                        
                        <button onClick={() => navigate(`/giash/${post.id}/edit`)}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                        <hr />
                    </div>
                })
            }
        </div>
    )
}
export default PostList;

