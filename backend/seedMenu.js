const mongoose = require('mongoose');
const Menu = require('./models/menu.models');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/india_restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const dishes = [
  // Starters
  { name: "Paneer Tikka", price: 180, category: "Starters", description: "Grilled cottage cheese cubes marinated with spices.", image: "images/paneerTikka.jpeg" },
  { name: "Veg Spring Roll", price: 150, category: "Starters", description: "Crispy rolls filled with fresh vegetables.", image: "images/vegSpringRoll.jpeg" },
  { name: "Hara Bhara Kabab", price: 170, category: "Starters", description: "Healthy green cutlets made from spinach and peas.", image: "images/haraBharaKabab.jpg" },

  // Main Course
  { name: "Veg Thali", price: 250, category: "Main Course", description: "A wholesome vegetarian meal served with rice, dal, and sabzi.", image: "images/veg thali.jpg" },
  { name: "Maharastrian Thali", price: 250, category: "Main Course", description: "Served with rice, dal, puran poli and sabzi.", image: "images/maharastrian thali.jpg" },
  { name: "South Indian Thali", price: 250, category: "Main Course", description: "Served with ghee poli rice, dal, rasam, sambar and sabzi.", image: "images/south indian thali.avif" },

  // Biryani
  { name: "Veg Biryani", price: 200, category: "Biryani", description: "Fragrant basmati rice cooked with vegetables and spices.", image: "images/veg biryani.webp" },
  { name: "Hyderabadi Biryani", price: 250, category: "Biryani", description: "Special Hyderabadi style biryani with aromatic spices.", image: "images/hyderabadi biryani.jpg" },

  // Desserts
  { name: "Gulab Jamun", price: 80, category: "Desserts", description: "Soft, sweet dumplings soaked in sugar syrup.", image: "images/gulabjamun.webp" },
  { name: "Peshawari Kheer", price: 150, category: "Desserts", description: "Rich rice pudding with dry fruits.", image: "images/peshwari kheer.jpeg" },

  // Drinks
  { name: "Masala Chai", price: 50, category: "Drinks", description: "Traditional spiced tea served hot.", image: "images/masalachai.jpg" },
  { name: "Lassi", price: 50, category: "Drinks", description: "Curd blend with sugar, cream, dry fruits.", image: "images/lassi drinks.webp" }
];

async function seed() {
  try {
    await Menu.deleteMany(); // Clear existing menu
    await Menu.insertMany(dishes);
    console.log('✅ Menu seeded successfully!');
    mongoose.connection.close();
  } catch(err) {
    console.error('❌ Seeding failed:', err);
    mongoose.connection.close();
  }
}

seed();
