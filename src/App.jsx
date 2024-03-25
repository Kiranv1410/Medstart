import './App.css'
import { Navbar,Container } from 'react-bootstrap'
import logo from './assets/medstart.png'
import { Routes,Route, useNavigate } from 'react-router-dom'
import More from './components/More'
import Home from './components/Home'
import Hospital from './components/Hospital'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigate = useNavigate()
 
  return (
    <div>
       <Navbar   style={{backgroundColor: '#024C76'}} >
        <Container  >
        <Navbar.Brand onClick={() => navigate('/') }  style={{cursor:"pointer"}} >
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
           <h5 style={{display:'inline' ,color:'whitesmoke'}} > MEDSTART </h5>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
      <Route path='/more/' element={<More/>} />
      <Route path='/hospital/' element={<Hospital/>} />
      </Routes>
    </div>
  )
}

export default App
