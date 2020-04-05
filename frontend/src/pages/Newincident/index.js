import React, {useState} from 'react'
import './style.css'
import {Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Logo from '../../assets/images/logo.svg'

import api from  '../../services/api'

export default function Register(){

  const ongId = localStorage.getItem('ongId')
  const history = useHistory()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

 async function hendleNewIncident(e){
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try{
       await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
       })

       history.push('/profile')

    } catch(error){
      alert('Erro ao cadastra caso, tente novamente')
    }
  }

  return(
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={Logo} alt="logo"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para enncontrar um heŕoi para resolver isso.</p>          
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para a HOME</Link>
        </section>
        <form> 
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}

          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value) }

          />
          <input 
            placeholder="valor em Real"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          
          <button
            className="button" 
            type="submit"
            onClick={hendleNewIncident}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}