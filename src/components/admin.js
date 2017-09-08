import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
class AdminBooks extends Component {

  render() {
    return (
      <div>
           <Header />
           <div className="container">
           <div><h3>Our Collection</h3></div>
           <div className="row">
             <div className="col-md-3">
               <a href="addbook.html">
               </a><div className="bookbox"><a href="addbook.html">
                   <span className="bookcover" /><span className="glyphicon glyphicon-plus-sign glyphicon-add" />
                 </a><div className="booktitle-admin"><a href="addbook.html" /><a href="#" className="btn btn-lg btn-info">Add New Book</a></div>
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href="editbook.html"><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/tales.jpg" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good..</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/cook.jpeg" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good..</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/home.png" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good..</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/butterfly.png" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good..</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/cook.jpeg" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good bla bla bla</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/home.png" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good..</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
             <div className="col-md-3">
               <div className="bookbox">
                 <div className="editbook"><a href><span className="glyphicon glyphicon-edit" />Edit</a></div>
                 <a href="singlebook.html">
                   <img src="images/butterfly.png" className="bookcover-admin" />
                   <div className="booktitle">Tales By Moonlight</div>
                   <div className="bookcat"><span className="glyphicon glyphicon-tag" /> Children</div>
                   <div className="description">This books contains all the delicious nigerian food recipes with good..</div>
                 </a>
                 <div className="editbook">        
                   <a href="#"><span className="glyphicon glyphicon-trash" />Delete</a></div>     
               </div>
             </div>
           </div>
         </div>
           <Footer />
         </div>
    );
  }
}

export default AdminBooks;
