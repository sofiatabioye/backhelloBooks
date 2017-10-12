import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { saveCategory, deleteCategory } from '../../actions/category';


/**
 * 
 * 
 * @class Categories
 * @extends {Component}
 */
class Categories extends Component {
    /**
     * Creates an instance of Categories.
     * @param {any} props 
     * @memberof Categories
     */
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            title: '',
            isLoading: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    /**
     * 
     * @returns {Categories} Returns categories
     * @param {any} nextProps 
     * @memberof Categories
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.setState({ categories: nextProps.categories });
        }
    }


    /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof Categories
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    /**
     * 
     * @returns {void}
     * @param {any} id 
     * @memberof Categories
     */
    handleDelete(id) {
        this.props.deleteCategory(id);
        window.location.reload();
    }


    /**
     * 
     * @returns {Category} Newly created category
     * @param {any} e 
     * @memberof Categories
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.saveCategory(this.state);
    }


    /**
     * 
     * 
     * @returns {Categories} Lists all categories
     * @memberof Categories
     */
    render() {
        const category = this.props.categories.categories;
        const categories = category && category.length ? category.map((cat, index) => (
            <tr key={cat.id}>
                <th scope="row">{ index + 1}</th>
                <td><Link to={`/books/${cat.title}/${cat.id}`}> {cat.title} </Link> </td>
                <td><button onClick={() => this.handleDelete(cat.id)}><span className="fa fa-trash" /> </button></td>
            </tr>
        )) : <h4>There are no categories in the library</h4>;

        return (
            <div>
                <Header />
                <div className="container">
                    <div><h3>All Categories</h3></div>
                    <div className="row">

                        <div className="pull-right">
                            <form onSubmit={this.onSubmit}>
                                <input type="textbox" name="title" placeholder="Title" value={this.state.title} onChange={this.onChange} required/>
                                <button type="submit" className="btn btn-info btn-sm">Add New </button>
                            </form>
                        </div>

                        <table className="table  sortable table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody >
                                {categories}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

Categories.proptypes = {
    saveCategory: PropTypes.func.isRequired
};

Categories.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    categories: state.categories.categories
});
export default connect(mapStateToProps, { saveCategory, deleteCategory })(Categories);

