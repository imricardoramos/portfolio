import { useState } from 'react'
import Modal from './Modal'
import PrimaryButton from './PrimaryButton'
import axios from 'axios'

export default function LoginForm(props){
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  function loginUser(e){
    e.preventDefault()
    axios.post("/rest-auth/login/", {
      email: email,
      password, password,
    })
  }
  return (
    <Modal className={props.className} onClickOutside={props.onClickOutside}>
      <form onSubmit={loginUser} className="p-10">
        <h1 className="text-3xl font-bold text-center">Welcome to Pinterest (Clone)</h1>
        <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="text" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Email" />
        <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" type="password" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Password" />
        <PrimaryButton className="block w-64 mx-auto">Log in</PrimaryButton>
      </form>
      <hr className="mx-auto w-4/5" />
      <div onClick={props.onSignupClick} className="cursor-pointer py-5 text-center">Not on Pinterest yet? Sign-up</div>
    </Modal>
  )
}
