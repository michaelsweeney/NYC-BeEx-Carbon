import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import './fonts/CircularStd-Black.otf'

// ie polyfills
if (!Object.values) Object.values = o=>Object.keys(o).map(k=>o[k]);

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

    Array.prototype.map = function(callback/*, thisArg*/) {
  
      var T, A, k;
  
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }
  
      // 1. Let O be the result of calling ToObject passing the |this| 
      //    value as the argument.
      var O = Object(this);
  
      // 2. Let lenValue be the result of calling the Get internal 
      //    method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;
  
      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
        T = arguments[1];
      }
  
      // 6. Let A be a new array created as if by the expression new Array(len) 
      //    where Array is the standard built-in constructor with that name and 
      //    len is the value of len.
      A = new Array(len);
  
      // 7. Let k be 0
      k = 0;
  
      // 8. Repeat, while k < len
      while (k < len) {
  
        var kValue, mappedValue;
  
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal 
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
  
          // i. Let kValue be the result of calling the Get internal 
          //    method of O with argument Pk.
          kValue = O[k];
  
          // ii. Let mappedValue be the result of calling the Call internal 
          //     method of callback with T as the this value and argument 
          //     list containing kValue, k, and O.
          mappedValue = callback.call(T, kValue, k, O);
          A[k] = mappedValue;
        }
        // d. Increase k by 1.
        k++;
      }
  
      // 9. return A
      return A;
    };
  }
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import'bootstrap-css-only/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
