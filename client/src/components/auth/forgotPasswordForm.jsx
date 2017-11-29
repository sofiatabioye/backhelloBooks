import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';


const forgotPasswordForm = (props) => {
    const errors = props.errors ? props.errors : '';
    console.log(errors);
    return (
        <div>
            <Header />
            <div className="container container-me">
                <div><h3>Forgot Password? </h3></div>
                {/* <p className="text-success" >{success}</p> */}
                { errors !== null && <p className="red-text" >{errors}</p> }
                <form onSubmit={props.onSubmit} className="form-me form-responsive">

                    <div className="form-group">
                        <h6>Relax, Just Give us your Email Address</h6>
                        <input type="textbox" placeholder="Enter your email address" value={props.email} onChange={props.onChange} className="form-control" name="email" required/>
                    </div>
                    <button type="submit" className="btn btn-info btn-lg" >Send me an Email</button>

                </form>
            </div>
            <Footer />
        </div>
    )
    ;
};
export default forgotPasswordForm;
