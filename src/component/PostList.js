import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "./api/posts";
import { useNavigate } from "react-router-dom";
import AddPost from "./my-component/AddPost";
import { deletePost } from "./api/posts";

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
    });
 
    const handleDelete = (id) => 
    {
        deletePostMutation.mutate(id)
        console.log(id)
    }
    // 
    if(isLoading) return <h2>loding...</h2>
    if(isError) return <h2>{error.message}</h2>
    
    return(
        <div className="postListDesing">
            <AddPost />
            <h3 className="heading-design"><strong>Your Post List's</strong></h3>
            {
                posts.map((post) => 
                {
                    return <div className="postListDesign" key={post.id}>

                        <div>
                            <h4  style={{cursor:"pointer"}} onClick={() => navigate(`/giash/${post.id}`)}>{post.title}</h4>
                            <p  style={{cursor:"pointer"}} onClick={() => navigate(`/giash/${post.id}`)}>{post.body}</p>
                        </div>
                      
                        <button onClick={() => navigate(`/giash/${post.id}/edit`)}>Update</button>
                        <button className="deleteBtn" onClick={() => handleDelete(post.id)}>Delete</button>
                        <hr />
                    </div>
                   
                })
            }
        </div>

    )
}

export default PostList;

