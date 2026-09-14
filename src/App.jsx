import React from 'react';
import HeroCarousel from './components/HeroCarousel';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <header className="navbar" id="home">
        <div className="logo">Colombo Beacon</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#articles">Articles</a>
          <a href="#events">Events</a>
          <a href="#entertainment">Entertainment</a>
          <a href="#join">Join</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      {/* Hero Carousel Section */}
      <section className="hero-section">
        <HeroCarousel />
      </section>

      {/* Main Layout */}
      <main className="main-content">
        {/* Left Column: Articles */}
        <div className="articles-section">
          <h2>Recent Articles</h2>
          
          <div className="article-card">
            <div className="article-image-placeholder">Article Image</div>
            <div className="article-info">
              <h3>Student Wins First Place in Competition</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Donec vel sapien justo...</p>
              <a href="#readmore" className="read-more">Read more</a>
            </div>
          </div>

          <div className="article-card">
            <div className="article-image-placeholder">Article Image</div>
            <div className="article-info">
              <h3>Annual General Meeting 2026</h3>
              <p>Join us for the upcoming AGM where we will discuss the future of the organization and elect new members...</p>
              <a href="#readmore" className="read-more">Read more</a>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <aside className="sidebar">
          {/* Mock Facebook Plugin */}
          <div className="widget social-widget">
            <h3>Colombo Beacon</h3>
            <div className="fb-placeholder">
              <p>16,538 likes</p>
              <button className="fb-like-btn">👍 Like Page</button>
            </div>
          </div>
          
          {/* Announcements/Programs */}
          <div className="widget upcoming-widget">
            <h3>Upcoming Programs</h3>
            <ul>
              <li>Orientation Session - Oct 10</li>
              <li>Charity Run - Nov 5</li>
              <li>End of Year Gala - Dec 20</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;