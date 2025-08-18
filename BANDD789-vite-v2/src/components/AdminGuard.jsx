import { Navigate } from 'react-router-dom'

export function isAuthed(){
  return localStorage.getItem('bandd789_auth') === '1'
}

export function loginAdmin(username, password){
  if(username === 'admin' && password === 'bandd789'){
    localStorage.setItem('bandd789_auth','1')
    return true
  }
  return false
}

export function logoutAdmin(){
  localStorage.removeItem('bandd789_auth')
}

export default function AdminGuard({ children }){
  if(!isAuthed()) return <Navigate to="/admin" />
  return children
}
