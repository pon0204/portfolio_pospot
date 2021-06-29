import React,{VFC} from 'react'
import axios from 'axios'

import { useMutateSpot } from '../hooks/castomHook/useMutateSpot'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectSpot } from '../slices/spotSlice'
import { selectPost } from '../slices/postSlice'
import { selectHeaders } from '../slices/headersSlice'
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient } from 'react-query'

const Test: VFC = () => {
  const { user, isAuthenticated, getAccessTokenSilently }:any = useAuth0();
  console.log(user)
  const headers = useAppSelector(selectHeaders)

  const Click = () =>{ 
    axios.get(`${process.env.REACT_APP_REST_URL}/profiles`)
    .then(res =>{
      console.log(res.data)
    })
  }

  const createClick = () => {
    axios.post(`${process.env.REACT_APP_REST_URL}/profiles/1/follows`,null,headers)
    .then(res =>{
      console.log(res)
    })
  }
  const deleteClick = () => {
    axios.delete(`${process.env.REACT_APP_REST_URL}/profiles/1/follows/1`,headers)
    .then(res =>{
      console.log(res)
    })
  }

  return (
    <div>
      <button onClick={Click}>ゲット</button>
      <br/>
      <button onClick={createClick}>クリエイト</button>
      <br/>
      <button onClick={deleteClick}>デリート</button>
    </div>
  )
}

export default Test
