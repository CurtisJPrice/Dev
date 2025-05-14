require('dotenv').config();
const { MongoClient } = require('mongodb');

// Replace with your actual connection string
const uri = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function run() {
try {
    await client.connect();
    const db = client.db('mongodbVSCodePlaygroundDB');
    const sales = db.collection('sales');

    // Insert documents into the sales collection
    await sales.insertMany([
    { item: 'abc', price: 10, quantity: 2, date: new Date('2014-03-01T08:00:00Z') },
    { item: 'jkl', price: 20, quantity: 1, date: new Date('2014-03-01T09:00:00Z') },
    { item: 'xyz', price: 5, quantity: 10, date: new Date('2014-03-15T09:00:00Z') },
    { item: 'xyz', price: 5, quantity: 20, date: new Date('2014-04-04T11:21:39.736Z') },
    { item: 'abc', price: 10, quantity: 10, date: new Date('2014-04-04T21:23:13.331Z') },
    { item: 'def', price: 7.5, quantity: 5, date: new Date('2015-06-04T05:08:13Z') },
    { item: 'def', price: 7.5, quantity: 10, date: new Date('2015-09-10T08:43:00Z') },
    { item: 'abc', price: 10, quantity: 5, date: new Date('2016-02-06T20:20:13Z') }
    ]);

    // Find documents sold on April 4th, 2014
    const salesOnApril4th = await sales.countDocuments({
    date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
    });
    console.log(`${salesOnApril4th} sales occurred on April 4th, 2014.`);

    // Run aggregation on 2014 sales
    const aggregationResults = await sales.aggregate([
    { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
    { $group: {
        _id: '$item',
        totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
    }
    ]).toArray();

    console.log('Aggregation results (2014 total sales per item):');
    console.table(aggregationResults);

} catch (err) {
    console.error('❌ Error occurred:', err);
} finally {
    await client.close();
}
}

run();
