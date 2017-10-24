import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const BookForm = (props) => {
    const errors = props.errors ? props.errors.message : '';
    const categories = props.categories && props.categories.length ?
        props.categories.map((category) => (
            <option id="rm" value={category.title} key={category.title}>{category.title}</option>

        )) : <h4>There are no categories in the library</h4>;
    return (
        <div>
            <Header />
            <div className="container container-me">
                <div><h3>Add New Book</h3></div>
                <div className="profile-userpic">
                    <img src={props.image} role="presentation" className="profile-img" />
                </div>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <form onSubmit={props.onSubmit} className="form-me form-responsive">

                    <div className="form-group">
                        <h6>Title</h6>
                        <input type="textbox" placeholder="Title" value={props.title} onChange={props.onChange} className="form-control" name="title" required/>
                        <span className="help-text">{errors.title}</span>
                        <h6>Description </h6>
                        <input type="textbox" placeholder="Description" value={props.description} onChange={props.onChange} className="form-control" name="description" required />
                        {errors.description && <span className="help-text">{errors.description}</span> }
                        <h6>Category</h6>
                        <select name="category" placeholder value={props.category} onChange={props.onChange} className="form-control">
                            <option value="-Select-">Select Category</option>
                            {categories}
                        </select>
                        {errors.category && <span className="help-text">{errors.category}</span> }
                        <h6>Author</h6>
                        <input type="textbox" placeholder="Author" value={props.author} onChange={props.onChange} className="form-control" name="author" required />
                        {errors.author && <span className="help-text">{errors.author}</span> }
                        <h6>ISBN</h6>
                        <input type="textbox" placeholder="ISBN" value={props.isbn} onChange={props.onChange} className="form-control" name="isbn" required />
                        {errors.isbn && <span className="help-text">{errors.isbn}</span> }
                        <h6>Edition</h6>
                        <input type="textbox" placeholder="Edition" value={props.edition} onChange={props.onChange} className="form-control" name="edition" required />
                        {errors.edition && <span className="help-text">{errors.eition}</span> }
                        <h6>Publisher</h6>
                        <input type="textbox" placeholder="Publisher" value={props.publisher} onChange={props.onChange}className="form-control" name="publisher" required />
                        {errors.publisher && <span className="help-text">{errors.publisher}</span> }
                        <h6>Book Size</h6>
                        <input type="textbox" placeholder="Size" value={props.size} onChange={props.onChange} className="form-control" name="size" required />
                        {errors.size && <span className="help-text">{errors.size}</span> }
                        <h6>Quantity</h6>
                        <input type="number" name="quantity" value={props.quantity} onChange={props.onChange} className="form-control" min={1} required />
                        {errors.quantity && <span className="help-text">{errors.quantity}</span> }
                        <h6>Image (Book Cover)</h6>
                        <div>
                            {props.imageName}
                        </div>
                        <div className="upload" id="filename">
                            <button onClick={props.uploadWidget} className="btn btn-primary btn-sm upload-button">

                                {props.image === '' && <span>Add BookCover</span>}

                                {props.image !== '' && <span>Change BookCover</span>}
                            </button>
                        </div>

                        {errors.image && <span className="help-text">{errors.image}</span> }
                    </div>
                    <button type="submit" className="btn btn-info btn-lg" >Create Book</button>

                </form>
            </div>
            <Footer />
        </div>
    );
};

export default BookForm;
