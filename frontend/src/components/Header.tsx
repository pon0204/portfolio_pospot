import { useAuth0 } from "@auth0/auth0-react";
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from "axios";
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useMutateUser } from '../hooks/castomHook/useMutateUser';
import { setHeaders } from '../slices/headersSlice';
import { selectAvatar, setCurrentAvatar } from "../slices/profileSlice";
import defaultPhoto from '../image/profile_default.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const {isAuthenticated,loginWithRedirect,logout } = useAuth0();
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently }:any = useAuth0();
  const { userIdMutation } = useMutateUser()
  const currentUserId = localStorage.getItem('currentUserId')
  const avatar = useAppSelector(selectAvatar)
  
  const removeUserId = () =>{
    localStorage.removeItem('currentUserId')
  }

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_REST_URL}/profiles/${currentUserId}`)
    .then((res)=>
    dispatch(setCurrentAvatar(res.data.profile.avatar_url))
    )
  },[])

  useEffect(() => {
    const getToken = async () => {
    try{
      const accessToken = await getAccessTokenSilently({
      });
      dispatch(setHeaders(accessToken))
      userIdMutation.mutate()
    }
    catch(e){
      console.log(e.message)
  } 
}
getToken()
  }, [])
  console.log(avatar)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div className='h-14 p-4 flex justify-between'>
          <Link to="/posts">
            投稿一覧
          </Link>
          {isAuthenticated ?
          (
            <div className='flex items-center'>
            <Link to={`/profile/${currentUserId}`}>
              { avatar ?
              <img src={avatar} alt="" className='block rounded-full w-10 h-10 mr-4'/>
              :
              <img src={defaultPhoto} alt="" className='block rounded-full w-10 h-10 mr-4'/>
              }
            </Link>
            <button className='text-right' color="inherit" onClick={() => 
            {
              logout({ returnTo: window.location.origin })
              removeUserId()
            }
            }
              >ログアウト</button>
            </div>
          ):(
            <button className='text-right' color="inherit" onClick={loginWithRedirect}>ログイン</button>
          )
          }
        </div>
      </AppBar>
    </div>
  );
}