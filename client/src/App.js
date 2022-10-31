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
import RedirectPage from './pages/RedirectPage'
import InviteForm from './components/forms/InviteForm'

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
                  </Route>
               </Route>
               <Route path='trips'>
                  <Route index element={<RedirectPage path='/:username/trips' />} />
                  <Route path='new' element={<NewTripForm />} />
                  <Route path=':id'>
                     <Route index element={<TripSummaryPage />} />
                     <Route path='invite' element={<InviteForm />} />
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