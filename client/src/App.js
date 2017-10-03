import React, { Component } from 'react';

import Routes from './components/myroutes';

/**
 * 
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {
    /**
     * 
     * 
     * @returns {Routes} This returns all the routes
     * @memberof App
     */
    render() {
        return (
            <div>
                <Routes />
            </div >
        );
    }
}

export default App;
