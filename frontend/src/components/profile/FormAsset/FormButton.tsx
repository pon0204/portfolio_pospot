import { VFC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { useMutateUser } from '../../../hooks/castomHook/useMutateUser'
import { selectProfile } from '../../../slices/profileSlice'

const FormButton:VFC = () => {
  const currentUserId = localStorage.getItem('currentUserId')
  const editedProfile = useAppSelector(selectProfile)
  const { profileUpdateMutation } = useMutateUser()

  const profileUpdateClick = () => {
    const data: any = new FormData()
    data.append('nickname',editedProfile.nickname)
    data.append('introduction',editedProfile.introduction)
    data.append('gender',editedProfile.gender)
    data.append('avatar',editedProfile.avatar_url)
    profileUpdateMutation.mutate(data)
  }

  return (
    <button className="bg-red-500 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
    onClick={profileUpdateClick}
    >更新</button>
  )
}

export default FormButton
