const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const venueSchema = new mongoose.Schema({
  name: String, price: Number, capacity: Number,
  style: [String], images: [String],
});
const cateringSchema = new mongoose.Schema({
  name: String, price_per_person: Number,
  style: [String], images: [String],
});
const entertainmentSchema = new mongoose.Schema({
  name: String, type: String, price: Number,
  style: [String], images: [String],
});

const Venue         = mongoose.model("Venue", venueSchema);
const Catering      = mongoose.model("Catering", cateringSchema);
const Entertainment = mongoose.model("Entertainment", entertainmentSchema);

const venues = [
  { name: "UB Grand Ballroom",         price: 3800000, capacity: 900, style: ["luxury"],                    images: ["http://localhost:5000/uploads/venue1.jpg"] },
  { name: "Sky Event Hall",            price: 2900000, capacity: 700, style: ["luxury", "modern"],          images: ["http://localhost:5000/uploads/venue2.jpg"] },
  { name: "Chinggis Heritage Hall",    price: 3500000, capacity: 800, style: ["traditional", "luxury"],     images: ["http://localhost:5000/uploads/venue3.jpg"] },
  { name: "Crystal Palace UB",         price: 4000000, capacity: 950, style: ["luxury"],                    images: ["http://localhost:5000/uploads/venue4.jpg"] },
  { name: "Imperial Banquet Hall",     price: 3200000, capacity: 750, style: ["luxury", "traditional"],     images: ["http://localhost:5000/uploads/venue5.jpg"] },
  { name: "Steppe Luxury Resort",      price: 2700000, capacity: 600, style: ["luxury", "traditional"],     images: ["http://localhost:5000/uploads/venue6.jpg"] },
  { name: "Blue Sky Tower Venue",      price: 2500000, capacity: 500, style: ["modern", "luxury"],          images: ["http://localhost:5000/uploads/venue7.jpg"] },
  { name: "Nomad Palace Events",       price: 2200000, capacity: 550, style: ["traditional", "luxury"],     images: ["http://localhost:5000/uploads/venue8.jpg"] },
  { name: "The Rooftop Garden UB",     price: 1800000, capacity: 300, style: ["modern", "luxury"],          images: ["http://localhost:5000/uploads/venue9.jpg"] },
  { name: "Ulaanbaatar Convention Center", price: 2000000, capacity: 1000, style: ["modern"],               images: ["http://localhost:5000/uploads/venue10.jpg"] },
  { name: "Silk Road Event Hall",      price: 1600000, capacity: 400, style: ["traditional", "modern"],     images: ["http://localhost:5000/uploads/venue11.jpg"] },
  { name: "Mongolian Cultural Center", price: 1500000, capacity: 450, style: ["traditional"],               images: ["http://localhost:5000/uploads/venue12.jpg"] },
  { name: "Urban Loft Venue",          price: 1200000, capacity: 200, style: ["modern", "minimal"],         images: ["http://localhost:5000/uploads/venue13.jpg"] },
  { name: "The Terrace Lounge",        price: 1400000, capacity: 250, style: ["modern"],                    images: ["http://localhost:5000/uploads/venue14.jpg"] },
  { name: "Ger District Event Space",  price: 900000,  capacity: 180, style: ["traditional", "party"],      images: ["http://localhost:5000/uploads/venue15.jpg"] },
  { name: "Naran Tuul Party Hall",     price: 850000,  capacity: 200, style: ["party", "modern"],           images: ["http://localhost:5000/uploads/venue16.jpg"] },
  { name: "Sukhbaatar Plaza Events",   price: 1100000, capacity: 300, style: ["modern"],                    images: ["http://localhost:5000/uploads/venue17.jpg"] },
  { name: "Khangarid Ballroom",        price: 1700000, capacity: 380, style: ["traditional", "luxury"],     images: ["http://localhost:5000/uploads/venue18.jpg"] },
  { name: "Tuul Riverside Hall",       price: 1300000, capacity: 280, style: ["modern", "traditional"],     images: ["http://localhost:5000/uploads/venue19.jpg"] },
  { name: "City Garden Pavilion",      price: 750000,  capacity: 150, style: ["minimal", "modern"],         images: ["http://localhost:5000/uploads/venue20.jpg"] },
  { name: "The White Ger Studio",      price: 600000,  capacity: 100, style: ["minimal", "traditional"],    images: ["http://localhost:5000/uploads/venue21.jpg"] },
  { name: "Zaisan Hill Event Deck",    price: 1000000, capacity: 220, style: ["modern"],                    images: ["http://localhost:5000/uploads/venue22.jpg"] },
  { name: "Bayangol Hotel Ballroom",   price: 1900000, capacity: 420, style: ["luxury", "modern"],          images: ["http://localhost:5000/uploads/venue23.jpg"] },
  { name: "Heritage House UB",         price: 2100000, capacity: 480, style: ["traditional", "luxury"],     images: ["http://localhost:5000/uploads/venue24.jpg"] },
  { name: "Mongolia Expo Hall",        price: 2400000, capacity: 600, style: ["modern"],                    images: ["http://localhost:5000/uploads/venue25.jpg"] },
  { name: "Compact Studio Space",      price: 300000,  capacity: 50,  style: ["minimal"],                   images: ["http://localhost:5000/uploads/venue26.jpg"] },
  { name: "Tiny Celebration Room",     price: 350000,  capacity: 60,  style: ["minimal", "party"],          images: ["http://localhost:5000/uploads/venue27.jpg"] },
  { name: "Sunrise Event Hall",        price: 450000,  capacity: 80,  style: ["minimal", "modern"],         images: ["http://localhost:5000/uploads/venue28.jpg"] },
  { name: "Green Valley Space",        price: 500000,  capacity: 90,  style: ["minimal"],                   images: ["http://localhost:5000/uploads/venue29.jpg"] },
  { name: "Cozy Banquet Room",         price: 550000,  capacity: 100, style: ["minimal", "traditional"],    images: ["http://localhost:5000/uploads/venue30.jpg"] },
  { name: "Ulaanbaatar Party Hub",     price: 700000,  capacity: 130, style: ["party"],                     images: ["http://localhost:5000/uploads/venue31.jpg"] },
  { name: "Club Night Venue",          price: 800000,  capacity: 160, style: ["party", "modern"],           images: ["http://localhost:5000/uploads/venue32.jpg"] },
  { name: "The Warehouse Events",      price: 650000,  capacity: 120, style: ["modern", "minimal"],         images: ["http://localhost:5000/uploads/venue33.jpg"] },
  { name: "Art Space Gallery Hall",    price: 750000,  capacity: 140, style: ["modern", "minimal"],         images: ["http://localhost:5000/uploads/venue34.jpg"] },
  { name: "Orchid Banquet Hall",       price: 950000,  capacity: 190, style: ["traditional", "luxury"],     images: ["http://localhost:5000/uploads/venue35.jpg"] },
  { name: "Pearl Garden Hall",         price: 1050000, capacity: 240, style: ["luxury", "modern"],          images: ["http://localhost:5000/uploads/venue36.jpg"] },
  { name: "Steppe Sky Venue",          price: 1150000, capacity: 260, style: ["traditional"],               images: ["http://localhost:5000/uploads/venue37.jpg"] },
  { name: "Eagle's Nest Hall",         price: 1250000, capacity: 270, style: ["traditional", "party"],      images: ["http://localhost:5000/uploads/venue38.jpg"] },
  { name: "Gold Leaf Ballroom",        price: 2300000, capacity: 520, style: ["luxury"],                    images: ["http://localhost:5000/uploads/venue39.jpg"] },
  { name: "Black Diamond Hall",        price: 2600000, capacity: 580, style: ["luxury", "modern"],          images: ["http://localhost:5000/uploads/venue40.jpg"] },
  { name: "Lotus Event Center",        price: 1350000, capacity: 290, style: ["modern", "traditional"],     images: ["http://localhost:5000/uploads/venue41.jpg"] },
  { name: "Falcon Business Venue",     price: 1450000, capacity: 310, style: ["modern"],                    images: ["http://localhost:5000/uploads/venue42.jpg"] },
  { name: "Mountain View Hall",        price: 1600000, capacity: 340, style: ["modern", "luxury"],          images: ["http://localhost:5000/uploads/venue43.jpg"] },
  { name: "Riverside Party Space",     price: 600000,  capacity: 110, style: ["party", "minimal"],          images: ["http://localhost:5000/uploads/venue44.jpg"] },
  { name: "Infinity Rooftop UB",       price: 2800000, capacity: 650, style: ["luxury", "modern"],          images: ["http://localhost:5000/uploads/venue45.jpg"] },
  { name: "Sarnai Flower Hall",        price: 900000,  capacity: 170, style: ["traditional", "minimal"],    images: ["http://localhost:5000/uploads/venue46.jpg"] },
  { name: "Uurgakh Traditional Ger",   price: 400000,  capacity: 70,  style: ["traditional"],               images: ["http://localhost:5000/uploads/venue47.jpg"] },
  { name: "Modern Minimal Loft",       price: 500000,  capacity: 85,  style: ["minimal", "modern"],         images: ["http://localhost:5000/uploads/venue48.jpg"] },
  { name: "Grand Steppe Ballroom",     price: 3100000, capacity: 720, style: ["luxury", "traditional"],     images: ["http://localhost:5000/uploads/venue49.jpg"] },
  { name: "Capital Event Arena",       price: 3700000, capacity: 880, style: ["luxury", "modern"],          images: ["http://localhost:5000/uploads/venue50.jpg"] },
];

