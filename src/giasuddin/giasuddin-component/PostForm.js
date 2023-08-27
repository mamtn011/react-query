import { useState } from "react"

function PostForm({onSubmit,initalValue})
{
    const [post, setPost] = useState({
        title : initalValue.title || "",
        body :  initalValue.body || "",
    })

    const hangleChangeInput = (e) =>
    {
        setPost({
            ...post,
            [e.target.name] : e.target.value
        })
    }

    const renderField = (label) => (
        <div>
            <label>{label}</label>
            <input onChange={hangleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]} />
        </div>
    )

    const handleSubmit = (e) => 
    {
        e.preventDefault(); 
        onSubmit(post)
        setPost({
            title : "", 
            body : ""
        }); 
        console.log(post)
    }


     return(
        <form onSubmit={handleSubmit}>
            {renderField('Title')}
            {renderField('Body')}
            <button type="submit">Submit</button>
        </form>
    )
}

export default PostForm