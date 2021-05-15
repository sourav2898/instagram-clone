import { Button } from '@material-ui/core';
import React, {useState} from 'react'
import {storage, db} from '../firebase'
import './ImageUpload.css';
import firebase from 'firebase';

const ImageUpload = ({username,setOpen}) => {

    const [caption, setCaption] = useState('')
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState(0);
    const [error,setError] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            setError('');
        }
    }

    const handleUpload = () => {

        if(!username){
            setOpen(true);
        }

        else if(image === null || image==='' || image===undefined) {
            setError('Please choose an image');
        }

        else{
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                // progress function....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                // Error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function....
                storage.ref('images')
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                    alert("Hurray!! Uploaded Successfully..");
                    document.getElementById('file').value='';
                    window.scrollTo(500,0);
                })
            }
            )
        }
    }
        
    return (
        <div className="image_upload">
            <p className="title"> Upload Image </p>
            <progress value={progress} max="100"/>
            <textarea className="caption" type="text" value={caption} placeholder="Enter a caption" onChange={(e) => setCaption(e.target.value)} />
            <input id="file" className="file" type="file" accept="image/*" onChange={handleChange}/>
            {error && <p className="error">{error}</p>}
            <Button className="upload" style={{margin:"10px"}} variant='contained' color="secondary" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
