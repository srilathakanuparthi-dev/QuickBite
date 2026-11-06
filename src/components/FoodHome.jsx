import { useState, useEffect, useCallback } from 'react';
import './FoodHome.css';
import Checkout from './Checkout';
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

function FoodHome({ setPage, firstName, lastName, email, userId, token, apiFetch, onLogout }) {
  const [activePage, setActivePage] = useState('Home');
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState([]);
const [cartTotal, setCartTotal] = useState(0);
const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
const [cartLoading, setCartLoading] = useState(false);
const [orders, setOrders] = useState([]);
const [ordersLoading, setOrdersLoading] = useState(false);
const [ordersError, setOrdersError] = useState('');
const [toastMessage, setToastMessage] = useState('');
const fetchCart = useCallback(async () => {
  if (!userId) {
    setCartItems([]);
    return;
  }

  try {
    setCartLoading(true);

    const response = await apiFetch(
      `http://localhost:8080/api/cart/${userId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    const data = await response.json();
    setCartItems(data);

  } catch (error) {
    console.error('Cart fetch error:', error);
  } finally {
    setCartLoading(false);
  }
}, [userId, apiFetch]);

useEffect(() => {
  fetchCart();
}, [fetchCart]);
useEffect(() => {
  if (activePage !== 'Order History') return;

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError('');

      const response = await apiFetch(
        `http://localhost:8080/api/orders/user/${userId}`,
        {
          headers: {
          }
        }
      );

      if (!response.ok) {
        throw new Error('Unable to load orders');
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
      setOrdersError(error.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  fetchOrders();
}, [activePage, userId, token, apiFetch]);
const handleAddToCart = async (foodId) => {
    if (!userId) {
        alert("Please login to add items to cart");
        return;
    }

    try {
        const response = await apiFetch(
    `http://localhost:8080/api/cart/${userId}/add/${foodId}`,
    {
        method: "POST",
        headers: {
        }
    }
);

        if (!response.ok) {
            throw new Error("Failed to add item to cart");
        }

        // Refresh cart after adding item
       const cartResponse = await apiFetch(
    `http://localhost:8080/api/cart/${userId}`,
    {
        headers: {
        }
    }
);
        const updatedCart = await cartResponse.json();
        setCartItems(updatedCart);

        setToastMessage("Item added successfully!");

setTimeout(() => {
    setToastMessage('');
}, 2500);
    } catch (error) {
        console.error("Add to cart error:", error);
        alert("Unable to add item to cart");
    }
};
const updateCartQuantity = async (foodId, quantity) => {
  try {
    if (quantity <= 0) {
      await removeFromCart(foodId);
      return;
    }

    await apiFetch(
      `http://localhost:8080/api/cart/${userId}/update/${foodId}/${quantity}`,
      { method: "PUT" }
    );

    const response = await apiFetch(
    `http://localhost:8080/api/cart/${userId}`,
    {
        headers: {
        }
    }
);

    const data = await response.json();
    setCartItems(data);
  } catch (error) {
    console.error("Quantity update failed:", error);
  }
};

const removeFromCart = async (foodId) => {
  try {
    await apiFetch(
      `http://localhost:8080/api/cart/${userId}/remove/${foodId}`,
      { method: "DELETE" }
    );

    const response = await apiFetch(
    `http://localhost:8080/api/cart/${userId}`,
    {
        headers: {
        }
    }
);
    const data = await response.json();
    setCartItems(data);
  } catch (error) {
    console.error("Remove item failed:", error);
  }
};
  const [backendFoods, setBackendFoods] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navItems = [
    { name: 'Home', icon: '⌂' },
    { name: 'Categories', icon: '▦' },
    { name: 'Popular', icon: '🔥' },
    { name: 'Cart', icon: '🛒' },
  
  ];

  // Default food items - fallback data
  const defaultFoods = [
    {
      foodId: 1,
      name: 'Chicken Biryani',
      price: 199,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLETHygJZ1iGyBd7EUjwLwTLqVqBbWrtHBL1FpyvRz9j4_4aXa0_CbLs&s=10',
      rating: '4.8',
      category: 'Biryani',
    },
    {
      foodId: 2,
      name: 'Cheese Pizza',
      price: 249,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRhvDtNesgvHCoy7xdzRqS1tFwWP6Hyg4fnB7_6HvQ59ya346FrEtxzY&s=10',
      rating: '4.7',
      category: 'Pizza',
    },
    {
      foodId: 3,
      name: 'Chicken Burger',
      price: 149,
      image: 'https://media.istockphoto.com/id/539243164/photo/crispy-chicken-burger.jpg?s=612x612&w=0&k=20&c=rKASkwLpNnhEU7gyCAlHw8wrPnK-mpN_xuypwiGzVsQ=',
      rating: '4.6',
      category: 'Burger',
    },
    {
      foodId: 4,
      name: 'Ice Cream',
      price: 99,
      image: 'https://media.gettyimages.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=612x612&w=gi&k=20&c=AniWX1OhaarUxCkgjUoKiA3bKVllK0upCylW6Z0PCMQ=',
      rating: '4.5',
      category: 'Ice Creams',
    },
    {
      foodId: 5,
      name: 'Cold Coffee',
      price: 89,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-0-V-C0wg2sCwJS1s_0d6evu0Hy3ak_a3l2PjWXfAGNhpKQ2X_3ayqzKF&s=10',
      rating: '4.4',
      category: 'Drinks',
    },
    {
      foodId: 6,
      name: 'French Fries',
      price: 119,
      image: 'https://img.magnific.com/free-psd/crispy-french-fries-red-carton-delicious-fast-food-treat_191095-83291.jpg?semt=ais_hybrid&w=740&q=80',
      rating: '4.5',
      category: 'Snacks',
    },
  ];

  // Fetch foods from Spring Boot backend
  useEffect(() => {
    let cancelled = false;

    const fetchFoods = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/foods'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid backend response');
        }

        // Convert backend food data into frontend format
        const normalizedFoods = data.map((food) => ({
          ...food,
          foodId: food.foodId ?? food.id,
          name: food.name ?? '',
          price: Number(food.price ?? 0),
          rating: food.rating ?? '',
          image: food.imageUrl || food.image || '',
          time: food.prepTime || food.time || '',
        }));

        if (!cancelled) {
          setBackendFoods(normalizedFoods);
          setError('');
        }

      } catch (err) {
        console.error('Backend error:', err);

        if (!cancelled) {
          setError(
            'Backend connection failed. Showing default foods.'
          );
          setBackendFoods(null);
        }

      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFoods();

    return () => {
      cancelled = true;
    };
  }, []);

  // Use backend foods when available
  // Otherwise use default foods
  const foods =
    backendFoods === null ? defaultFoods : backendFoods;

  // Category images
  const categories = [
    {
      name: 'Biryani',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLETHygJZ1iGyBd7EUjwLwTLqVqBbWrtHBL1FpyvRz9j4_4aXa0_CbLs&s=10'
    },
    {
      name: 'Pizza',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRhvDtNesgvHCoy7xdzRqS1tFwWP6Hyg4fnB7_6HvQ59ya346FrEtxzY&s=10'
    },
    {
      name: 'Burger',
      image: 'https://media.istockphoto.com/id/539243164/photo/crispy-chicken-burger.jpg?s=612x612&w=0&k=20&c=rKASkwLpNnhEU7gyCAlHw8wrPnK-mpN_xuypwiGzVsQ='
    },
    {
      name: 'Breakfast',
      image: 'https://t3.ftcdn.net/jpg/12/91/96/02/240_F_1291960271_5JtXQTlsBXP6WDkfnwQXQ6HytAYie5AQ.jpg'
    },
    {
      name: 'Drinks',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-0-V-C0wg2sCwJS1s_0d6evu0Hy3ak_a3l2PjWXfAGNhpKQ2X_3ayqzKF&s=10'
    },
    {
      name: 'Snacks',
      image: 'https://static.toiimg.com/photo/59217136.cms'
    },
    {
      name: 'Juices',
      image: 'https://i.pinimg.com/736x/4b/75/17/4b7517e674a877ae336161d8abc1515f.jpg'
    },
    {
      name: 'Ice Creams',
      image: 'https://media.gettyimages.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=612x612&w=gi&k=20&c=AniWX1OhaarUxCkgjUoKiA3bKVllK0upCylW6Z0PCMQ='
    },
    {
      name: 'Desserts',
      image: 'https://media.istockphoto.com/id/541267186/photo/chocolate-fondant-with-strawberries-and-powdered-sugar.jpg?s=612x612&w=0&k=20&c=6a_-IAUELw0zVMR0vjVtr9UiDg_GAN-S3eowoDGsMhI='
    },
  ];

  // Category component mapping
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

  // Search functionality
  const filteredFoods = foods.filter((food) =>
    (food.name || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Explore Foods - all foods
const exploreFoods = filteredFoods;

// Popular Foods - highest rating first
const popularFoods = [...filteredFoods]
  .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
  .slice(0, 6);

  // Get image for each food
  const getFoodImage = (food) => {
    if (food.imageUrl) return food.imageUrl;
    if (food.image) return food.image;

    const defaultFood = defaultFoods.find(
      (item) =>
        item.name.trim().toLowerCase() ===
        (food.name || '').trim().toLowerCase()
    );

    if (defaultFood) return defaultFood.image;

    const category = categories.find(
      (item) =>
        item.name.toLowerCase() ===
        (food.category || '').trim().toLowerCase()
    );

    return (
      category?.image ||
      'https://placehold.co/300x200?text=Food'
    );
  };

  // Render food cards
  // Render food cards
function renderFoods(items) {
  return (
    <div className="food-grid">
      {items.length > 0 ? (
        items.map((food) => (
          <div
            className="food-card"
            key={food.foodId || food.name}
          >
            <img
              src={getFoodImage(food)}
              alt={food.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://placehold.co/300x200?text=Food';
              }}
            />

            <div className="food-info">
              <h3>{food.name}</h3>

              <div className="food-meta">
                {food.rating && (
                  <span>⭐ {food.rating}</span>
                )}

                {food.time && (
                  <span>· {food.time}</span>
                )}
              </div>

              <div className="food-bottom">
                <strong>₹{food.price}</strong>

                <button
                  onClick={() => handleAddToCart(food.foodId)}
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-food">No foods found.</p>
      )}
    </div>
  );
}

  return (
    <div className="food-home">

        {toastMessage && (
            <div className="toast-message">
                {toastMessage}
            </div>
        )}

        {/* Top header */}
        <header className="top-bar">
        <div className="brand-logo">
          <span>🍔</span>
          <h2>QuickBite</h2>
        </div>

        <div className="search-container">
  <div className="search-box">
    <span>🔍</span>
    <input
      type="text"
      placeholder="Search food..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {search.trim() && (
    <div className="search-suggestions">
      {filteredFoods.length > 0 ? (
        filteredFoods.slice(0, 5).map((food) => (
          <div
            key={food.foodId}
            className="suggestion-item"
            onClick={() => {
              setSearch(food.name);
              setActivePage('Popular');
            }}
          >
            🔍 {food.name}
          </div>
        ))
      ) : (
        <div className="suggestion-item">
          No matching foods found
        </div>
      )}
    </div>
  )}
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
                <p>
                  Your favourite food is just a click away.
                </p>
              </div>
            </section>

            {/* Explore Foods */}
<h2 className="section-title">Explore Foods</h2>

{loading ? (
  <p className="no-food">Loading foods...</p>
) : (
  <>
    {error && <p className="no-food">{error}</p>}
    {search.trim() ? (
  <>
    <h2 className="section-title">Search Results</h2>
    {renderFoods(filteredFoods)}
  </>
) : (
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
)}
  </>
)}

            {/* Popular Foods */}
<h2 className="section-title">
    {search.trim()
        ? `Search Results for "${search}"`
        : '🔥 Popular Foods'}
</h2>

{loading ? (
    <p className="no-food">Loading foods...</p>
) : (
    renderFoods(search.trim() ? filteredFoods : popularFoods)
)}
</>
)}


        {/* CATEGORIES PAGE */}
        {activePage === 'Categories' && (
          <section>
            <h2 className="section-title">
              Food Categories
            </h2>

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
                  <img
                    src={category.image}
                    alt={category.name}
                  />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CATEGORY COMPONENTS */}
        {categoryComponents[activePage] && (
          <section>
            <button
              onClick={() => setActivePage('Categories')}
            >
              ← Back to Categories
            </button>

            <h2 className="section-title">
              {activePage}
            </h2>

            {(() => {
              const SelectedCategory =
                categoryComponents[activePage];

              return (
  <SelectedCategory
    foods={foods}
    onAddToCart={handleAddToCart}
  />
);
            })()}
          </section>
        )}

        {/* POPULAR PAGE */}
        {activePage === 'Popular' && (
          <section>
            <h2 className="section-title">
              🔥 Popular Foods
            </h2>

            {loading ? (
              <p className="no-food">Loading foods...</p>
            ) : (
              renderFoods(popularFoods)
            )}
          </section>
        )}

    {/* CART PAGE */}
{activePage === 'Cart' && (
  <section className="cart-page">
    <h1 className="section-title">Your Cart</h1>

    {cartLoading ? (
      <p>Loading cart...</p>
    ) : cartItems.length === 0 ? (
      <div className="empty-cart">
        <h2>Your Cart is Empty 🛒</h2>
        <button onClick={() => setActivePage('Home')}>
          Explore Foods
        </button>
      </div>
    ) : (
      <>
        <div className="cart-header">
          <span>PRODUCT</span>
          <span>QUANTITY</span>
          <span>TOTAL</span>
        </div>

        {cartItems.map((item) => (
          <div className="cart-item" key={item.cartItemId}>

           <img
  src={item.food.imageUrl}
  alt={item.food.name}
  className="cart-item-image"
/>
            <div className="cart-product-info">
              <h3>{item.food.name}</h3>
              <p>₹{item.food.price}</p>
            </div>

            <div className="cart-quantity">
              <button
                onClick={() =>
                  updateCartQuantity(item.food.foodId, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateCartQuantity(item.food.foodId, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            <strong className="cart-item-total">
              ₹{item.food.price * item.quantity}
            </strong>

            <button
              className="cart-delete"
              onClick={() => removeFromCart(item.food.foodId)}
            >
              🗑️
            </button>

          </div>
        ))}

        <div className="cart-grand-total">
          <h2>
            Grand Total: ₹
            {cartItems.reduce(
              (total, item) =>
                total + item.food.price * item.quantity,
              0
            )}
          </h2>
        </div>
        <button
  className="checkout-btn"
  onClick={() => setActivePage('Checkout')}
  disabled={cartItems.length === 0}
>
  Proceed to Checkout
</button>
      </>
    )}
  </section>
)}
{activePage === 'Order History' && (
  <section className="order-history-page">

    <h1 className="section-title">
      📦 My Orders
    </h1>

    {ordersLoading ? (
      <p>Loading orders...</p>
    ) : ordersError ? (
      <p className="no-food">{ordersError}</p>
    ) : orders.length === 0 ? (
      <div className="empty-cart">
        <h2>No Orders Yet</h2>
        <p>Your orders will appear here.</p>

        <button onClick={() => setActivePage('Home')}>
          Explore Foods
        </button>
      </div>
    ) : (
      <div className="orders-list">

        {orders.map((order, index) => (
          <div className="checkout-card" key={order.orderId || index}>

            <h2>Order #{order.orderId}</h2>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>

          </div>
        ))}

      </div>
    )}

  </section>
)}
        {activePage === 'Checkout' && (
   <Checkout
    cartItems={cartItems}
    setCartItems={setCartItems}
    userId={userId}
    token={token}
    apiFetch={apiFetch}
    setActivePage={setActivePage}
/>
)}
        {/* ABOUT PAGE */}
        {activePage === 'About' && <About />}

        {/* CONTACT PAGE */}
        {activePage === 'Contact Us' && <Contact />}

        {/* PROFILE PAGE */}
        {activePage === 'Profile' && (
  <Profile
    firstName={firstName}
    lastName={lastName}
    email={email}
    userId={userId}
  token={token}
    apiFetch={apiFetch}
    onLogout={onLogout}
  />
)}

      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() => {
              setActivePage(item.name);
              setSearch('');
            }}
          >
            <span className="nav-icon">
  {item.icon}

  {item.name === 'Cart' && cartCount > 0 && (
    <span className="cart-badge">
      {cartCount}
    </span>
  )}
</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}

export default FoodHome;