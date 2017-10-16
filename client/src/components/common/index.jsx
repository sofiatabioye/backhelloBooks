import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const Index = (props) => (
    <div>
        <Header />
        <div className="container">
            <h4>Oops, the page you're looking for doesn't exist </h4>
        </div>
        <Footer />
    </div>
);

export default Index;
