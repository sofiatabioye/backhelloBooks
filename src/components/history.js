import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
class History extends Component {

  render() {
    return (
      <div>
           <Header />
           <div className="container container-me">
           <h3>Borrowed Books History</h3>
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
               <img src="images/tales.jpg" className="bookcover" />
             </div>
             <div className="col-md-4"><h4>Tales by Moonlight</h4>
               <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
               This books contains all the delicious nigerian food recipes with good descriptions that are easy to follow
             </div>
             <div className="col-md-4">
               <div className="borrow-history">
                 <h2>Returned</h2>
                 <div> Date Rented: <b>24th of May, 2017</b></div> 
                 <div> Date Returned: <b>31th of May, 2017</b></div>
               </div>
             </div>
           </div> 
           <div className="row row-history">
             <div className="col-md-4">
               <img src="images/home.png" className="bookcover" />
             </div>
             <div className="col-md-4"><h4>Tales by Moonlight</h4>
               <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
               This books contains all the delicious nigerian food recipes with good descriptions that are easy to follow
             </div>
             <div className="col-md-4">
               <div className="borrow-history">
                 <h2>Returned</h2>
                 <div> Date Rented: <b>24th of March, 2017</b></div> 
                 <div> Date Returned: <b>31th of March, 2017</b></div>
               </div>
             </div>
           </div> 
         </div>
           <Footer />
         </div>
    );
  }
}

export default History;
