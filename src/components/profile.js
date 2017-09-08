import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
class Profile extends Component {

  render() {
    return (
      <div>
           <Header />
           <div className="container container-me">
           <div><h3>My Profile</h3></div>
           <img src className="big-usr-img" />
           <div className="mydetails">
             <h4>Username : Abisoph</h4> 
             <h4>Name  : Abioye Sofiat</h4> 
             <h4>Email Address : abioye.sofiat@outlook.com</h4>
             <input type="submit" defaultValue="Change Password" className="btn btn-info" />
             <hr />
           </div>
           <h3>Borrowed Books</h3>
           <div className="row row-history">
             <div className="col-md-4">
               <img src="images/cook.jpeg" className="bookcover" />
             </div>
             <div className="col-md-4"><h4>My Nigerian Cookbook</h4>
               <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Cooking</div>
               This books contains all the delicious nigerian food recipes with good descriptions that are easy to follow
             </div>
             <div className="col-md-4">
               <div className="borrow-history">
                 <div> Rent Date: <b>24th of July, 2017</b></div> 
                 <div> Return Due Date: <b>31th of July, 2017</b></div> 
                 <input type="submit" className="btn btn-lg btn-info btn-borrow" defaultValue="Return Book" />
               </div>
             </div>
           </div>
           <div className="row row-history">
             <div className="col-md-4">
               <img src="images/butterfly.png" className="bookcover" />
             </div>
             <div className="col-md-4"><h4>The Dreamers</h4>
               <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
               This books contains all the delicious nigerian food recipes with good descriptions that are easy to follow
             </div>
             <div className="col-md-4">
               <div className="borrow-history">
                 <div> Rent Date: <b>12th of July, 2017</b></div> 
                 <div> Return Due Date: <b>28th of July, 2017</b></div> 
                 <input type="submit" className="btn btn-lg btn-info btn-borrow" defaultValue="Return Book" />
               </div>
             </div>
           </div>
         </div>
           <Footer />
         </div>
    );
  }
}

export default Profile;
