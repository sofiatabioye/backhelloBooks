import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { addFlashMessage } from '../../actions/flashmessages';
import validateBook from '../utils/validateBook.jsx';
import { getBook, fetchBook, updateBook } from '../../actions/books';
import FlashMessagesList from '../flash/FlashMessagesList';

/**
 * 
 * 
 * @class EditBook
 * @extends {Component}
 */
class EditBook extends Component {
    /**
   * Creates an instance of EditBook.
   * @param {any} props 
   * @memberof EditBook
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
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadWidget = this.uploadWidget.bind(this);
    }

    /**
     * 
     * @returns {Book} The book to be edited
     * @memberof EditBook
     */
    componentDidMount() {
        this.props.fetchBook(this.props.match.params.id);
    }

    /**
     * 
     * @returns {Book} Recieves newly updated book
     * @param {any} nextProps 
     * @memberof EditBook
     */
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
            image: nextProps.book.books.image,
            imageName: nextProps.book.books.imageName,
            public_id: nextProps.book.books.public_id,
            imageVersion: nextProps.book.books.imageVersion,
        });
    }


    /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof EditBook
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    /**
     * 
     * 
     * @returns {validatedBook} This returns validated form input
     * @memberof EditBook
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
     * @returns {Image} Uploads Image to cloudinary and sends image information
     * @param {any} e 
     * @memberof EditBook
     */
    uploadWidget(e) {
        e.preventDefault();
        cloudinary.openUploadWidget({ cloud_name: 'ddvm5tzhm', upload_preset: 'sxzf4j4p', tags: ['books'], max_files: 1, },
            (error, result) => {
                this.setState({
                    image: result[0].secure_url,
                    imageName: result[0].original_filename,
                });
            });
    }


    /**
     * 
     * @returns {Book} Submits updated book
     * @param {any} e 
     * @memberof EditBook
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.props.updateBook(this.props.match.params.id, this.state).then(
                (res) => {
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
     * @returns {Book} to be edited
     * @memberof EditBook
     */
    render() {
        const { errors, isLoading } = this.state;
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div><h3>Edit Book</h3></div>
                    <div className="profile-userpic">
                        <img src={this.state.image} role="presentation" className="profile-img" />
                    </div>
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
                            {errors.edition && <span className="help-text">{errors.edition}</span> }
                            <h6>Publisher</h6>
                            <input type="textbox" placeholder="Publisher" value={this.state.publisher} onChange={this.onChange}className="form-control" name="publisher" required />
                            {errors.publisher && <span className="help-text">{errors.publisher}</span> }
                            <h6>Book Size</h6>
                            <input type="textbox" placeholder="Size" value={this.state.size} onChange={this.onChange} className="form-control" name="size" required />
                            {errors.size && <span className="help-text">{errors.size}</span> }
                            <h6>Quantity</h6>
                            <input type="number" name="quantity" value={this.state.quantity} onChange={this.onChange} className="form-control" min={1} required />
                            {errors.quantity && <span className="help-text">{errors.quantity}</span> }
                            <h6>Image</h6>
                            <div className="upload" id="filename">
                                <div> {this.state.imageName}</div>
                                <button onClick={this.uploadWidget.bind(this)} className="btn btn-primary btn-sm upload-button">

                                    {this.state.image === '' && <span>Add BookCover</span>}

                                    {this.state.image !== '' && <span>Change Book Cover</span>}
                                </button>
                            </div>
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

