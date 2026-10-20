

function IceCreams() {
  const iceCreamItems = [
    { name: 'Vanilla Ice Cream', price: 59, rating: '4.3', image: 'https://delightfuladventures.com/wp-content/uploads/2024/09/vegan-vanilla-ice-cream-recipe.jpg' },
    { name: 'Chocolate Ice Cream', price: 79, rating: '4.6', image: 'https://vintagekitchennotes.com/wp-content/uploads/2024/09/Bowl-of-chocolate-ice-cream.jpg' },
    { name: 'Strawberry Ice Cream', price: 69, rating: '4.4', image: 'https://www.adashofmegnut.com/wp-content/uploads/2022/09/Strawberry-Ice-Cream-1.jpg' },
    { name: 'Butterscotch Ice Cream', price: 89, rating: '4.5', image: 'https://www.a2zshoppy.com/media/image?path=uploads%2Fmedia%2F2025%2Fbutterscotchicecream_a2z_shoppy.jpg&width=800&quality=80' },
    { name: 'Mango Ice Cream', price: 79, rating: '4.4', image: 'https://www.kuchpakrahahai.in/wp-content/uploads/2015/06/Mango-Ice-Cream-No-Churn-e1626111480751.jpg' },
    { name: 'Chocolate Sundae', price: 129, rating: '4.7', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMDrPHf6fDMXkrwdw7AurwUemZTGsc6JHbcS4adqlnVyFTEYLA2VfuyMl&s=10' },
  ];

  return (
    <div className="food-grid">
      {iceCreamItems.map((food) => (
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

export default IceCreams;