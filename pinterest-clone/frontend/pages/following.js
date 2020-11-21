import { useState, useEffect  } from 'react'
import { useAuth } from '~/providers/Auth'
import axios from 'axios'
import MainLayout from '~/layouts/MainLayout';
import Feed from '~/components/Feed'
import PrimaryButton from '~/components/PrimaryButton'
import StackedAvatars from '~/components/StackedAvatars'
export default function Following() {
  let [pinsData, setPinsData] = useState([])
  let { loggedUserData } = useAuth()
  useEffect(async () => {
    const response = await axios.get("/pin/following/")
    setPinsData(response.data)
  }, [])

  return (
    <MainLayout>
      <div className="max-w-screen-md mx-auto my-10">
        <h1 className="text-2xl font-bold">From people you follow</h1>
        <StackedAvatars users={loggedUserData.following} />
        <PrimaryButton className="block ml-auto">Find people to follow</PrimaryButton>
      </div>
      <Feed pins={pinsData} includeFooter />
    </MainLayout>
  )
}
