/**
 * Created by Administrator on 2017/8/29.
 */
import React from 'react';
import ReactDOM from 'react-dom';

function formatName(user) {
   return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
   if (user) {
      return <h1>Hello, {formatName(user)}</h1>
   }
   return <h1>Hello, Stranger.</h1>
}

const user = {
     firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
 <h1>
     Hello, {getGreeting(user)}!
 </h1>
);

ReactDOM.render(element, document.getElementById('root'));
