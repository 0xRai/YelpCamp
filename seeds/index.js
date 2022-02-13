const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '62042fa534c495321108dc29',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                    url: "https://res.cloudinary.com/dqdnu1b6g/image/upload/v1644614114/YelpCamp/wdyd0qemqr8zkfunncu1.png",
                    filename: "YelpCamp/wdyd0qemqr8zkfunncu1"
                },
                {
                    url: "https://res.cloudinary.com/dqdnu1b6g/image/upload/v1644614114/YelpCamp/l1daig0ohjzk6ggoda6m.png",
                    filename: "YelpCamp/l1daig0ohjzk6ggoda6m"
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque nemo adipisci architecto, amet cumque vel. Repellat ea quas ut, odio recusandae pariatur rem tenetur iusto placeat. Quas voluptatibus enim dolore.',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})