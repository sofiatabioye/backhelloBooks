/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header/header';
import Footer from './Footer/footer';
import { getBook, fetchBook } from '../actions/books';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashmessages';
import validateBook from './utils/validateBook';
import { updateBook } from '../actions/books';
import FlashMessagesList from './flash/FlashMessagesList';


class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        category: '',
        quantity: '',
        author: '',
        isbn: '',
        edition: '',
        publisher: '',
        size: '',
        image: '',
        errors: {},
        isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

    componentWillMount() {
      
        this.props.fetchBook(this.props.match.params.id);
    }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.book.books.title,
      description: nextProps.book.books.description,
      category: nextProps.book.books.category,
      isbn: nextProps.book.books.ISBN,
      size: nextProps.book.books.bookSize,
      quantity: nextProps.book.books.quantity,
      author: nextProps.book.books.author,
      edition: nextProps.book.books.bookEdition,
      publisher: nextProps.book.books.publisher,
      image: "none for now"
    })
  }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }
  isValid() {
    const { errors, isValid } = validateBook(this.state);
    if (!isValid) {
        this.setState({ errors });
        return;
    }
    return isValid;
}

  onSubmit(e) {
      e.preventDefault();
      if (this.isValid()) {
         
          this.props.updateBook(this.props.match.params.id, this.state).then(
              (res) => {
                  console.log(res);
                  this.context.router.history.push('/librarybooks');
              },
              (err) => {
                  this.setState({
                      isLoading: false
                  });
                  if (err.data) {
                      this.props.addFlashMessage({
                          type: 'error',
                          text: err.data.errors
                      });
                  }
              }
          );
      }
  }

    render() {
      const { errors, title, description, category, author, isbn, edition, publisher, size, quantity, image, isLoading } = this.state;
        return (
            <div>
                <Header />
                <div className="container container-me">
                <div><h3>Edit Book</h3></div>
                <FlashMessagesList />

                
                <form onSubmit= {this.onSubmit} className="form-me form-responsive">
              
                    <div className="form-group">
                    <h6>Title</h6>
                    <input type="textbox" placeholder="Title" value={this.state.title} onChange={this.onChange} className="form-control" name="title" required/>
                    <span className="help-text">{errors.title}</span>
                    <h6>Description </h6>
                    <input type="textbox" placeholder="Description" value={this.state.description} onChange={this.onChange} className="form-control" name="description" required />
                    {errors.description && <span className="help-text">{errors.description}</span> }
                    <h6>Category</h6>
                    <select name="category" placeholder value={this.state.category} onChange={this.onChange} className="form-control">
                        <option value="-Select-">Select Category</option>
                        <option id="rm" value="IT">IT</option>
                        <option id="rm" value="Education">Education</option>
                        <option id="rm" value="Career">Career</option>
                        <option id="rm" value="Business">Business</option>
                        <option id="rm" value="Religion">Religion</option>
                    </select>
                    {errors.category && <span className="help-text">{errors.category}</span> }
                    <h6>Author</h6>
                    <input type="textbox" placeholder="Author" value={this.state.author} onChange={this.onChange} className="form-control" name="author" required />
                    {errors.author && <span className="help-text">{errors.author}</span> }
                    <h6>ISBN</h6>
                    <input type="textbox" placeholder="ISBN" value={this.state.isbn} onChange={this.onChange} className="form-control" name="isbn" required />
                    {errors.isbn && <span className="help-text">{errors.isbn}</span> }
                    <h6>Edition</h6>
                    <input type="textbox" placeholder="Edition" value={this.state.edition} onChange={this.onChange} className="form-control" name="edition" required />
                    {errors.edition && <span className="help-text">{errors.eition}</span> }
                    <h6>Publisher</h6>
                    <input type="textbox" placeholder="Publisher" value={this.state.publisher} onChange={this.onChange}className="form-control" name="publisher" required />
                    {errors.publisher && <span className="help-text">{errors.publisher}</span> }
                    <h6>Book Size</h6>
                    <input type="textbox" placeholder="Size" value={this.state.size} onChange={this.onChange} className="form-control" name="size" required />
                    {errors.size && <span className="help-text">{errors.size}</span> }
                    <h6>Quantity</h6>
                    <input type="number" name="quantity" value={this.state.quantity} onChange={this.onChange} className="form-control" min={1} required />
                    {errors.quantity && <span className="help-text">{errors.quantity}</span> }
                     
                        <h6>Image (Book Cover)</h6>
                        
                        <input type="textbox" name="image" value={this.state.image} onChange={this.onChange} className="form-control"/>
                        {errors.image && <span className="help-text">{errors.image}</span> }
                    </div>
                    <button type="submit" className="btn btn-info btn-lg" disabled={isLoading} >SAVE</button>

                </form>
            </div>
                <Footer />
            </div>
        );
     
    }
}


EditBook.proptypes = {
    book: PropTypes.object.isRequired,
    fetchBook: PropTypes.func.isRequired,
    getBook: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired

};

EditBook.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    book: state.books
});



export default connect(mapStateToProps, { updateBook, getBook, addFlashMessage, fetchBook })(EditBook);

