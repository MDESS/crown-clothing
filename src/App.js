import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import './App.css';

import HomePage from './pages/hompage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';



import Header from './components/header/header.component';


import { auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from  './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.slectors';




class App extends React.Component{

  unsubsribeFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        }); 
      }else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }


  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path = '/' component = { HomePage }/> 
          <Route path = '/shop' component = { ShopPage }/>
          <Route exact path = '/checkout' component = { CheckoutPage }/>
          <Route exact path = '/signin' render = {() => currentUser ? (<Redirect to='/' />) : (< SignInAndSignOutPage/>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
