const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'ARyinnqj4bn6ZuYUaDPn8H6VdQ4OutfnXl7CMBE_bRdcSQyZ2Q_-ZJd7eyvkEFHexiIVTGXCIjjvYh6B',
    'client_secret': 'EAV5AYUIT5lcrBrDmAKrunIsPlRkChP8J1NdkyM3ajylSW8_zuaf9Glyx0L4CPdMm2Uqtxz7leB06v-M',
    'headers' : {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
     }
  });

  module.exports = paypal;