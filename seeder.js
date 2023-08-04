const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models

const Customer = require('./models/Customers')
const User = require('./models/User')
const Tableau = require('./models/Tableau')
const Line = require('./models/Lines')

// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, 'utf-8'),
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)
const tableaux = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tableaux.json`, 'utf-8'),
)
const tableLines = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tableauxLine.json`, 'utf-8'),
)



// Import into DB
const importData = async () => {
  try {
    await Customer.create(customers)
    await User.create(users)
    await Tableau.create(tableaux)
    await Line.create(tableLines)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Customer.deleteMany()
    await User.deleteMany()
    await Tableau.deleteMany()
    await Line.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
