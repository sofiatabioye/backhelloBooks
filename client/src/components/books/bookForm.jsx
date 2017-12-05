import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  errors: PropTypes.object,
  categories: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  openUploadWidget: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired
};
const BookForm = (props) => {
  const errors = props.errors ? props.errors : '';
  return (
    <div>
      { errors.form && <div className="alert alert-danger">{errors.form}</div> }
      <form onSubmit={props.saveBook} className="form-responsive">
        <div className="form-group">
          <div className="row">
            <div className="col s6">
              <div className="input-field">
                <label className="active" htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={props.states.title}
                  onChange={props.onChange}
                  className="active validate"
                  name="title" required/>
                <div className="red-text">{errors.title}</div>
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
              {errors.category && <div className="red-text">{errors.category}</div> }
              <label className="active" htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                value={props.states.author}
                onChange={props.onChange}
                className="validate"
                name="author"
                required />
              {errors.author && <div className="red-text">{errors.author}</div> }
              <label className="active" htmlFor="isbn">ISBN</label>
              <input
                type="number"
                placeholder="ISBN"
                value={props.states.ISBN}
                onChange={props.onChange}
                className="validate"
                name="ISBN"
                required />
              {errors.isbn && <div className="red-text">{errors.isbn}</div> }
            </div>
            <div className="col s6">
              <h6>Book Cover</h6>
              <img src={props.states.image} value={props.states.image} name="image"/>

              <div>
                {props.states.imageName}
              </div>
              <div className="upload" id="filename" value={props.states.image}>
                <button onClick={props.openUploadWidget} className="btn btn-primary btn-sm upload-button"
                  value={props.states.image} name="image">

                  {props.states.image === '' && <div>Add BookCover</div>}

                  {props.states.image !== '' && <div>Change BookCover</div>}
                </button>
              </div>

              {errors.image && <div className="red-text">{errors.image}</div> }
            </div>
          </div>
          <label className="active" htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            value={props.states.description}
            onChange={props.onChange}
            className="validate"
            name="description"
            required />
          {errors.description && <div className="red-text">{errors.description}</div> }
          <label className="active" htmlFor="Edition">Edition</label>
          <input
            type="number"
            placeholder="Edition"
            value={props.states.bookEdition}
            onChange={props.onChange}
            className="form-control"
            name="bookEdition"
            required />
          {errors.edition && <div className="red-text">{errors.edition}</div> }
          <label className="active" htmlFor="Publisher">Publisher</label>
          <input
            type="text"
            placeholder="Publisher"
            value={props.states.publisher}
            onChange={props.onChange}
            className="form-control"
            name="publisher"
            required />
          {errors.publisher && <div className="red-text">{errors.publisher}</div> }
          <label className="active" htmlFor="Size">Book Size (pages)</label>
          <input
            type="number"
            placeholder="Size"
            value={props.states.bookSize}
            onChange={props.onChange}
            className="form-control"
            name="bookSize"
            required />
          {errors.size && <div className="red-text">{errors.size}</div> }
          <label className="active" htmlFor="Quantity">Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={props.states.quantity}
            onChange={props.onChange}
            className="form-control"
            min={1}
            required />
          {errors.quantity && <div className="red-text">{errors.quantity}</div> }

        </div>
        <button type="submit" className="btn btn-info btn-lg" >Save Book</button>

      </form>
    </div>
  );
};

BookForm.propTypes = propTypes;

export default BookForm;
