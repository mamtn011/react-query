import { useState } from "react"
function PostFrom({onSubmit})
{
    const [post, setPost] = useState({
        title : "",
        body : ""
    })


    const hangleChangeInput = (e) =>
    {
        setPost({
            ...post,
            [e.target.name] : e.target.value
        })
    }

    // -- create field
    const renderField = (label) => (
        <div>
            <label>{label}</label>
            <input onChange={hangleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]} />
        </div>
    )
    // -- Hendle Submit button
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
export default PostFrom;