import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar'
const Post = ({imageUrl, caption,username}) => {
    return (
        <div className='post'>
            <div className='post_header'>
                <Avatar 
                    className="post_avatar"
                    alt={username}
                    src="/static/img/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            <div className="post_img_container">
                <img 
                    className="post_img"
                    src={imageUrl}
                    alt="Instagram"
                />
            </div>
            
            <h4 className="post_text">
                <strong>{username} </strong> {caption}
            </h4>
        </div>
    )
}

export default Post
