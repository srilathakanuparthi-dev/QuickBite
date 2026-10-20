
function Juices() {
  const juiceItems = [
    {
      name: 'Orange Juice',
      price: 60,
      rating: '4.4',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500'
    },
    {
      name: 'Mango Juice',
      price: 70,
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500'
    },
    {
      name: 'Watermelon Juice',
      price: 50,
      rating: '4.3',
      image: 'https://www.rebootwithjoe.com/wp-content/uploads/2012/05/watermelon-pineapple-juice.jpg'
    },
    {
      name: 'Pineapple Juice',
      price: 65,
      rating: '4.5',
      image: 'https://tiimg.tistatic.com/fp/1/007/673/fresh-and-zero-added-sugar-low-calories-natural-fresh-tasty-refreshing-pineapple-juice-014.jpg'
    },
    {
      name: 'Apple Juice',
      price: 60,
      rating: '4.4',
      image: 'https://tandobeverage.com/wp-content/uploads/apple-juice.jpg'
    },
    {
      name: 'Lemon Juice',
      price: 35,
      rating: '4.2',
      image: 'https://steviala.com/wp-content/uploads/2020/04/lime.jpg'
    },
  ];

  return (
    <div className="food-grid">
      {juiceItems.map((food) => (
        <div className="food-card" key={food.name}>
          <img src={food.image} alt={food.name} />

          <div className="food-info">
            <h3>{food.name}</h3>
            <p>⭐ {food.rating} · 5–15 mins</p>

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

export default Juices;




  