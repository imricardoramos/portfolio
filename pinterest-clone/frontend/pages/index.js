import {useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import MainLayout from '~/layouts/MainLayout'
import Feed from '~/components/Feed'
import LoginForm from '~/components/LoginForm'
import SignupForm from '~/components/SignupForm'
import { useIsAuthenticated } from '~/providers/Auth'

export default function Home() {
  let isAuthenticated = useIsAuthenticated()
  let [loginFormVisibility, setLoginFormVisibility] = useState("block")
  let [signupFormVisibility, setSignupFormVisibility] = useState("hidden")
  let [pinsData, setPinsData] = useState(new Array(20).fill([
    {
      imgSrc: "https://i.pinimg.com/564x/1f/d3/63/1fd36337c53a1ffab5080a3e1f2711d7.jpg",
      detailLink: "/pin/1"
    },
    {
      imgSrc: "https://i.pinimg.com/236x/66/e9/bd/66e9bd4a5b62051ba232b1446f888f4d.jpg",
      detailLink: "/pin/2"
    },
    {
      imgSrc: "https://i.pinimg.com/564x/ad/21/81/ad218164a733eec869cd68738aeea611.jpg",
      detailLink: "/pin/3"
    }
  ]).flat())

  useEffect( async () => {
    const response = await axios.get("/pin/")
    setPinsData(response.data)
  }, [])

  if(isAuthenticated){
    return (
      <MainLayout>
        <Feed pins={pinsData} />
      </MainLayout>
    )
  }
  return (
    <>
      <LoginForm 
        className={loginFormVisibility}
        onClickOutside={() => {}}
        onSignupClick={() => {setLoginFormVisibility("hidden"); setSignupFormVisibility("visible") }}
      />
      <SignupForm
        className={signupFormVisibility}
        onClickOutside={() => {}}
        onLoginClick={() => {setLoginFormVisibility("visible"); setSignupFormVisibility("hidden") }}
      />
    </>
  )
}
