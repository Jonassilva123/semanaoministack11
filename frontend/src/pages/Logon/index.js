import React, {useState} from 'react'
import './style.css'
import HeroesImg from '../../assets/images/heroes.png'
import Logo from '../../assets/images/logo.svg'
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'


export default function Logon() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function hendleLogin(e){
    e.preventDefault()

    try {
      const response = await api.post('/sessions', { id })

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')

      
    }catch(error) {
        alert('Falha no login')
    }

  }


  return(
    <div className="logon-container">
      <section className="form">
        <img src={Logo} alt="Logo"/>

        <form onSubmit={hendleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro</Link>
        </form>
      </section>

      <img src={HeroesImg} alt="Heroes"/>
    </div>
  )
}