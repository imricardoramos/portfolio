import { useState } from 'react'
import Modal from './Modal'
import PrimaryButton from './PrimaryButton'

export default function SignupForm(props){
  let [username, setUsername] = useState("")
  let [email, setEmaul] = useState("")
  let [password, setPassword] = useState("")

  function signupUser(e){
    e.preventDefault()
    axios.post("/rest-auth/login/", {
      username: username,
      email: email,
      password1, password,
      password2, password,
    })
  }
  return (
    <Modal className={props.className} onClickOutside={props.onClickOutside}>
      <form onSubmit={signupUser} className="p-10 text-center">
        <h1 className="text-3xl font-bold">Welcome to Pinterest (Clone)</h1>
        <h2>Find new ideas to try</h2>
        <input onChange={(e) => setUsername(e.target.value)} value={username} name="username" type="text" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Username" />
        <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="text" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Email" />
        <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" type="password" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Password" />
        <PrimaryButton className="block w-64 mx-auto">Continue</PrimaryButton>
      </form>
      <hr className="mx-auto w-4/5" />
      <div onClick={props.onLoginClick}  className="cursor-pointer py-5 text-center">Already a member? Login</div>
    </Modal>
  )
}
