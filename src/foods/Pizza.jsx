
function Pizza() {
  const pizzaItems = [
    {
      name: 'Margherita Pizza',
      price: 149,
      rating: '4.3',
      image: 'https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/8d758bcc-6e42-4c80-b649-a6067d726d7f/Margherita-Pizza.png',
    },
    {
      name: 'Chicken Pizza',
      price: 249,
      rating: '4.6',
      image: 'https://lifeloveandgoodfood.com/wp-content/uploads/2026/02/BBQ-Chicken-Pizza-14-1200x1200-1.jpg',
    },
    {
      name: 'Corn Pizza',
      price: 169,
      rating: '4.4',
      image: 'https://cdn.uengage.io/uploads/66344/image-BVPYDK-1768653631.png',
    },
    {
      name: 'Farmhouse Pizza',
      price: 219,
      rating: '4.5',
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/f9701b4e9e6aae4febe5e52c9f5e36f9',
    },
    {
      name: 'Paneer Pizza',
      price: 199,
      rating: '4.4',
      image: 'https://i.pinimg.com/736x/ff/b8/e8/ffb8e8c94bf6210bf383e050520b00cf.jpg',
    },
    {
      name: 'Cheese Burst Pizza',
      price: 279,
      rating: '4.7',
      image: 'https://www.oetker.in/assets/recipes/assets/89398df9d59d4a4795357ed8228c04bb/750x910/cheese-burst-pizza.webp',
    },
  ];

  return (
    <div className="food-grid">
      {pizzaItems.map((food) => (
        <div className="food-card" key={food.name}>
          <img src={food.image} alt={food.name} />

          <div className="food-info">
            <h3>{food.name}</h3>

            <p>⭐ {food.rating} · 25–30 mins</p>

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

export default Pizza;