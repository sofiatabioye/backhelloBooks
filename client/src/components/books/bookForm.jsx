import React from 'react';

const BookForm = (props) => {
    const errors = props.errors ? props.errors.message : '';
    return (
        <div>
            { errors.form && <div className="alert alert-danger">{errors.form}</div> }
            <form onSubmit={props.saveBook} className="form-responsive">
                <div className="form-group">
                    <div className="row">
                        <div className="col s6">
                            <div className="input-field">
                                <label className="active" htmlFor="title">Title</label>
                                <input type="text" placeholder="Title" value={props.states.title} onChange={props.onChange} className="active validate" name="title" required/>
                                <span className="help-text">{errors.title}</span>
                            </div> <div className="input-field">
                                <label className="active" htmlFor="category">Category</label>
                                <select name="category" onChange={props.onChange} className="form-control">
                                    <option value={props.states.category}>{props.states.category}</option>
                                    { props && props.categories ?
                                        props.categories.map((category) => (
                                            <option id="rm" value={category.title || ""} key={category.id}>{category.title || ""}</option>
                                        )) : <option>There are no categories in the library</option>}

                                </select>
                            </div>
                            {errors.category && <span className="help-text">{errors.category}</span> }
                            <label className="active" htmlFor="author">Author</label>
                            <input type="text" placeholder="Author" value={props.states.author} onChange={props.onChange} className="validate" name="author" required />
                            {errors.author && <span className="help-text">{errors.author}</span> }
                            <label className="active" htmlFor="isbn">ISBN</label>
                            <input type="text" placeholder="ISBN" value={props.states.ISBN} onChange={props.onChange} className="validate" name="ISBN" required />
                            {errors.isbn && <span className="help-text">{errors.isbn}</span> }
                        </div>
                        <div className="col s6">
                            <h6>Book Cover</h6>
                            <img src={props.states.image} />

                            <div>
                                {props.states.imageName}
                            </div>
                            <div className="upload" id="filename">
                                <button onClick={props.openUploadWidget} className="btn btn-primary btn-sm upload-button">

                                    {props.states.image === '' && <span>Add BookCover</span>}

                                    {props.states.image !== '' && <span>Change BookCover</span>}
                                </button>
                            </div>

                            {errors.image && <span className="help-text">{errors.image}</span> }
                        </div>
                    </div>
                    <label className="active" htmlFor="description">Description</label>
                    <textarea placeholder="Description" value={props.states.description} onChange={props.onChange} className="validate" name="description" required />
                    {errors.description && <span className="help-text">{errors.description}</span> }
                    <label className="active" htmlFor="Edition">Edition</label>
                    <input type="text" placeholder="Edition" value={props.states.bookEdition} onChange={props.onChange} className="form-control" name="bookEdition" required />
                    {errors.edition && <span className="help-text">{errors.edition}</span> }
                    <label className="active" htmlFor="Publisher">Publisher</label>
                    <input type="text" placeholder="Publisher" value={props.states.publisher} onChange={props.onChange}className="form-control" name="publisher" required />
                    {errors.publisher && <span className="help-text">{errors.publisher}</span> }
                    <label className="active" htmlFor="Size">Book Size (pages)</label>
                    <input type="text" placeholder="Size" value={props.states.bookSize} onChange={props.onChange} className="form-control" name="bookSize" required />
                    {errors.size && <span className="help-text">{errors.size}</span> }
                    <label className="active" htmlFor="Quantity">Quantity</label>
                    <input type="number" placeholder="Quantity" name="quantity" value={props.states.quantity} onChange={props.onChange} className="form-control" min={1} required />
                    {errors.quantity && <span className="help-text">{errors.quantity}</span> }

                </div>
                <button type="submit" className="btn btn-info btn-lg" >Save Book</button>

            </form>
        </div>
    );
};

export default BookForm;
