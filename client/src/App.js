import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Template from './pages/Template'
import LandingPage from './pages/LandingPage'
import TripsPage from './pages/TripsPage'
import InviteTravelersForm from './features/trips/InviteTravelersForm'
import Login from './components/Login'
import NewTripForm from './features/trips/NewTripForm'
import Signup from './components/Signup'
import TripsContainer from './components/containers/TripsContainer'
import TripSummary from './features/trips/TripSummary'
import UserEditForm from './features/user/UserEditForm'
import UserProfile from './features/user/UserProfile'

function App () {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<Template />}>
               <Route index path='home' element={<LandingPage />} />
               <Route path=':username'>
                  <Route index path='profile' element={<UserProfile />} />
                  <Route path='edit' element={<UserEditForm />} />
                  <Route path='trips' element={<TripsPage />}>
                     <Route index element={<TripsContainer />} />
                     <Route path='new'>
                        <Route index element={<NewTripForm />} />
                        <Route path='invite' element={<InviteTravelersForm />} />
                     </Route>
                     <Route path=':id' element={<TripSummary />} />
                  </Route>
               </Route>
            </Route>
            <Route path='/welcome' element={<HomePage />}>
               <Route path='login' element={<Login />} />
               <Route path='signup' element={<Signup />} />
            </Route>
         </Routes>
      </Router>
   );
}

export default App;