const caterings = [
  { name: "Royal Mongolian Feast",     price_per_person: 48000, style: ["luxury", "traditional"],  images: ["http://localhost:5000/uploads/food1.jpg"] },
  { name: "Imperial Banquet Kitchen",  price_per_person: 50000, style: ["luxury"],                 images: ["http://localhost:5000/uploads/food2.jpg"] },
  { name: "Golden Tabel Fine Dining",  price_per_person: 45000, style: ["luxury", "modern"],       images: ["http://localhost:5000/uploads/food3.jpg"] },
  { name: "Heritage Flavors UB",       price_per_person: 42000, style: ["traditional", "luxury"],  images: ["http://localhost:5000/uploads/food4.jpg"] },
  { name: "Nomad Gourmet",             price_per_person: 40000, style: ["traditional", "luxury"],  images: ["http://localhost:5000/uploads/food5.jpg"] },
  { name: "Fusion Cuisine UB",         price_per_person: 38000, style: ["modern", "luxury"],       images: ["http://localhost:5000/uploads/food6.jpg"] },
  { name: "Silk Road Kitchen",         price_per_person: 35000, style: ["traditional", "modern"],  images: ["http://localhost:5000/uploads/food7.jpg"] },
  { name: "Asian Fusion Catering",     price_per_person: 33000, style: ["modern"],                 images: ["http://localhost:5000/uploads/food8.jpg"] },
  { name: "Western Grill House",       price_per_person: 36000, style: ["modern", "luxury"],       images: ["http://localhost:5000/uploads/food9.jpg"] },
  { name: "Mongolian BBQ Masters",     price_per_person: 30000, style: ["traditional", "party"],   images: ["http://localhost:5000/uploads/food10.jpg"] },
  { name: "Steppe Grill & Roast",      price_per_person: 28000, style: ["traditional"],            images: ["http://localhost:5000/uploads/food11.jpg"] },
  { name: "Healthy Green Catering",    price_per_person: 32000, style: ["minimal", "modern"],      images: ["http://localhost:5000/uploads/food12.jpg"] },
  { name: "Fresh Organic Kitchen",     price_per_person: 29000, style: ["minimal"],                images: ["http://localhost:5000/uploads/food13.jpg"] },
  { name: "Vitality Meals UB",         price_per_person: 27000, style: ["minimal", "modern"],      images: ["http://localhost:5000/uploads/food14.jpg"] },
  { name: "The Grand Buffet UB",       price_per_person: 34000, style: ["luxury", "modern"],       images: ["http://localhost:5000/uploads/food15.jpg"] },
  { name: "Party Snacks & Bites",      price_per_person: 15000, style: ["party", "minimal"],       images: ["http://localhost:5000/uploads/food16.jpg"] },
  { name: "Celebration Feast Co.",     price_per_person: 25000, style: ["party", "traditional"],   images: ["http://localhost:5000/uploads/food17.jpg"] },
  { name: "UB Finger Food Studio",     price_per_person: 18000, style: ["party", "modern"],        images: ["http://localhost:5000/uploads/food18.jpg"] },
  { name: "Classic Mongolian Cooking", price_per_person: 22000, style: ["traditional"],            images: ["http://localhost:5000/uploads/food19.jpg"] },
  { name: "Tsuivan & Buuz Kitchen",    price_per_person: 14000, style: ["traditional", "minimal"], images: ["http://localhost:5000/uploads/food20.jpg"] },
  { name: "Khorkhog Specialists",      price_per_person: 26000, style: ["traditional"],            images: ["http://localhost:5000/uploads/food21.jpg"] },
  { name: "Korean BBQ Catering UB",    price_per_person: 31000, style: ["modern", "party"],        images: ["http://localhost:5000/uploads/food22.jpg"] },
  { name: "Japanese Fusion Kitchen",   price_per_person: 37000, style: ["modern", "luxury"],       images: ["http://localhost:5000/uploads/food23.jpg"] },
  { name: "Chinese Banquet Catering",  price_per_person: 28000, style: ["traditional", "modern"],  images: ["http://localhost:5000/uploads/food24.jpg"] },
  { name: "Italian Bistro Catering",   price_per_person: 39000, style: ["luxury", "modern"],       images: ["http://localhost:5000/uploads/food25.jpg"] },
  { name: "Basic Catering Co.",        price_per_person: 10000, style: ["minimal"],                images: ["http://localhost:5000/uploads/food26.jpg"] },
  { name: "Budget Feast UB",           price_per_person: 11000, style: ["minimal", "party"],       images: ["http://localhost:5000/uploads/food27.jpg"] },
  { name: "Simple & Tasty Catering",   price_per_person: 12000, style: ["minimal"],                images: ["http://localhost:5000/uploads/food28.jpg"] },
  { name: "Everyday Meals Service",    price_per_person: 13000, style: ["minimal"],                images: ["http://localhost:5000/uploads/food29.jpg"] },
  { name: "Community Kitchen UB",      price_per_person: 16000, style: ["minimal", "traditional"], images: ["http://localhost:5000/uploads/food30.jpg"] },
  { name: "BBQ Party Grill",           price_per_person: 20000, style: ["party"],                  images: ["http://localhost:5000/uploads/food31.jpg"] },
  { name: "Midnight Snack Catering",   price_per_person: 17000, style: ["party", "modern"],        images: ["http://localhost:5000/uploads/food32.jpg"] },
  { name: "Cocktail & Canape Studio",  price_per_person: 23000, style: ["luxury", "modern"],       images: ["http://localhost:5000/uploads/food33.jpg"] },
  { name: "Executive Lunch Catering",  price_per_person: 24000, style: ["modern", "minimal"],      images: ["http://localhost:5000/uploads/food34.jpg"] },
  { name: "Corporate Meal Prep UB",    price_per_person: 19000, style: ["minimal", "modern"],      images: ["http://localhost:5000/uploads/food35.jpg"] },
  { name: "Saffron Mongolian Kitchen", price_per_person: 43000, style: ["luxury", "traditional"],  images: ["http://localhost:5000/uploads/food36.jpg"] },
  { name: "The Steak House Catering",  price_per_person: 46000, style: ["luxury"],                 images: ["http://localhost:5000/uploads/food37.jpg"] },
  { name: "Vegan Delight Kitchen",     price_per_person: 21000, style: ["minimal", "modern"],      images: ["http://localhost:5000/uploads/food38.jpg"] },
  { name: "Street Food Festival",      price_per_person: 15000, style: ["party", "traditional"],   images: ["http://localhost:5000/uploads/food39.jpg"] },
  { name: "Mongolian Hot Pot Service", price_per_person: 30000, style: ["traditional", "party"],   images: ["http://localhost:5000/uploads/food40.jpg"] },
  { name: "Dessert Bar & Sweets",      price_per_person: 18000, style: ["party", "modern"],        images: ["http://localhost:5000/uploads/food41.jpg"] },
  { name: "Lavish Wedding Catering",   price_per_person: 49000, style: ["luxury"],                 images: ["http://localhost:5000/uploads/food42.jpg"] },
  { name: "Modern Mongolian Cuisine",  price_per_person: 34000, style: ["modern", "traditional"],  images: ["http://localhost:5000/uploads/food43.jpg"] },
  { name: "The Noodle House Catering", price_per_person: 16000, style: ["minimal", "traditional"], images: ["http://localhost:5000/uploads/food44.jpg"] },
  { name: "Spice Route Catering",      price_per_person: 27000, style: ["modern"],                 images: ["http://localhost:5000/uploads/food45.jpg"] },
  { name: "Sunrise Breakfast Events",  price_per_person: 20000, style: ["minimal", "modern"],      images: ["http://localhost:5000/uploads/food46.jpg"] },
  { name: "BBQ & Beer Catering",       price_per_person: 22000, style: ["party"],                  images: ["http://localhost:5000/uploads/food47.jpg"] },
  { name: "Gala Dinner Specialists",   price_per_person: 47000, style: ["luxury"],                 images: ["http://localhost:5000/uploads/food48.jpg"] },
  { name: "Bistro Box Catering",       price_per_person: 26000, style: ["modern", "minimal"],      images: ["http://localhost:5000/uploads/food49.jpg"] },
  { name: "Countryside Cookout",       price_per_person: 23000, style: ["traditional", "party"],   images: ["http://localhost:5000/uploads/food50.jpg"] },
];

