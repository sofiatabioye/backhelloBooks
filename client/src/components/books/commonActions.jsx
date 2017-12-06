import validateBook from '../utils/validateBook';
import validateCategory from '../utils/validateCategory';

/**
     * 
     * @returns {changedInput} This saves input as it is changed
     * @param {any} event
     * @memberof AddBook
     */
export function onChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}

/**
     * @returns {Image} This uploads the image to cloudinary
     * 
     * @memberof AddBook
     */
export function openUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloud_name: process.env.CLOUDINARY_NAME,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      tags: ['books'],
      public_id: this.state.public_id,
      version: this.state.imageVersion
    },
    (error, result) => {
      this.setState({
        image: result[0].url,
        imageName: result[0].original_filename,
        public_id: result[0].public_id,
        imageVersion: result[0].version,
      });
    });
}

export function openAddBookModal() {
  const modal = $('#addBook');
  $('#addBook').modal('open');
}

/**
     * 
     * 
     * @returns  {validatedInput} This checks if form input is correct
     * @memberof AddBook
     */
export function isBookValid() {
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
       * @param {any} event 
       * @memberof AddBook
       */
export function onAddBook(event) {
  event.preventDefault();
  if (this.isBookValid()) {
    this.props.saveBooks(this.state, this.props.history);
  }
}

export function openAddCategoryModal() {
  const modal = $('#addCategory');
  $('#addCategory').modal('open');
}

/**
       * 
       * 
       * @returns  {validatedInput} This checks if form input is correct
       * @memberof AddBook
       */
export function isCategoryValid() {
  const { errors, isValid } = validateCategory(this.state.newCategory);
  if (!isValid) {
    this.setState({ errors });
    return;
  }
  return isValid;
}

/**
* @export
* @returns {void}
* @param {any} event 
*/
export function onSaveCategory(event) {
  event.preventDefault();
  if (this.isCategoryValid()) {
    this.props.saveCategory({ title: this.state.newCategory });
  }
}

/**
* @export
* @returns {void} This returns the current number of the page
* @param {any} event
*/
export function handleSelect(event) {
  this.setState({ activePage: event });
  const offset = this.state.numPerPage * (event - 1);
  this.props.getBooks(offset, this.state.numPerPage);
}

/**
* @export 
* @returns {void}
* @param {any} event 
*/
export function searchBooks(event) {
  event.preventDefault();
  this.props.searchBook(this.state.searchTerm, this.state.category, this.state.offset, this.state.numPerPage);
}

/**
* @export 
* @returns {void}
* @param {any} event 
*/
export function searchBookByCategory(event) {
  event.preventDefault();
  this.props.searchBook(this.state.searchTerm, this.props.match.params.title, this.state.offset, this.state.numPerPage);
}
