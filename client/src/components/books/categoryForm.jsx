import React from 'react';

const CategoryForm = (props) => {
  const errors = props.errors ? props.errors.message : '';
  return (
    <div>
      { errors.form && <div className="alert alert-danger">{errors.form}</div> }
      <form onSubmit={props.saveCategory} className="form-responsive">
        <div className="form-group">
          <div className="row">
            <div className="input-field">
              <label className="active" htmlFor="title">Title</label>
              <input type="text" placeholder="Title" value={props.states.newCategory} onChange={props.onChange} className="active validate" name="newCategory" required/>
              <span className="help-text">{errors.title}</span>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-info btn-lg" >Save Category</button>

      </form>
    </div>
  );
};

export default CategoryForm;
