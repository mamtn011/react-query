import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostFrom from "./my-component/PostForm";
import { fetchPost } from "./api/posts";
import { updatePost } from "./api/posts";

function EditPost()
{
    
    const queryClient = useQueryClient(); 
    const navigate = useNavigate()
    const {id} = useParams()
    // were getting data form json
    const {isLoading, data : post, isError, error,} = useQuery({
    queryKey : ["posts", id],
    queryFn : () => fetchPost(id)
    }); 

    // updating
    const updatedPostMutation = useMutation({
        mutationFn : updatePost,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["posts"]}); 
            console.log('successfully updated')
            navigate("/giash");
          }
    })

    if(isLoading) return <h2>loding...</h2>
    if(isError) return <h2>{error.message}</h2>

    const handleSubmit = (updatePost) => 
    {
        updatedPostMutation.mutate({id, ...updatePost})
        console.log(updatePost)
    }

    return(
        <>
            <h2>{<PostFrom onSubmit={handleSubmit} initalValue={post} />}</h2>
        </>
    )
}
export default EditPost;