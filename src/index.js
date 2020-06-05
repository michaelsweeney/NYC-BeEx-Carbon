import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import './fonts/CircularStd-Black.otf'

// ie polyfills
if (!Object.values) Object.values = o => Object.keys(o).map(k => o[k]);
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function(callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}
if (!Array.prototype.map) {
	Array.prototype.map = function(callback /*, thisArg*/) {
		var T, A, k;

		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = arguments[1];
		}
		A = new Array(len);
		k = 0;

		while (k < len) {
			var kValue, mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue, k, O);
				A[k] = mappedValue;
			}
			k++;
		}

		return A;
	};
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
