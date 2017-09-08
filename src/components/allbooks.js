import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
class Books extends Component {

  render() {
    return (
      <div>
           <Header />
           <div className="container">
             <div><h3>Our Collection</h3></div>
             <div className="row">
               <div className="col-md-3">
                 <a href={'/singlebook'}>
                   <div className="bookbox">
                     <img src="images/cook.jpeg" className="bookcover" />
                     <div className="booktitle">My Nigerian Cookbook</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Cooking</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good... </div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href={'/singlebook'}>
                   <div className="bookbox">
                     <img src="images/tales.jpg" className="bookcover" />
                     <div className="booktitle">Tales By Moonlight</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good..
                     </div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href="singlebook.html">
                   <div className="bookbox">
                     <img src="images/butterfly.png" className="bookcover" />
                     <div className="booktitle">Tales By Moonlight</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Cooking</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good...
                     </div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href="singlebook.html">
                   <div className="bookbox">
                     <img src="images/home.png" className="bookcover" />
                     <div className="booktitle">Tales By Moonlight</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good..
                     </div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href="singlebook.html">
                   <div className="bookbox">
                     <img src="images/butterfly.png" className="bookcover" />
                     <div className="booktitle">Tales By Moonlight</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good..
                     </div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href="singlebook.html">
                   <div className="bookbox">
                     <img src="images/home.png" className="bookcover" />
                     <div className="booktitle">Tales By Moonlight</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good...
                     </div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href="singlebook.html">
                   <div className="bookbox">
                     <img src="images/cook.jpeg" className="bookcover" />
                     <div className="booktitle">My Nigerian Cookbook</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good...</div>
                   </div>
                 </a>
               </div>
               <div className="col-md-3">
                 <a href="singlebook.html">
                   <div className="bookbox">
                     <img src="images/tales.jpg" className="bookcover" />
                     <div className="booktitle">My Nigerian Cookbook</div>
                     <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                     <div className="description">This books contains all the delicious nigerian food recipes with good...
                     </div>
                   </div>
                 </a>
               </div>
             </div>
           </div>
           <Footer />
         </div>
    );
  }
}

export default Books;
