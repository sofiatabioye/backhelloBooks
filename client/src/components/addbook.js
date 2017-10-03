import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Header/header';
import Footer from './Footer/footer';
import { saveBooks } from '../actions/books';
import validateBook from './utils/validateBook';
import { addFlashMessage } from '../actions/flashmessages';
import FlashMessagesList from './flash/FlashMessagesList';


/**
 * 
 * @class AddBook
 * @extends {Component}
 */
class AddBook extends Component {
    /**
     * Creates an instance of AddBook.
     * @param {any} props 
     * @memberof AddBook
     */
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
            imageName: '',
            public_id: null,
            imageVersion: null,
            errors: {},
            isLoading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadWidget = this.uploadWidget.bind(this);
    }

    /**
     * 
     * @returns {changedInput} This saves input as it is changed
     * @param {any} e 
     * @memberof AddBook
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    /**
     * @returns {Image} This uploads the image to cloudinary
     * 
     * @memberof AddBook
     */
    uploadWidget() {
        console.log(this.state.public_id);
        cloudinary.openUploadWidget({ cloud_name: 'ddvm5tzhm', upload_preset: 'sxzf4j4p', tags: ['books'], public_id: this.state.public_id, version: this.state.imageVersion },
            (error, result) => {
                this.setState({
                    image: result[0].url,
                    imageName: result[0].original_filename,
                    public_id: result[0].public_id,
                    imageVersion: result[0].version,
                });
            });
    }

    /**
     * 
     * 
     * @returns  {validatedInput} This checks if form input is correct
     * @memberof AddBook
     */
    isValid() {
        const { errors, isValid } = validateBook(this.state);
        if (!isValid) {
            this.setState({ errors });
            return;
        }
        return isValid;
    }

    /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof AddBook
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
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


    /**
     * 
     * 
     * @returns {form} This shows the form to add a new book 
     * @memberof AddBook
     */
    render() {
        const { errors, isLoading } = this.state;
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div><h3>Add New Book</h3></div>
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
                            <div>
                                {this.state.imageName}
                            </div>
                            <div className="upload" id="filename">
                                <button onClick={this.uploadWidget.bind(this)} className="btn btn-primary btn-sm upload-button">

                                    {this.state.image === '' && <span>Add BookCover</span>}

                                    {this.state.image !== '' && <span>Change Book</span>}
                                </button>
                            </div>

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

