var React = require('react');
var ReactDom = require('react-dom');
require('./login.css');
var Login = require('./components/login.jsx');
ReactDom.render(
	<Login />,
	document.getElementById('content')
);