import {VFC} from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectProfile } from '../../../slices/profileSlice'
import { useMutateUser } from '../../../hooks/castomHook/useMutateUser'


const FormButton:VFC = () => {
  const editedProfile = useAppSelector(selectProfile)
  const { profileUpdateMutation } = useMutateUser()

  const profileUpdateClick = () => {
    const data: any = new FormData()
    data.append('nickname',editedProfile.nickname)
    data.append('introduction',editedProfile.introduction)
    data.append('gender',editedProfile.gender)
    data.append('avatar',editedProfile.avatar)
    profileUpdateMutation.mutate(data,editedProfile.id)
  }

  // if(editedSpot.spot.name != '') return (
  //   <button className="bg-red-500 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
  //   onClick={postCreateClick}
  //   >投稿</button>
  return (
    <button className="bg-red-500 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
    onClick={profileUpdateClick}
    >更新</button>
  )
}

export default FormButton