import { useState } from 'react'
import Modal from './Modal'
import PrimaryButton from './PrimaryButton'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function CreateBoardModal(props){
  let [boardName, setBoardName] = useState("")
  async function createBoardSubmitHandler(e){
    e.preventDefault()
    const response = await axios.post("/board/", {
      name: boardName
    }, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken")
      }
    })
    let data = response.data
  }
  return (
    <Modal className={props.className} onClickOutside={props.onClickOutside}>
      <form onSubmit={createBoardSubmitHandler} className="p-4">
        <h1 className="text-xl font-bold text-center">Create Board</h1>
        <label className="text-sm">Name</label>
        <input onChange={e => setBoardName(e.target.value)} value={boardName} className="block w-full px-4 py-2 rounded-2xl border-2 border-gray-300" placeholder='Like "Places to Go" or "Recipes to Make"'/>
        <PrimaryButton className="block ml-auto mt-4">Create</PrimaryButton>
      </form>
    </Modal>
  )
}
