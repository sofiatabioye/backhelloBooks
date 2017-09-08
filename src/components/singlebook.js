import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
class SingleBook extends Component {

  render() {
    return (
      <div>
           <Header />
           <div className="container container-me">
           <div><h3>All Nigerian CookBook</h3>
             <div className="row">
               <div className="col-md-3">
                 <img src="images/cook.jpeg" className="book_image" />
               </div>
               <div className="col-md-9 singlebook_details">This books contains all the delicious nigerian food recipes with good descriptions that are easy to follow</div>
               <div className="col-ava">Book Available
                 <input type="submit" defaultValue="Borrow Book" className="btn btn-lg btn-info" />
               </div>
             </div>
           </div>
         </div>
   
           <Footer />
         </div>
    );
  }
}

export default SingleBook;
