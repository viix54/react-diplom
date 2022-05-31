import {Header} from './Components/Header'
import {Footer} from './Components/Footer'
import {Shop} from './Components/Shop'
import {NotFound} from './Components/NotFound'
import {Authorisation} from './Components/Authorisation'
import { Registration } from './Components/Registration'
import {Profil} from './Components/Profil'
import {TableUsers} from './Components/Admin/TableUsers'
import { TableOrders } from './Components/Admin/TableOrders'
import { Recomendation } from './Components/Recomendation'

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {
  return <>
    <Router>
      <Header/>
        <main className='container content'>
          <Routes>
            <Route path='/' element={<Shop />}/>
            <Route path='/:idrec' element={<Shop />}/>
            <Route path='/login' element = {<Authorisation/>}/>
            <Route path='/registr' element = {<Registration/>} />
            <Route path='/profil' element = {<Profil/>}/>
            <Route path='/tableUsers' element = {<TableUsers/>}/>
            <Route path='/tableOrders' element={<TableOrders/>}/>
            <Route path='/recomendation' element={<Recomendation />}/>
            <Route path='*'element={<NotFound/>}/>
          </Routes>
        </main>
      <Footer/>
    </Router>
  </>

  
}

export default App;
