import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import Header from './Header/header';
import { Link } from 'react-router-dom';
import Footer from './Footer/footer';
import { saveCategory, deleteCategory } from '../actions/category';
// import { addFlashMessage } from '../actions/flashmessages';


/* eslint-disable require-jsdoc */
class Categories extends Component {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.setState({ categories: nextProps.categories });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDelete(id) {
        this.props.deleteCategory(id);
        window.location.reload();
        // this.setState(title: ]])
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.saveCategory(this.state).then(
            (res) => {
                notify.show("New category created successfully");
            },
            (err) => {
                this.setState({
                    isLoading: false
                });
            }
        );
        //window.location.reload();
    }

    render() {
        const { isLoading } = this.state;
        const category = this.props.categories.categories;
        const categories = category && category.length ? category.map((cat, id) => (
            <tr key={cat.id}>
                <th scope="row">{ cat.id}</th>
                <td><Link to={`/books/${cat.title}/${cat.id}`}> {cat.title} </Link> </td>
                <td><button onClick={() => this.handleDelete(cat.id)}><span className="fa fa-trash" /> </button></td>
            </tr>
        )) : <h4>There are no categories in the library</h4>;

        return (
            <div>
                <Header />
                <div className="container">
                    <div><h3>All Categories</h3></div>
                    <Notifications />
                    <div className="row">

                        <div className="pull-right">
                            <form onSubmit={this.onSubmit}>
                                <input type="textbox" name="title" placeholder="Title" value={this.state.title} onChange={this.onChange} required/>
                                <button type="submit" className="btn btn-info btn-sm" disabled={isLoading}>Add New </button>
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
    books: state.books,
    categories: state.categories.categories
});
export default connect(mapStateToProps, { saveCategory, deleteCategory })(Categories);

