import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './Header.scss'
import { ServiceSearch } from './ServiceSearch.js'

export const Header = () => {

  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState([])
  const [display, setDisplay] = useState('display')
  const navigate = useNavigate()

  useEffect(()=>{

    const usersSearch = async () =>{
      const res = await ServiceSearch(search)

      if(res.data.length > 7){
        res.data.splice(7, res.data.length)
      }

      setSearched(res.data)
    }
    usersSearch()

  },[search])

  // const onBlur = (e) =>{
  //   setDisplay('display')
  //   e.target.value = ''
  // }

  const resetInput = () => {
    setDisplay('display')
  }

  const profileRoute = (element) => {
    setDisplay('display')
    navigate(`/profile/${element._id}`)
    setSearch('')
  }

  return (
    <div className='header'>
      <div className='divInput'>
        <input type='text' placeholder='Busca gente en nomad' onChange={(e)=>setSearch(e.target.value)} onFocus={()=>setDisplay('x')}/>
        <CloseCircleOutlined className='closeBtn' onClick={resetInput} />
      </div>
      <div className='divSearch' id={display}>
      {searched.length == 0 && <div className='noFounds'>No se han encontrado resultados</div>}
      {searched.map((element, index)=>(
        <div className='searched' key={`searched ${index}`} onClick={()=>profileRoute(element)}>
          <div className='divImg'>
            {element.avatar.length > 0 ? <img src={element.avatar}/> : <img src='https://static.vecteezy.com/system/resources/previews/007/409/979/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg'/>}
          </div>
          <div>
            {element.displayName}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
