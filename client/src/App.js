import './assets/css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// pages
import HomePage from './home/HomePage'
import Template from './home/Template'
import DestinationsPage from './destinations/DestinationsPage'
import DestinationSummaryPage from './destinations/DestinationSummaryPage'
import LandingPage from './home/LandingPage'
import ProposalSummaryPage from './trips/proposals/ProposalSummaryPage'
import RedirectPage from './home/RedirectPage'
import TripActivitiesPage from './trips/activities/TripActivitiesPage'
import TripSummaryPage from './trips/trip/TripSummaryPage'
import UserTripsPage from './users/UserTripsPage'
import VotingPage from './trips/voting/VotingPage'
import VotingSummaryPage from './trips/voting/VotingSummaryPage'

// components
import InviteForm from './trips/invites/NewInviteForm'
import Login from './home/Login'
import NewTripForm from './trips/trip/NewTripForm'
import Signup from './home/Signup'
import TripsContainer from './users/UserTripsContainer'
import UserProfile from './users/UserProfile'
import TripEditForm from './trips/trip/EditTripForm'
import NewProposalForm from './trips/proposals/NewProposalForm'
import EditProposalForm from './trips/proposals/EditProposalForm'
import NewDestinationForm from './destinations/NewDestinationForm'
import DestinationActivitiesPage from './destinations/activities/DestinationActivitiesPage'
import NewDestinationActivityForm from './destinations/activities/NewDestinationActivityForm'

function App () {
   console.log('App render')
   return (
      <Router>
         <Routes>
            <Route path='/' element={<Template />}>
               <Route index path='home' element={< LandingPage />} />
               <Route path=':username'>
                  <Route index path='profile' element={<UserProfile />} />
                  <Route path='trips' element={<UserTripsPage />}>
                     <Route index element={<TripsContainer />} />
                  </Route>
               </Route>
               <Route path='destinations'>
                  <Route index element={<DestinationsPage />} />
                  <Route path='new' element={<NewDestinationForm />} />
                  <Route path=':id'>
                     <Route index element={<DestinationSummaryPage />} />
                     <Route path='activities'>
                        <Route index element={<DestinationActivitiesPage />} />
                        <Route path='new' element={<NewDestinationActivityForm />} />
                     </Route>
                  </Route>
               </Route>
               <Route path='trips'>
                  <Route index element={<RedirectPage path='/:username/trips' />} />
                  <Route path='new' element={<NewTripForm />} />
                  <Route path=':id'>
                     <Route index element={<TripSummaryPage />} />
                     <Route path='edit' element={<TripEditForm />} />
                     <Route path='activities' element={<TripActivitiesPage />} />
                     <Route path='invite' element={<InviteForm />} />
                     <Route path='proposals'>
                        <Route index element={<RedirectPage path='/trips/:trip_id' />} />
                        <Route path='new' element={<NewProposalForm />} />
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
               <Route index element={<Login />} />
               <Route path='signup' element={<Signup />} />
            </Route>
         </Routes>
      </Router>
   );
}

export default App;