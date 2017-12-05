import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  errors: PropTypes.object,
  states: PropTypes.object.isRequired,
  saveCategory: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
const CategoryForm = (props) => {
  const errors = props.errors ? props.errors : '';
  return (
    <div>
      { errors.form && <div className="alert alert-danger">{errors.form}</div> }
      <form onSubmit={props.saveCategory} className="form-responsive">
        <div className="form-group">
          <div className="row">
            <div className="input-field">
              <label className="active" htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={props.states.newCategory || ""}
                onChange={props.onChange}
                className="active validate"
                name="newCategory"
                required/>
              <span className="red-text">{errors.newCategory}</span>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-info btn-lg" >Save Category</button>

      </form>
    </div>
  );
};

CategoryForm.propTypes = propTypes;

export default CategoryForm;
