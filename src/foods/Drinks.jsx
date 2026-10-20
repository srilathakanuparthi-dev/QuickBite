

function Drinks() {
  const drinkItems = [
    { name: 'Cold Coffee', price: 99, rating: '4.5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLXUyhKqYnthSPc3lOblU6Y-wck3u3BccePUBB3-21RKPiihoZ7BsUAXI&s=10' },
    { name: 'Chocolate Milkshake', price: 119, rating: '4.6', image: 'https://cookilicious.com/wp-content/uploads/2025/01/Brownie-Milkshake-Recipe-20-500x500.jpg' },
    { name: 'Lemon Soda', price: 49, rating: '4.2', image: 'https://img.magnific.com/free-psd/refreshing-lemonade-drink-with-fresh-lemons-ice_84443-65868.jpg?semt=ais_hybrid&w=740&q=80' },
    { name: 'Mango Shake', price: 109, rating: '4.5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8S8Xq7aMbOqJ0p_IVy7RX2KOdJbQBx7OqbIOTiDeECyqmo1rH4IB2GWw&s=10' },
    { name: 'Oreo Milkshake', price: 129, rating: '4.7', image: 'https://tastesbetterfromscratch.com/wp-content/uploads/2024/06/Oreo-Milkshake24-1.jpg' },
    { name: 'Iced Tea', price: 79, rating: '4.3', image: 'https://bakingamoment.com/wp-content/uploads/2024/05/IMG_3367-iced-tea.jpg' },
  ];

  return (
    <div className="food-grid">
      {drinkItems.map((food) => (
        <div className="food-card" key={food.name}>
          <img src={food.image} alt={food.name} />
          <div className="food-info">
            <h3>{food.name}</h3>
            <p>⭐ {food.rating} · 10–15 mins</p>
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

export default Drinks;
