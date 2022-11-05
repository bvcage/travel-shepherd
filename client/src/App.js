import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// pages
import HomePage from './pages/HomePage'
import Template from './pages/Template'
import DestinationsPage from './pages/DestinationsPage'
import DestinationSummaryPage from './pages/DestinationSummaryPage'
import LandingPage from './pages/LandingPage'
import RedirectPage from './pages/RedirectPage'
import TripSummaryPage from './pages/TripSummaryPage'
import UserTripsPage from './pages/UserTripsPage'

// components
import InviteForm from './components/forms/InviteForm'
import Login from './components/Login'
import NewTripForm from './components/forms/NewTripForm'
import Signup from './components/Signup'
import TripsContainer from './components/containers/TripsContainer'
import UserEditForm from './components/forms/UserEditForm'
import UserProfile from './reducers/user/UserProfile'
import TripEditForm from './components/forms/TripEditForm'
import ProposalForm from './components/forms/ProposalForm'
import ProposalSummaryPage from './pages/ProposalSummaryPage'
import EditProposalForm from './components/forms/EditProposalForm'
import VotingSummaryPage from './pages/VotingSummaryPage'
import VotingPage from './pages/VotingPage'

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
               <Route path='destinations'>
                  <Route index element={<DestinationsPage />} />
                  <Route path=':id'>
                     <Route index element={<DestinationSummaryPage />} />
                  </Route>
               </Route>
               <Route path='trips'>
                  <Route index element={<RedirectPage path='/:username/trips' />} />
                  <Route path='new' element={<NewTripForm />} />
                  <Route path=':id'>
                     <Route index element={<TripSummaryPage />} />
                     <Route path='edit' element={<TripEditForm />} />
                     <Route path='invite' element={<InviteForm />} />
                     <Route path='proposals'>
                        <Route index element={<RedirectPage path='/trips/:trip_id' />} />
                        <Route path='new' element={<ProposalForm />} />
                        <Route path=':id'>
                           <Route index element={<ProposalSummaryPage />} />
                           <Route path='edit' element={<EditProposalForm />} />
                        </Route>
                     </Route>
                     <Route path='vote' element={<VotingPage />} />
                     <Route path='votes' element={<VotingSummaryPage />} />
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