
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignUp from './pages/SignUp'
import CreateNote from './pages/CreateNote'
import Denied from './pages/Denied'
import AdminHomePage from './pages/AdminHomePage'
import RequiredAuth from './pages/RequiredAuth'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/create-note' element={<CreateNote/>}></Route>
      <Route path='/denied' element={<Denied/>}></Route>
      <Route element={<RequiredAuth allowedRoutes={["ADMIN"]}/>}>
        <Route path='/admin' element={<AdminHomePage/>}>
        </Route>
      </Route>
      <Route element={<RequiredAuth allowedRoutes={["ADMIN","USER"]}/>}>
      <Route path='/profile' element={<Profile/>}></Route>
      </Route>
      <Route path='*' element={<NotFoundPage/>}></Route>
    </Routes>
  )
}

export default App