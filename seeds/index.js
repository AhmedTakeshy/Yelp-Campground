const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20 ) +10
        const camp = new Campground({
            author: "62dedc2af020a6075d9f1c46",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
                ]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae facere error quasi blanditiis animi, reprehenderit non impedit doloribus perspiciatis sed suscipit, deserunt perferendis! Odit delectus doloremque provident impedit officia architecto?Explicabo, nobis. Reiciendis rem delectus corporis quae totam tempore laboriosam, consectetur accusamus, recusandae nam unde, voluptates soluta laudantium sapiente illo cupiditate error similique? Eius voluptatem doloribus fuga soluta. Repudiandae, facilis!",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dhulz3zfg/image/upload/v1658348925/YelpCamp/piudrrsvoghmfowmiy6g.jpg',
                    filename: 'YelpCamp/piudrrsvoghmfowmiy6g'
                },
                {
                    url: 'https://res.cloudinary.com/dhulz3zfg/image/upload/v1658348925/YelpCamp/w53h71wrfvobsdpmp3la.jpg',
                    filename: 'YelpCamp/w53h71wrfvobsdpmp3la'
                },
                {
                    url: 'https://res.cloudinary.com/dhulz3zfg/image/upload/v1658348925/YelpCamp/t8wuqdpcccjj2yowocmi.jpg',
                    filename: 'YelpCamp/t8wuqdpcccjj2yowocmi'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})