
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignUp from './pages/SignUp'
import CreateNote from './pages/CreateNote'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/create-note' element={<CreateNote/>}></Route>
      <Route path='*' element={<NotFoundPage/>}></Route>
    </Routes>
  )
}

export default App