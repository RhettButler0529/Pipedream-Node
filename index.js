var axios = require('axios');
var moment = require('moment');
var createdDate = moment(new Date(steps.trigger.event.createdDate)).format("YYYY-MM-DDTHH:mm:ssZ");
var orderID = moment(new Date()).format("YYYY-MM-DD-HHmmss");
var cost = parseInt(steps.trigger.event.cost);
let productList = [];
steps.trigger.event.items.map(item => {
  var product = {
    "productID": `prod${item.code}`,
    "variantID": `prod${item.id}`,
    "title": item.productName,
    "quantity": item.quantity,
    "price": parseInt(item.price * 100),
  };

  productList.push(product);
});

var data = JSON.stringify({
  "orderID": orderID,
  "email": steps.trigger.event.email,
  "phone": steps.trigger.event.phone,
  "firstName": String(steps.trigger.event.firstName),
  "lastName": String(steps.trigger.event.lastName),
  "currency": "PLN",
  "orderSum": cost,
  "createdAt": createdDate,
  "tags": ["Fragile",
    "High Priority"],
  "products": productList,
});

console.log(data);

var config = {
  method: 'post',
  url: 'https://api.omnisend.com/v3/orders',
  headers: {
    'x-api-key': '60ba1ca9c3d6ea001c9fe005-qFV7Ea8rVwbRWgQ0tiYBP7oGyvgvYnQNEAddufvyyFmQ3qMc6W',
    'content-type': 'application/json'
  },
  data: data
};

await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
