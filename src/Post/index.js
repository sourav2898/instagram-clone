import React, {useState, useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar'
import {db} from '../firebase'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import TelegramIcon from '@material-ui/icons/Telegram';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import Comments from '../Comments';
import firebase from 'firebase';
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      border: '10px solid ligntgray',
      borderRadius: '20px', 
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '40%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      margin: '5px',
      [theme.breakpoints.down('sm')]: {
        width: '90%'
      },
    },
  }));

const Post = ({imageUrl, postId, user, caption, username,setOpen}) => {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openComment, setOpenComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likes,setLikes] = useState([]);
    const [liked,setLiked] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let unsubscribe ;let unsubscribe1 ;
        if(postId){
            unsubscribe = db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snap) => {
                setComments(snap.docs.map(doc => doc.data()));
            });

            unsubscribe1 = db.collection("posts")
            .doc(postId)
            .collection("likes")
            .onSnapshot((snap) => {
                setLikes(snap.docs.map((doc) => ({id:doc.id,like:doc.data()})));
            })
        
        }
        return () => {
            unsubscribe1();
            unsubscribe();
        }
    }, [postId])


    const post = (e) => {
        e.preventDefault();

        if(user?.displayName){
            if(comment!=='' || comment.trim()!==''){
                db.collection('posts').doc(postId).collection('comments').add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    text: comment,
                    username: user.displayName
                });
                setComment('');
            }
        }else{
            setOpen(true);
        }

    }

    const handleClose = () => {
        setOpenComment(false);
    };

    const handleOpenComment = () => {
        setOpenComment(true);
    }

    const handleLike = () => {
        if(user?.displayName){
            setLiked(!liked);
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            },1000);
            // if(liked){
            //     db.collection('posts').doc(postId).collection('likes').add({
            //         like: true,
            //         username: user.displayName
            //     });
            // }
            // else{
            //     let id;
            //     likes.map((like) => {
            //         if(like?.like?.username === user?.displayName){
            //             id = liked.id;
            //         } 
            //     })
            //     db.collection('posts').doc(postId).collection('likes').doc(id).set({
            //         like: false,
            //         username: user.displayName
            //     });
            // }
        }
        else{
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
                    onDoubleClick={handleLike}
                />
                <div className="like_status">
                    {
                        liked ?
                        visible && <FavoriteIcon style={{fontSize:"100px",color:"red"}} onClick={handleLike}/>
                        : visible &&  <FavoriteBorderIcon style={{fontSize:"100px"}} onClick={handleLike}/>
                    }
                </div>
            </div>

            <div className="acts">
                <div className="icon">
                    {
                        liked ?
                        <FavoriteIcon style={{color:"red"}} onClick={handleLike}/>
                        : 
                        <FavoriteBorderIcon onClick={handleLike}/>
                    }
                </div>
                <div className="icon">
                    <CommentIcon onClick={handleOpenComment}/>
                </div>
                <div className="icon">
                    <TelegramIcon />
                </div>
            </div>

            <div className="likes">
                <strong>{likes.length} {likes.length>1 ? 'likes' : "like" }</strong>
            </div>
            
            <h4 className="post_text">
                <strong>{username} </strong> {caption}
            </h4>

            <div className="display_comment">
               {
                   comments.length > 0 ?
                   <h3 style={{cursor:"pointer"}} onClick={handleOpenComment}>View All {comments.length} Comments</h3> 
                   : null
               }
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
            <Modal
                open={openComment}
                onClose={handleClose}
                >
                <div style={modalStyle} className={classes.paper}>
                    <Comments comments={comments} comment={comment} setComment={setComment} post={post}/>
                </div>
            </Modal>

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
