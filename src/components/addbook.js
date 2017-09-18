import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header/header';
import Footer from './Footer/footer';


import { saveBooks } from '../actions/books';

import validateBook from './utils/validateBook';
import { addFlashMessage } from '../actions/flashmessages';
import FlashMessagesList from './flash/FlashMessagesList';

/* eslint-disable require-jsdoc */
class AddBook extends Component {
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
            console.log(this.state);
            this.props.saveBooks(this.state).then(
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
        const { errors, isLoading } = this.state;
        // title, description, category, author, isbn, edition, publisher, size, quantity, image,
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div><h3>Add New Book</h3></div>
                    <FlashMessagesList />

                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                    <form onSubmit={this.onSubmit} className="form-me form-responsive">

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
                            <input type="file" name="image" value={this.state.image} onChange={this.onChange} className="form-control"/>
                            {errors.image && <span className="help-text">{errors.image}</span> }
                        </div>
                        <button type="submit" className="btn btn-info btn-lg" disabled={isLoading} >Create Book</button>

                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}


AddBook.protoTypes = {
    saveBooks: PropTypes.func.isRequired
};
AddBook.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(null, { saveBooks, FlashMessagesList, addFlashMessage })(AddBook);

