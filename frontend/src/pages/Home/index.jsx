import { useEffect, useState, useRef } from 'react'
import './style.css'
import Lixeira from '../../assets/lixeira.png'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState ([])

  const inputEmail = useRef()
  const inputName = useRef()
  const inputAge = useRef()

  async function getUsers(){

    const usersFromAPI = await api.get('/usuario')
    
    setUsers(usersFromAPI.data)
    console.log(users)

  }

  async function createUser() {
    await api.post('usuario', {
      email: inputEmail.current.value,
      name: inputName.current.value,
      age: inputAge.current.value
    })

    getUsers()
  }

  async function deleteUser(id) {
    await api.delete(`/usuario/${id}`)

    getUsers()
  }


  useEffect (() => {
    getUsers()
  }, )

  return (
    <>
      <div className='Container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Email' name="email" type='email' ref={inputEmail}/>
          <input placeholder='Nome' name="nome" type='text' ref={inputName}/>
          <input placeholder='Idade' name="idade" type='number' ref={inputAge}/>
          <button type='button' onClick={createUser}>Cadastrar</button>
        </form>

      {users.map(user => (
        <><div key={user.id} className='card'>
          <p>Nome: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span> </p>
          <p>Idade: <span>{user.age}</span> </p>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Lixeira} className='trash' />
          </button>
        </div></>
      ))}




      </div>
    </>
  )
}

export default Home
