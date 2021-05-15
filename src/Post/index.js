import React, {useState, useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar'
import {db} from '../firebase'

const Post = ({imageUrl, postId, user, caption, username,setOpen}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe ;
        if(postId){
            unsubscribe = db.collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snap) => {
                setComments(snap.docs.map(doc => doc.data()));
            })
        }

        return () => {
            unsubscribe();
        }
    }, [postId])

    const post = (e) => {
        e.preventDefault();

        if(user?.displayName){
            if(comment!=='' || comment.trim()!==''){
                db.collection('posts').doc(postId).collection('comments').add({
                    text: comment,
                    username: user.displayName
                });
                setComment('');
            }
        }else{
            setOpen(true);
        }

    }

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

            <div className="display_comment">
               <h3>View All Comments</h3> 
                <div className="comments"> 
                    <p>
                        <strong>{comments[0]?.username}</strong> {comments[0]?.text}
                    </p>
                    <p>
                        <strong>{comments[1]?.username}</strong> {comments[1]?.text}
                    </p>
                    <p>
                        <strong>{comments[2]?.username}</strong> {comments[2]?.text}
                    </p>
                {/* {
                    comments.map(({text, username},index) => {
                        return (
                            <p key={index}>
                                <strong>{username}</strong> {text}
                            </p>
                        )
                    })
                } */}
                </div>
            </div>

            <div className="comment_section">
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

export default Post
