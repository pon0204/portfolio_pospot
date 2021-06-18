import React, {VFC} from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useQueryPosts } from '../../hooks/useQueryPosts'
import { selectUserToken,setToken } from "../../slices/userToken";
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { useEffect } from 'react';
import axios from 'axios';
import {PostCard} from './PostCard';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center'
  },
  margin: {
    margin: 10,
  },
}));


const Post: VFC = () => {    
  const classes = useStyles();
  const { status, data } = useQueryPosts()

    if (status === 'loading') return (
      <div className="flex justify-center flex-wrap">
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
        <Skeleton className={classes.margin} variant="rect" width={300} height={350} />
      </div>
      
    )
    if (status === 'error') return <div>{'Error'}</div>
    
  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((item:any) => (
        <div className="m-5 w-2/8">
          <PostCard item={item}/>
        </div>
      ))}
    </div>
  )
}

export default Post
