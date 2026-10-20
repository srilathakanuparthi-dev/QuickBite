

function Snacks() {
  const snackItems = [
    { name: 'French Fries', price: 99, rating: '4.4', image: 'https://www.allrecipes.com/thmb/8_B6OD1w6h1V0zPi8KAGzD41Kzs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50223-homemade-crispy-seasoned-french-fries-VAT-Beauty-4x3-789ecb2eaed34d6e879b9a93dd56a50a.jpg' },
    { name: 'Veg Sandwich', price: 89, rating: '4.2', image: 'https://i0.wp.com/gomathirecipes.com/wp-content/uploads/2022/09/19-17.jpg?resize=500%2C500&ssl=1' },
    { name: 'Chicken Nuggets', price: 149, rating: '4.6', image: 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-chicken-nuggets-and-ketchup-on-a-brown-table-image_2888101.jpg' },
    { name: 'Samosa', price: 30, rating: '4.3', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg' },
    { name: 'Paneer Puff', price: 45, rating: '4.2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1JqRBd7AbjUw31I8QlyMQ5cyUIilFgiKpwLiDf1n8oSVtktPp3lW2mCw&s=10' },
    { name: 'Spring Rolls', price: 119, rating: '4.5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8EXZcoFQNNndXLlPkOaFpT998wEeUJ74hj8mod_hIpVEx5OfNZkRc5Q&s=10' },
  ];

  return (
    <div className="food-grid">
      {snackItems.map((food) => (
        <div className="food-card" key={food.name}>
          <img src={food.image} alt={food.name} />
          <div className="food-info">
            <h3>{food.name}</h3>
            <p>⭐ {food.rating} · 15–20 mins</p>
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

export default Snacks;