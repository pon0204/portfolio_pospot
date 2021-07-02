import CircularProgress from '@material-ui/core/CircularProgress'
import React, { VFC } from 'react'
import { useQueryPostShow } from '../../hooks/reactQuery/useQueryPostShow'

const PostShow: VFC<any> = ({match}) => {
  const id = match.params.postId
  
  const { status, data } = useQueryPostShow(id)
  const post = data?.post
  const spot = data?.spot
  const image_url = data?.image_url
  
  let map_url = ''

  if(status == 'success'){
  map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${spot.name} ${spot.place}`
  }
  
  let genres = post?.genre  

  if(genres){
    genres = genres.split(',')
    genres = genres.slice(0,5)
  }else {
    genres = null
  }

  if (status === 'loading') return (<div>
    <CircularProgress />
  </div>  )
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div className='w-full px-2 lg:w-1/2 lg:mx-auto'>
      <h2 className='mt-10 text-4xl text-gray-700 font-bold text-center'>{post.title}</h2>
      <p className='mt-4 text-lg text-gray-600 text-center'>{post.created_at.substring(0,post.created_at.indexOf('T'))}</p>
      <div className="flex my-4">
          <div className="bg-red-200  rounded-md p-2 text-center mx-2">
            {post.with}
          </div>
          {genres?.map((genre:string) => (
          <div className="bg-green-200 mx-2 rounded-md p-2 ">
          {genre}
          </div>
          ))} 
          </div>
      <img src={image_url} className='block mx-auto object-cover w-full' alt="" />

      <div className='bg-gray-50 p-4 mt-3 rounded-md'>
      <h3 className="text-xl font-bold">説明</h3>
      <p className="text-lg mt-4">{post.caption}</p>
      </div>
      
      <div className='mt-4 bg-green-50 rounded-md p-4'>
      <h3 className="text-xl font-bold">マップ情報</h3>
      <p className='mt-4 text-lg'>【スポット名】<br/>{spot.name}</p>
      <p className='mt-4 text-lg'>【場所】<br/>{spot.place_detail}</p>
      <p className='mt-4 text-lg'>【ウェブサイト】<br/><a className='text-blue-700' href={spot.web_url}>{spot.name}</a></p>
      </div>
      <iframe className='mt-4' src={map_url}  scrolling="no" width="100%" height="600"></iframe>

    </div>
  )
}

export default PostShow
