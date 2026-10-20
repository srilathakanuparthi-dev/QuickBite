
import { useState } from 'react';
import './FoodHome.css';
import About from './About';
import Contact from './Contact';
import Profile from './Profile';
import Biryani from '../foods/Biryani';
import Pizza from '../foods/Pizza';
import Burger from '../foods/Burger';
import IceCream from '../foods/IceCreams';
import Drinks from '../foods/Drinks';
import Snacks from '../foods/Snacks';
import Breakfast from '../foods/Breakfast';
import Juices from '../foods/Juices';
import Desserts from '../foods/Desserts';
function FoodHome({ setPage, firstName, lastName, email }) {
  const [activePage, setActivePage] = useState('Home');
  const [search, setSearch] = useState('');

  const navItems = [
  { name: 'Home', icon: '⌂' },
  { name: 'Categories', icon: '▦' },
  { name: 'Popular', icon: '🔥' },
  { name: 'Cart', icon: '🛒' },
  
];

  const foods = [
    {
      name: 'Chicken Biryani',
      price: 199,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLETHygJZ1iGyBd7EUjwLwTLqVqBbWrtHBL1FpyvRz9j4_4aXa0_CbLs&s=10',
      rating: '4.8',
      category: 'Biryani',
    },
    {
      name: 'Cheese Pizza',
      price: 249,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRhvDtNesgvHCoy7xdzRqS1tFwWP6Hyg4fnB7_6HvQ59ya346FrEtxzY&s=10',
      rating: '4.7',
      category: 'Pizza',
    },
    {
      name: 'Chicken Burger',
      price: 149,
      image: 'https://media.istockphoto.com/id/539243164/photo/crispy-chicken-burger.jpg?s=612x612&w=0&k=20&c=rKASkwLpNnhEU7gyCAlHw8wrPnK-mpN_xuypwiGzVsQ=',
      rating: '4.6',
      category: 'Burger',
    },
    {
      name: 'Ice Cream',
      price: 99,
      image: 'https://media.gettyimages.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=612x612&w=gi&k=20&c=AniWX1OhaarUxCkgjUoKiA3bKVllK0upCylW6Z0PCMQ=',
      rating: '4.5',
      category: 'Ice Creams',
    },
    {
      name: 'Cold Coffee',
      price: 89,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-0-V-C0wg2sCwJS1s_0d6evu0Hy3ak_a3l2PjWXfAGNhpKQ2X_3ayqzKF&s=10',
      rating: '4.4',
      category: 'Drinks',
    },
    {
      name: 'French Fries',
      price: 119,
      image: 'https://img.magnific.com/free-psd/crispy-french-fries-red-carton-delicious-fast-food-treat_191095-83291.jpg?semt=ais_hybrid&w=740&q=80',
      rating: '4.5',
      category: 'Snacks',
    },
  ];

  const categories = [
    { name: 'Biryani', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLETHygJZ1iGyBd7EUjwLwTLqVqBbWrtHBL1FpyvRz9j4_4aXa0_CbLs&s=10' },
    { name: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRhvDtNesgvHCoy7xdzRqS1tFwWP6Hyg4fnB7_6HvQ59ya346FrEtxzY&s=10' },
    { name: 'Burger', image: 'https://media.istockphoto.com/id/539243164/photo/crispy-chicken-burger.jpg?s=612x612&w=0&k=20&c=rKASkwLpNnhEU7gyCAlHw8wrPnK-mpN_xuypwiGzVsQ=' },
    { name: 'Breakfast', image: 'https://t3.ftcdn.net/jpg/12/91/96/02/240_F_1291960271_5JtXQTlsBXP6WDkfnwQXQ6HytAYie5AQ.jpg' },
    { name: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-0-V-C0wg2sCwJS1s_0d6evu0Hy3ak_a3l2PjWXfAGNhpKQ2X_3ayqzKF&s=10' },
    { name: 'Snacks', image: 'https://static.toiimg.com/photo/59217136.cms' },
    { name: 'Juices', image: 'https://i.pinimg.com/736x/4b/75/17/4b7517e674a877ae336161d8abc1515f.jpg' },
    { name: 'Ice Creams', image: 'https://media.gettyimages.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=612x612&w=gi&k=20&c=AniWX1OhaarUxCkgjUoKiA3bKVllK0upCylW6Z0PCMQ=' },
    { name: 'Desserts', image: 'https://media.istockphoto.com/id/541267186/photo/chocolate-fondant-with-strawberries-and-powdered-sugar.jpg?s=612x612&w=0&k=20&c=6a_-IAUELw0zVMR0vjVtr9UiDg_GAN-S3eowoDGsMhI=' },
  ];
  const categoryComponents = {
  Biryani: Biryani,
  Pizza: Pizza,
  Burger: Burger,
  'Ice Creams': IceCream,
  Drinks: Drinks,
  Snacks: Snacks,
  Breakfast: Breakfast,
  Juices: Juices,
  Desserts: Desserts,
};

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  function renderFoods(items) {
    return (
      <div className="food-grid">
        {items.length > 0 ? (
          items.map((food) => (
            <div className="food-card" key={food.name}>
              <img src={food.image} alt={food.name} />

              <div className="food-info">
                <h3>{food.name}</h3>
                <p className="food-rating">⭐ {food.rating}</p>

                <div className="food-bottom">
                  <strong>₹{food.price}</strong>
                  <button
                    onClick={() => alert(`${food.name} - cart feature coming soon!`)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-food">No food items found.</p>
        )}
      </div>
    );
  }

  return (
    <div className="food-home">
      
{/* Top header */}
<header className="top-bar">
  <div className="brand-logo">
    <span>🍔</span>
    <h2>QuickBite</h2>
  </div>

  <div className="search-box">
    <span>🔍</span>
    <input
      type="text"
      placeholder="Search food..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="header-links">
  <a
    href="#about"
    onClick={(e) => {
      e.preventDefault();
      setActivePage('About');
    }}
  >
    About
  </a>

  <a
    href="#contact"
    onClick={(e) => {
      e.preventDefault();
      setActivePage('Contact Us');
    }}
  >
    Contact Us
  </a>
</div>

  <button
  className="profile-button"
  onClick={() => setActivePage('Profile')}
  aria-label="Profile"
>
  👤
</button>
</header>


      <main className="home-content">
        {/* HOME PAGE */}
        {activePage === 'Home' && (
          <>
            <section className="welcome-banner">
              <p>Welcome to QuickBite</p>
              <h1>Good Food, Happy Mood!</h1>
              <p>Discover delicious food near you.</p>
            </section>

            {/* Banner image */}
            <section className="hero-image">
              <img
                src="https://t3.ftcdn.net/jpg/06/20/60/30/360_F_620603097_9gGKtJXGYbBhAZL4e18aMjrQOzjX4GRO.jpg"
                alt="Delicious food collection"
              />

              <div className="hero-text">
                <h2>Delicious Food, Delivered!</h2>
                <p>Your favourite food is just a click away.</p>
              </div>
            </section>

            {/* Explore Foods */}
            <h2 className="section-title">Explore Foods</h2>
            {renderFoods(filteredFoods)}

            {/* Popular Foods */}
            <h2 className="section-title">🔥 Popular Foods</h2>
            {renderFoods(filteredFoods)}
          </>
        )}

        {/* CATEGORIES PAGE */}
        {activePage === 'Categories' && (
          <section>
            <h2 className="section-title">Food Categories</h2>

            <div className="category-grid">
              {categories.map((category) => (
                <button
                  className="category-item"
                  key={category.name}
                  onClick={() => {
                    setSearch('');
                    setActivePage(category.name);
                }}
                >
                  <img src={category.image} alt={category.name} />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}
            {categoryComponents[activePage] && (
  <section>
    <button onClick={() => setActivePage('Categories')}>
      ← Back to Categories
    </button>

    <h2 className="section-title">{activePage}</h2>

    {(() => {
      const SelectedCategory = categoryComponents[activePage];
      return <SelectedCategory />;
    })()}
  </section>
)}

        {/* POPULAR PAGE */}
        {activePage === 'Popular' && (
          <section>
            <h2 className="section-title">🔥 Popular Foods</h2>
            {renderFoods(filteredFoods)}
          </section>
        )}

        {/* CART PAGE */}
        {activePage === 'Cart' && (
          <section className="empty-cart">
            <span>🛒</span>
            <h2>Your Cart</h2>
            <p>Cart functionality will be added later.</p>
            <button onClick={() => setActivePage('Home')}>
              Explore Foods
            </button>
          </section>
        )}
        {/* ABOUT PAGE */}
{activePage === 'About' && <About />}
{/* CONTACT PAGE */}
{activePage === 'Contact Us' && <Contact />}
{activePage === 'Profile' && (
  <Profile
    firstName={firstName}
    lastName={lastName}
    email={email}
  />
)}
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name ? 'nav-item active' : 'nav-item'
            }
            onClick={() => {
              setActivePage(item.name);
              setSearch('');
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default FoodHome;