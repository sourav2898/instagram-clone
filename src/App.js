import {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import Login from './Login'
import SignUp from './SignUp'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button, CircularProgress } from '@material-ui/core';
import ImageUpload from './ImageUpload';

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

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [loading, isLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts,setPosts] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenSignUp = () => {
    setOpen(false);
    setOpenSignUp(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleLogOut = () => {
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
        if(authuser){
            // user has logged in...
            console.log(authuser);
            setUser(authuser);
        }
        else{
            // user has logged out
            setUser(null);
        }
    }) 

    return () => {
        // some cleanup actions
        unsubscribe()
    }
}, [user])

const signup = (email, password,username) => {
  console.log(email, password);
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
    setOpenSignUp(false);  
    return authUser.user.updateProfile({
          displayName: username
      })
  })
  .catch((error) => alert(error.message))

}

const login = (email, password) => {
  auth.signInWithEmailAndPassword(email,password)
  .then(() => {
    setOpen(false);
  })
  .catch((error) => alert(error.message))
}

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map(doc => ({id:doc.id, post:doc.data()})))
      isLoading(false);
    })
  }, [])

  return (
    <div className="app">
      <div className="app_header">
        <img 
          width="100px"
          className="logo"
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          alt="Instagram"
        />
        <div className="actions">
        {
          user ? 
          <div className="signed">
            <Button className="logout" variant="contained" color="primary" onClick={handleLogOut}>
              Sign Out
            </Button>
            <Avatar 
                className="post_avatar"
                alt={user.displayName.toUpperCase()}
                src="/static/img/avatar/1.jpg"
            />
          </div>
          :
          <>
            <Button className="singin" variant="contained" color="primary" onClick={handleOpen}>
              Sign In
            </Button>
            <Button className="signup" color="secondary" onClick={handleOpenSignUp}>
              Sign Up
            </Button>
          </>
        }
        </div>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Login signin={login}/> 
          </div>
        </Modal>
        <Modal
          open={openSignUp}
          onClose={handleCloseSignUp}
        >
          <div style={modalStyle} className={classes.paper}>
            <SignUp signup={signup} /> 
          </div>
        </Modal>
      </div>
      {
        loading 
        ?
        <div className='loader'>
          <CircularProgress />
        </div>
        :
        posts.map(({id, post:{imageUrl,caption,username}}) => {
          return <Post 
                    key={id}
                    postId={id}
                    user={user}
                    imageUrl={imageUrl}
                    username={username}
                    caption={caption}   
                    setOpen={setOpen}
                  />
        })
      }

      <ImageUpload username={user?.displayName}  
                    setOpen={setOpen}/>


      {/* {
        user?.displayName
        ?
        <ImageUpload username={user?.displayName}/>
        :
        <h3>Login to upload</h3>
      } */}
    </div>
  );
}

export default App;
