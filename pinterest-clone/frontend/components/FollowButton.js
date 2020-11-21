import { useState, useEffect } from 'react'
import axios from 'axios'
import SecondaryButton from '~/components/SecondaryButton'
import Cookies from 'js-cookie'
export default function FollowButton({ user }){
  let [isFollowing, setIsFollowing] = useState(false)

  useEffect( () => {
    if(user){
      setIsFollowing(user.is_following)
    }
  }, user)

  function follow(){
    try{
      axios.post(`/user/${user.username}/follow/`, {}, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      setIsFollowing(true)
    } catch(e){
      console.log(e)
    }
  }
  function unfollow(){
    try{
      axios.post(`/user/${user.username}/unfollow/`, {}, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      setIsFollowing(false)
    } catch(e){
      console.log(e)
    }
  }
  if(isFollowing){
    return <SecondaryButton onClick={unfollow}>Following</SecondaryButton>
  }
  else {
    return <SecondaryButton onClick={follow}>Follow</SecondaryButton>
  }
}
