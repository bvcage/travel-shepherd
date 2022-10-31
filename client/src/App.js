import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// pages
import HomePage from './pages/HomePage'
import Template from './pages/Template'
import LandingPage from './pages/LandingPage'
import TripSummaryPage from './pages/TripSummaryPage'
import UserTripsPage from './pages/UserTripsPage'

// components
import InviteTravelersForm from './features/trips/InviteTravelersForm'
import Login from './components/Login'
import NewTripForm from './features/trips/NewTripForm'
import Signup from './components/Signup'
import TripsContainer from './components/containers/TripsContainer'
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
                  <Route path='trips' element={<UserTripsPage />}>
                     <Route index element={<TripsContainer />} />
                     <Route path='new'>
                        <Route index element={<NewTripForm />} />
                        <Route path='invite' element={<InviteTravelersForm />} />
                     </Route>
                     <Route path=':id' element={<TripSummaryPage />} />
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