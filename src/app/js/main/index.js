import React from 'react';
import ReactDom from 'react-dom'
import App from './App'
import Init from './init'
Init();

window.onload = function () {
    ReactDom.render(
        <App/>,
        document.getElementById('app')
    );
};



