var React = require('react');
var ReactDom = require('react-dom');
require('./style.css');
require('./demo.css');
require('./iconfont.css');

var Component =require('./components/productBox.jsx');

ReactDom.render(
	<Component />,
	document.getElementById('content')
);