function Biryani() {
  const biryaniItems = [
    {
      name: 'Chicken Biryani',
      price: 199,
      rating: '4.5',
      image: 'https://www.shutterstock.com/shutterstock/photos/2468105649/display_1500/stock-photo--chicken-biryani-quick-and-tasty-chicken-biryani-chicken-dum-biryani-plan-background-2468105649.jpg',
    },
    {
      name: 'Veg Biryani',
      price: 149,
      rating: '4.3',
      image: 'https://t4.ftcdn.net/jpg/05/70/58/65/360_F_570586537_TnIgWdCnaTYpgg9gsTyloz5bnvfCtdLl.jpg',
    },
    {
      name: 'Egg Biryani',
      price: 169,
      rating: '4.4',
      image: 'https://spicecravings.com/wp-content/uploads/2020/10/Egg-Biryani-Featured-1.jpg',
    },
    {
      name: 'Paneer Biryani',
      price: 179,
      rating: '4.5',
      image: 'https://orders.popskitchen.in/storage/2024/09/image-285.png',
    },
    {
      name: 'Mushroom Biryani',
      price: 189,
      rating: '4.4',
      image: 'https://cookingfromheart.com/wp-content/uploads/2017/05/Chettinad-Mushroom-Biryani-4.jpg',
    },
    {
      name: 'Mutton Biryani',
      price: 279,
      rating: '4.7',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/059/003/393/small/a-clay-bowl-filled-with-rice-and-meat-photo.jpg',
    },
  ];

  return (
    <div className="food-grid">
      {biryaniItems.map((food) => (
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

export default Biryani;