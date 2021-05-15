import React from 'react'
import './Comments.css';

const Comments = ({comments, post,comment,setComment}) => {
    return (
        <div className="all_comments">
        <h3 style={{marginBottom:"10px ",color:"lightgray"}}>All Comments</h3>
            {
                comments.map(({text, username},index) => {
                    return (
                        <p key={index}>
                            <strong>{username}</strong> {text}
                        </p>
                    )
                })
            }
            <div className="comment_section" style={{marginTop:"10px",borderBottom:"1px solid lightgray"}}>
                <input 
                    className="comment"
                    type="text" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Add a comment"
                />
                <button className="post_comment" type="button" onClick={post}>Post</button>
            </div>
        </div>
    )
}

export default Comments
