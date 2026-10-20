

import './About.css';
import landscape from '../assets/quickbite-landscape.png';

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="about-content">
          <p className="about-subtitle">
            ABOUT QUICKBITE
          </p>

          <h1>
            Great Food.
            <br />
            Great Moments.
          </h1>

          <p className="about-description">
            At QuickBite, we believe that good food brings
            people together. Explore a variety of delicious
            dishes, discover your favourites, and enjoy a
            simple and convenient food browsing experience.
          </p>

          <p className="about-description">
            From flavourful biryanis to cheesy pizzas and
            delicious desserts, there is something for
            every food lover to explore.
          </p>

          <button
            className="about-menu-button"
            onClick={() => {
              document
                .querySelector('.bottom-nav')
                ?.querySelector('button')
                ?.click();
            }}
          >
            Discover Our Food <span>→</span>
          </button>
        </div>

        <div className="about-image-wrapper">
          <img
            src={landscape}
            alt="Delicious food at QuickBite"
            className="about-image"
          />

          <div className="about-image-label">
            <span>🍴</span>
            <div>
              <h3>Made for Food Lovers</h3>
              <p>Discover something delicious</p>
            </div>
          </div>
        </div>

      </div>

      <div className="about-features">

        <div className="about-feature-card">
          <span className="feature-icon">🍽️</span>
          <h3>Variety of Food</h3>
          <p>
            Explore biryanis, pizzas, burgers, desserts,
            and many more favourites.
          </p>
        </div>

        <div className="about-feature-card">
          <span className="feature-icon">❤️</span>
          <h3>Made for Food Lovers</h3>
          <p>
            Discover dishes that match your cravings
            and food preferences.
          </p>
        </div>

        <div className="about-feature-card">
          <span className="feature-icon">✨</span>
          <h3>Simple Experience</h3>
          <p>
            Browse food categories through a clean
            and user-friendly interface.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;
