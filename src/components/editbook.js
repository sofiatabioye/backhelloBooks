import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
class EditBook extends Component {

  render() {
    return (
      <div>
           <Header />
           <div className="container container-me">
           <div><h3>Edit Book</h3></div>
           <form className="form-me">
             <img src className="big-usr-img" />
             <div className="form-group">
               <h6>Title</h6>
               <input type="textbox" placeholder="Title" className="form-control" name="title" />
               <h6>Description</h6>
               <input type="textbox" placeholder="Description" className="form-control" name="description" />
               <h6>Category</h6>
               <select name="category" placeholder className="form-control">
                 <option value="-Select-">Select Category</option>
                 <option id="rm" value="it">IT</option>
                 <option id="rm" value="education">Education</option>
                 <option id="rm" value="career">Career</option>
                 <option id="rm" value="business">Business</option>
                 <option id="rm" value="religion">Religion</option>
               </select>
               <h6>Quantity</h6>
               <input type="number" name="quantity" className="form-control" min={1} />
               <h6>Image (Book Cover)</h6>
               <input type="file" name="image" className="form-control" />
             </div>
             <input type="submit" className="btn btn-info btn-lg" defaultValue="Add Book" />
           </form>
         </div>
           <Footer />
         </div>
    );
  }
}

export default EditBook;
