

function Burger() {
  const burgerItems = [
    { name: 'Veg Burger', price: 99, rating: '4.2', image: 'https://img.magnific.com/free-psd/delicious-vegetarian-cheeseburger-stacked-with-fresh-lettuce-tomato-red-onion-sesame-seed-bun-isolated-black-background_84443-63487.jpg?semt=ais_hybrid&w=740&q=80' },
    { name: 'Chicken Burger', price: 149, rating: '4.5', image: 'https://img.magnific.com/free-psd/crispy-fried-chicken-sandwich_84443-79178.jpg?semt=ais_hybrid&w=740&q=80' },
    { name: 'Cheese Burger', price: 129, rating: '4.4', image: 'https://t3.ftcdn.net/jpg/02/17/34/32/360_F_217343279_B3oUMemzWjycDq0Qx6kT7lt4RhYYApcB.jpg' },
    { name: 'Paneer Burger', price: 139, rating: '4.3', image: 'https://i.pinimg.com/564x/7e/e6/75/7ee675ee5e02bd3a4d6d2aff012f5269.jpg' },
    { name: 'Double Patty Burger', price: 199, rating: '4.7', image: 'https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-tall-FS-38.webp' },
    { name: 'Crispy Chicken Burger', price: 179, rating: '4.6', image: 'https://t3.ftcdn.net/jpg/09/59/77/12/360_F_959771217_5Y25CowqBak3I65StQcmPYs0uqlxr6Fb.jpg' },
  ];

  return (
    <div className="food-grid">
      {burgerItems.map((food) => (
        <div className="food-card" key={food.name}>
          <img src={food.image} alt={food.name} />
          <div className="food-info">
            <h3>{food.name}</h3>
            <p>⭐ {food.rating} · 20–30 mins</p>
            <div className="food-bottom">
              <h4>₹{food.price}</h4>
              <button type="button">ADD +</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Burger;