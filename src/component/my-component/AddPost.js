import { useMutation, useQueryClient } from "@tanstack/react-query"
import PostFrom from "./PostForm"
// import PostFrom from "./PostForm";
import { createPost } from "../api/posts";
import {v4 as uuidv4} from 'uuid';

function AddPost()
{

    const queryClient = useQueryClient(); 
    const createPostMotation = useMutation({
      mutationFn : createPost,
      onSuccess : () => {
        queryClient.invalidateQueries({queryKey : ["posts"]}); 
        // console.log('successfully added')
      }
    }); 
  
    const handleAppPost = (post) => 
    {
      createPostMotation.mutate({
        id : uuidv4(),
        ...post
      })
    }
    return(
        <>
            <h2 className="form-heading">Create Post</h2>
            <PostFrom onSubmit={handleAppPost} initalValue={{}} />
        </>
    )
}

export default AddPost;