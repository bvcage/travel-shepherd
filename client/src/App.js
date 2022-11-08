import './assets/css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// pages
import HomePage from './home/HomePage'
import Template from './home/Template'
import DestinationsPage from './destinations/DestinationsPage'
import DestinationSummaryPage from './destinations/DestinationSummaryPage'
import LandingPage from './home/LandingPage'
import RedirectPage from './home/RedirectPage'
import TripSummaryPage from './trips/TripSummaryPage'
import UserTripsPage from './users/UserTripsPage'

// components
import InviteForm from './trips/invites/NewInviteForm'
import Login from './home/Login'
import NewTripForm from './trips/NewTripForm'
import Signup from './home/Signup'
import TripsContainer from './users/UserTripsContainer'
import UserEditForm from './users/UserEditForm'
import UserProfile from './users/UserProfile'
import TripEditForm from './trips/EditTripForm'
import NewProposalForm from './trips/proposals/NewProposalForm'
import ProposalSummaryPage from './trips/proposals/ProposalSummaryPage'
import EditProposalForm from './trips/proposals/EditProposalForm'
import VotingSummaryPage from './trips/voting/VotingSummaryPage'
import VotingPage from './trips/voting/VotingPage'
import NewDestinationForm from './destinations/NewDestinationForm'
import TripActivitiesPage from './trips/activities/TripActivitiesPage'

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
                  <Route path='new' element={<NewDestinationForm />} />
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
                        <Route path='new' element={<NewProposalForm />} />
                        <Route path=':id'>
                           <Route index element={<ProposalSummaryPage />} />
                           <Route path='edit' element={<EditProposalForm />} />
                        </Route>
                     </Route>
                     <Route path='activities' element={<TripActivitiesPage />} />
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