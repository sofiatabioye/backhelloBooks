import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveBooks } from '../../actions/books';
import validateBook from '../utils/validateBook.jsx';
import { getCategories } from '../../actions/category';
import { addFlashMessage } from '../../actions/flashmessages';
import FlashMessagesList from '../flash/FlashMessagesList';
import BookForm from './addbookForm.jsx';

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
            categories: [],
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
     * @returns {void}
     * 
     * @param {any} nextProps 
     * @memberof AddBook
     */
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     this.setState({ categories: nextProps.categories });
    // }

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
        // const { errors } = this.state;
        return (
            <div>
                <BookForm
                    categories={this.props.categories}
                    onChange = {this.onChange.bind(this)}
                    onSubmit = {this.onSubmit.bind(this)}
                    uploadWidget = {this.uploadWidget.bind(this)}
                />
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
const mapStateToProps = state => ({
    categories: state.categories.categories.categories
});

export default connect(mapStateToProps, { saveBooks, FlashMessagesList, addFlashMessage, getCategories })(AddBook);

