const mongoose = require("mongoose");
//Import Model
const Customer = require("./models/customer");

//Map global promise - get rib of warning
mongoose.Promise = global.Promise;

//Connect to mongoDB
const mongoDB = "mongodb://localhost:27017/customercli";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Add customers async/await
const addCustomer = async function (customer) {
  try {
    await Customer.create(customer);
    console.log("New Customer Added");
  } catch (err) {
    console.log(err);
  }
};

//Find Customer async/await
const findCustomer = async function (name) {
  try {
    const search = new RegExp(name, "i");
    await Customer.find({
      $or: [{ firstname: search }, { lastname: search }],
    }).then((customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
    });
  } catch (err) {
    console.log(err);
  }
};

//Update Customers
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer).then((customer) => {
    console.info("Customer Updated");
    db.close();
  });
};

//Remove Customers
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((customer) => {
    console.info("Customer Removed");
    db.close();
  });
};

//List Customers
const listCustomers = async function () {
  try {
    await Customer.find().then((customers) => {
      console.info(customers);
      console.log(`${customers.length} customers`);
      db.close();
    });
  } catch (err) {
    console.log(err);
  }
};
//Export All Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
