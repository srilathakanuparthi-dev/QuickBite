

function Breakfast() {
  const breakfastItems = [
    { name: 'Idli', price: 40, rating: '4.3', image:'https://media.istockphoto.com/id/638506124/photo/idli-with-coconut-chutney-and-sambhar.jpg?s=612x612&w=is&k=20&c=ee5328pQfD-dr3JHixx8Y1Cnry5lHdQSCJseOmshXk0='},
    { name: 'Masala Dosa', price: 80, rating: '4.6', image: 'https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-1014x1536.jpg' },
    { name: 'Plain Dosa', price: 60, rating: '4.4', image: 'https://as2.ftcdn.net/v2/jpg/08/52/30/21/1000_F_852302108_0QNsp1eGpvvqC4OvTt3WaO5eZcLqemYn.jpg' },
    { name: 'Poori', price: 70, rating: '4.3', image: 'https://www.awesomecuisine.com/wp-content/uploads/2020/03/poori-masala-kizhangu.jpg' },
    { name: 'Pongal', price: 65, rating: '4.2', image: 'https://indianrecipestoday.com/wp-content/uploads/2026/01/Ven-Pongal-Recipe-with-Sambar-on-Banana-Leaf.jpg' },
    { name: 'Vada', price: 35, rating: '4.4', image: 'https://static.vecteezy.com/system/resources/thumbnails/071/434/640/small/realistic-indian-medu-vada-served-with-sambar-and-chutney-traditional-south-indian-breakfast-photo.jpg' },
    { name: 'Upma', price: 45, rating: '4.1', image: 'https://t4.ftcdn.net/jpg/10/88/62/83/360_F_1088628359_6ZskzdYQNvfT1QICDXE0W9kpISi4kgS4.jpg' },
    { name: 'Pesarattu', price: 75, rating: '4.5', image: 'https://i0.wp.com/chitrasfoodbook.com/wp-content/uploads/2022/07/pesarattu-allam-pachadi-1.jpg?resize=500%2C533&ssl=1' },
  ];

  return (
    <div className="food-grid">
      {breakfastItems.map((food) => (
        <div className="food-card" key={food.name}>
          <img src={food.image} alt={food.name} />
          <div className="food-info">
            <h3>{food.name}</h3>
            <p>⭐ {food.rating} · 15–25 mins</p>
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

export default Breakfast;
