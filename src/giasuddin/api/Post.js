// for getting data
export async function fetchPosts()
{
    const response = await fetch('http://localhost:4000/giasuddin');
    return response.json()
}


// posting post 
export async function fetchPost(id)
{
    const response = await fetch(`http://localhost:4000/giasuddin/${id}`);
    return response.json()
}


// creat post
export async function createPost(newPost)
{
    const response = await fetch(`http://localhost:4000/giasuddin/`, {
        method : "POST",
        headers : {
            "Content-Type" : "Application/json"
        },
        body : JSON.stringify(newPost)
    });
    return response.json()
}

// updated 
export async function updatePost(updatedPost)
{
    const response = await fetch(`http://localhost:4000/giasuddin/${updatedPost.id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "Application/json"
        },
        body : JSON.stringify(updatedPost)
    });
    return response.json()
}

// Delete
export async function deletePost(id)
{
    const response = await fetch(`http://localhost:4000/giasuddin/${id}`, {
        method : "DELETE",
    });
    return response.json()
}
