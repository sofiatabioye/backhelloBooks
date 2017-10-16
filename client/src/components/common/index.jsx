import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const Index = (props) => (
    <div>
        <Header />

        <div className="col-sm-8 col-sm-offset-2">
            <h1>Welcome to HelloBooks</h1>
        </div>
        <Footer />
    </div>
);

export default Index;
