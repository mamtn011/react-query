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