const entertainments = [
  { name: "DJ Darkness",          type: "dj",          price: 2800000, style: ["luxury", "party"],          images: ["http://localhost:5000/uploads/ent1.jpg"] },
  { name: "DJ Supreme UB",        type: "dj",          price: 2200000, style: ["luxury"],                   images: ["http://localhost:5000/uploads/ent2.jpg"] },
  { name: "DJ Elektron",          type: "dj",          price: 1500000, style: ["modern", "party"],          images: ["http://localhost:5000/uploads/ent3.jpg"] },
  { name: "DJ Steppe Fire",       type: "dj",          price: 1000000, style: ["party", "modern"],          images: ["http://localhost:5000/uploads/ent4.jpg"] },
  { name: "DJ Night Owl",         type: "dj",          price: 700000,  style: ["party"],                    images: ["http://localhost:5000/uploads/ent5.jpg"] },
  { name: "DJ Starter Pack",      type: "dj",          price: 400000,  style: ["party", "minimal"],         images: ["http://localhost:5000/uploads/ent6.jpg"] },
  { name: "DJ Budget Beats",      type: "dj",          price: 250000,  style: ["minimal", "party"],         images: ["http://localhost:5000/uploads/ent7.jpg"] },
  { name: "Narantsetseg (Star)",  type: "singer",      price: 3000000, style: ["luxury"],                   images: ["http://localhost:5000/uploads/ent8.jpg"] },
  { name: "Enkhjargal Vocalist",  type: "singer",      price: 2000000, style: ["luxury", "traditional"],    images: ["http://localhost:5000/uploads/ent9.jpg"] },
  { name: "Pop Star Munkhjin",    type: "singer",      price: 1500000, style: ["modern", "luxury"],         images: ["http://localhost:5000/uploads/ent10.jpg"] },
  { name: "Soul Singer Anujin",   type: "singer",      price: 1000000, style: ["modern"],                   images: ["http://localhost:5000/uploads/ent11.jpg"] },
  { name: "Wedding Vocalist UB",  type: "singer",      price: 600000,  style: ["traditional", "minimal"],   images: ["http://localhost:5000/uploads/ent12.jpg"] },
  { name: "Acoustic Singer Sod",  type: "singer",      price: 350000,  style: ["minimal"],                  images: ["http://localhost:5000/uploads/ent13.jpg"] },
  { name: "Solo Vocalist Tenu",   type: "singer",      price: 250000,  style: ["minimal", "modern"],        images: ["http://localhost:5000/uploads/ent14.jpg"] },
  { name: "Budget Singer UB",     type: "singer",      price: 200000,  style: ["minimal"],                  images: ["http://localhost:5000/uploads/ent15.jpg"] },
  { name: "Grand Orchestra MN",   type: "band",        price: 2800000, style: ["luxury"],                   images: ["http://localhost:5000/uploads/ent16.jpg"] },
  { name: "Mongol Rock Band",     type: "band",        price: 2000000, style: ["modern", "party"],          images: ["http://localhost:5000/uploads/ent17.jpg"] },
  { name: "Nomad Jazz Quartet",   type: "band",        price: 1600000, style: ["luxury", "modern"],         images: ["http://localhost:5000/uploads/ent18.jpg"] },
  { name: "Steppe Sound Band",    type: "band",        price: 1200000, style: ["traditional", "modern"],    images: ["http://localhost:5000/uploads/ent19.jpg"] },
  { name: "Folk Fusion Band",     type: "band",        price: 900000,  style: ["traditional", "party"],     images: ["http://localhost:5000/uploads/ent20.jpg"] },
  { name: "UB Party Band",        type: "band",        price: 650000,  style: ["party"],                    images: ["http://localhost:5000/uploads/ent21.jpg"] },
  { name: "Acoustic Folk Duo",    type: "band",        price: 400000,  style: ["minimal", "traditional"],   images: ["http://localhost:5000/uploads/ent22.jpg"] },
  { name: "Small Jazz Trio",      type: "band",        price: 550000,  style: ["modern", "minimal"],        images: ["http://localhost:5000/uploads/ent23.jpg"] },
  { name: "Budget Cover Band",    type: "band",        price: 300000,  style: ["party", "minimal"],         images: ["http://localhost:5000/uploads/ent24.jpg"] },
  { name: "Celebrity Host Bold",  type: "host",        price: 2500000, style: ["luxury"],                   images: ["http://localhost:5000/uploads/ent25.jpg"] },
  { name: "MC Arslan Pro",        type: "host",        price: 1500000, style: ["luxury", "modern"],         images: ["http://localhost:5000/uploads/ent26.jpg"] },
  { name: "Event Host Unur",      type: "host",        price: 1000000, style: ["modern"],                   images: ["http://localhost:5000/uploads/ent27.jpg"] },
  { name: "Corporate MC Gantulga",type: "host",        price: 700000,  style: ["modern", "minimal"],        images: ["http://localhost:5000/uploads/ent28.jpg"] },
  { name: "Party MC Bataa",       type: "host",        price: 450000,  style: ["party", "modern"],          images: ["http://localhost:5000/uploads/ent29.jpg"] },
  { name: "Budget MC UB",         type: "host",        price: 250000,  style: ["minimal", "party"],         images: ["http://localhost:5000/uploads/ent30.jpg"] },
  { name: "Classical Ensemble MN",type: "instrumental",price: 2200000, style: ["luxury"],                   images: ["http://localhost:5000/uploads/ent31.jpg"] },
  { name: "String Quartet UB",    type: "instrumental",price: 1800000, style: ["luxury", "modern"],         images: ["http://localhost:5000/uploads/ent32.jpg"] },
  { name: "Piano & Violin Duo",   type: "instrumental",price: 1200000, style: ["luxury", "minimal"],        images: ["http://localhost:5000/uploads/ent33.jpg"] },
  { name: "Morin Khuur Masters",  type: "instrumental",price: 900000,  style: ["traditional", "luxury"],    images: ["http://localhost:5000/uploads/ent34.jpg"] },
  { name: "Jazz Piano Trio",      type: "instrumental",price: 700000,  style: ["modern", "luxury"],         images: ["http://localhost:5000/uploads/ent35.jpg"] },
  { name: "Guitar Acoustic Solo", type: "instrumental",price: 350000,  style: ["minimal", "modern"],        images: ["http://localhost:5000/uploads/ent36.jpg"] },
  { name: "Background Music Band",type: "instrumental",price: 200000,  style: ["minimal"],                  images: ["http://localhost:5000/uploads/ent37.jpg"] },
  { name: "Mongolian Contortion", type: "traditional", price: 1500000, style: ["traditional", "luxury"],    images: ["http://localhost:5000/uploads/ent38.jpg"] },
  { name: "Tsam Dance Troupe",    type: "traditional", price: 1200000, style: ["traditional"],              images: ["http://localhost:5000/uploads/ent39.jpg"] },
  { name: "Urtiin Duu Singers",   type: "traditional", price: 900000,  style: ["traditional"],              images: ["http://localhost:5000/uploads/ent40.jpg"] },
  { name: "Mongolian Throat Sing",type: "traditional", price: 600000,  style: ["traditional", "minimal"],   images: ["http://localhost:5000/uploads/ent41.jpg"] },
  { name: "Naadam Performers",    type: "traditional", price: 800000,  style: ["traditional", "party"],     images: ["http://localhost:5000/uploads/ent42.jpg"] },
  { name: "Heritage Dance Group", type: "traditional", price: 450000,  style: ["traditional"],              images: ["http://localhost:5000/uploads/ent43.jpg"] },
  { name: "Elite Dance Company",  type: "dance",       price: 2000000, style: ["luxury", "modern"],         images: ["http://localhost:5000/uploads/ent44.jpg"] },
  { name: "Modern Dance Crew UB", type: "dance",       price: 1200000, style: ["modern", "party"],          images: ["http://localhost:5000/uploads/ent45.jpg"] },
  { name: "Hip Hop Dance Crew",   type: "dance",       price: 800000,  style: ["party", "modern"],          images: ["http://localhost:5000/uploads/ent46.jpg"] },
  { name: "Ballroom Dance Duo",   type: "dance",       price: 600000,  style: ["luxury", "traditional"],    images: ["http://localhost:5000/uploads/ent47.jpg"] },
  { name: "Street Dance Team",    type: "dance",       price: 400000,  style: ["party"],                    images: ["http://localhost:5000/uploads/ent48.jpg"] },
  { name: "Stand-up Comedian Dav",type: "comedian",    price: 1500000, style: ["party", "modern"],          images: ["http://localhost:5000/uploads/ent49.jpg"] },
  { name: "Comedy MC Naran",      type: "comedian",    price: 900000,  style: ["party"],                    images: ["http://localhost:5000/uploads/ent50.jpg"] },
  { name: "Budget Comedian UB",   type: "comedian",    price: 400000,  style: ["party", "minimal"],         images: ["http://localhost:5000/uploads/ent51.jpg"] },
  { name: "Magic Show Ganaa",     type: "magician",    price: 700000,  style: ["party", "luxury"],          images: ["http://localhost:5000/uploads/ent52.jpg"] },
  { name: "Kids Magic & Fun",     type: "magician",    price: 350000,  style: ["party", "minimal"],         images: ["http://localhost:5000/uploads/ent53.jpg"] },
  { name: "Luxury Photo Booth",   type: "photobooth",  price: 500000,  style: ["luxury", "modern"],         images: ["http://localhost:5000/uploads/ent54.jpg"] },
  { name: "360 Video Booth UB",   type: "photobooth",  price: 650000,  style: ["modern", "party"],          images: ["http://localhost:5000/uploads/ent55.jpg"] },
];

// ── Run ───────────────────────────────────────────────────────────────────────
const seed = async () => {
  try {
    // ← family: 4 нэмсэн — DNS асуудал шийдэгддэг
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
    console.log("✅ Connected to MongoDB");

    await Promise.all([
      Venue.deleteMany({}),
      Catering.deleteMany({}),
      Entertainment.deleteMany({}),
    ]);
    console.log("🗑️  Old data cleared");

    const [v, c, e] = await Promise.all([
      Venue.insertMany(venues),
      Catering.insertMany(caterings),
      Entertainment.insertMany(entertainments),
    ]);

    console.log(`\n🏛️  Venues inserted:        ${v.length}`);
    console.log(`🍽️  Caterings inserted:      ${c.length}`);
    console.log(`🎵  Entertainment inserted:  ${e.length}`);
    console.log(`\n🔥 ZEBE DATABASE FULLY SEEDED — ${v.length + c.length + e.length} total records\n`)
    console.log(process.env.MONGO_URI);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();