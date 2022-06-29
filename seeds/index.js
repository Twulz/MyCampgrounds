const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '6280b2bc9b85ee1c48c86e99',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://source.unsplash.com/collection/483251',
                    filename: 'YelpCamp/Test1'
                },
                {
                    url: 'https://source.unsplash.com/collection/1753518',
                    filename: 'YelpCamp/Test2'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});