

function Desserts() {
  const dessertItems = [
    { name: 'Chocolate Brownie', price: 99, rating: '4.6', image: 'https://www.chelsea.co.nz/hubfs/Best%20Chocolate%20Brownie%20Recipe%20NZ%20Chelsea%20Sugar.jpg' },
    { name: 'Chocolate Cake', price: 129, rating: '4.7', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5fhTpgx5xNUx0SYisF_HlGEJIHN-LerBt97eFB4pfzihNAQcI7gMSLenG&s=10' },
    { name: 'Gulab Jamun', price: 59, rating: '4.5', image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2022/10/gulab-jamun-recipe-01.jpg' },
    { name: 'Rasmalai', price: 79, rating: '4.4', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ocD3Ml4AnzEmWstqL7YUqYqCSvm1vF9DQRNgrd90YhAbRfjespSJOSVS&s=10' },
    { name: 'Cheesecake', price: 159, rating: '4.7', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShLuNEaAW8Bblm6yrt5Da75w2OG49qsDFgdGuQGJ-7Csr95xEHF6BT2rM&s=10' },
    { name: 'Chocolate Waffle', price: 139, rating: '4.5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjm4P4SSbaEapoKuEy0TglJNb6qokLGNHEdp3lVVjIiorMqQIuTureq0k&s=10' },
    { name: 'Caramel Pudding', price: 89, rating: '4.3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZHiV1y0CPHg7-krhSOUCNR-sSo6px74FJyAZcHNwFbrnFKDy7gzWk_i0&s=10' },
  ];

  return (
    <div className="food-grid">
      {dessertItems.map((food) => (
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

export default Desserts;
