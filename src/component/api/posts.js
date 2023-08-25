// for getting data
export async function fetchPosts()
{
    const response = await fetch('http://localhost:3000/posts');
    return response.json()
}

// posting data 
export async function fetchPost(id)
{
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    return response.json()
}
// creat post
export async function createPost(newPost)
{
    const response = await fetch(`http://localhost:3000/posts`, {
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
    const response = await fetch(`http://localhost:3000/posts/${updatedPost.id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "Application/json"
        },
        body : JSON.stringify(updatedPost)
    });
    return response.json()
}

// delete
export async function deletePost(id)
{
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method : "DELETE",
    });
    return response.json()
}