//components
import './App.css';
import Nav from './components/Nav.js'
import Login from './components/Login.js'
import Profile from './components/Profile.js'
import Register from './components/Register.js'
import Welcome from './components/Welcome.js'
//packages
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'


function App() {
  // state holds user data if the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  // if navigates away automatically log them in
  useEffect (() => {
    //get the token from local storage
    const token = localStorage.getItem('jwtToken')
    //if check for token
    if (token) {
      setCurrentUser(jwt.decode(token))
    } else {
      //else set user in state to be null
      setCurrentUser(null)
    }
  }, [])
  // function to log the user out
  const handleLogout = () => {
    console.log('log the user out!')
    //delete the jwt thats in local storage
    if(localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
      // set the user in state to be null
      setCurrentUser(null)
    }
  }


  return (
    <Router>
      <header>
        <Nav 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>

      <div className="App"> 
        <Switch>
          <Route
            exact path='/'
            component={Welcome}
          />

          <Route
            path='/register'
            render={ props => <Register 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              {...props} /> } 
          />

          <Route
            path='/login'
            render={ props => <Login 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              {...props} /> } 
          />

          {/* conditionally render a redirect for auth locked routes */}
          <Route
            path='/profile'
            render={ props => currentUser ? <Profile 
              currentUser={currentUser}
              handleLogout={handleLogout}
              {...props} /> : <Redirect to='/login' /> } 
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
