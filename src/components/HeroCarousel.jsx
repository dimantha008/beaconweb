import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HeroCarousel.css';

const SLIDES = [
  {
    id: 1,
    tag: 'Youth Leadership & Innovation',
    title: 'COLOMBO BEACON',
    subtitle: 'The Premier Youth Organization of Colombo University — Empowering leaders, driving community impact, and shaping the future.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Member Registration', link: '#registration' },
    secondaryCta: { text: 'Discover About Us', link: '#about' },
    accentColor: '#38bdf8'
  },
  {
    id: 2,
    tag: 'Academic & Professional Growth',
    title: 'Ignite Your Knowledge',
    subtitle: 'Participate in cutting-edge research symposiums, hackathons, and career masterclasses guided by top industry pioneers.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Academic Programs', link: '#academic' },
    secondaryCta: { text: 'Latest News', link: '#news' },
    accentColor: '#4ade80'
  },
  {
    id: 3,
    tag: 'Athletics & Team Spirit',
    title: 'Beacon Sports Fiesta',
    subtitle: 'Celebrate athletic excellence and inter-faculty camaraderie in our annual sporting tournaments and charity runs.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Sports Highlights', link: '#sports' },
    secondaryCta: { text: 'Tournament Schedule', link: '#news' },
    accentColor: '#fbbf24'
  },
  {
    id: 4,
    tag: 'Culture & Entertainment',
    title: 'Celebrate Youth & Arts',
    subtitle: 'Experience electrifying musical galas, talent showcases, and cultural festivals that unite our vibrant university community.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Upcoming Events', link: '#entertainment' },
    secondaryCta: { text: 'Join Volunteer Crew', link: '#registration' },
    accentColor: '#f472b6'
  }
];

const AUTOPLAY_DURATION = 6000; // 6 seconds per slide

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Autoplay management
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, AUTOPLAY_DURATION);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Colombo Beacon Highlights"
    >
      {/* Slides Container */}
      <div className="carousel-slides">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`carousel-slide ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(3, 26, 54, 0.88) 0%, rgba(0, 75, 135, 0.72) 60%, rgba(10, 15, 30, 0.85) 100%), url('${slide.image}')`
              }}
            >
              <div className="slide-overlay-pattern"></div>
              
              <div className="slide-content-wrapper">
                <div className="slide-content">
                  <div
                    className="slide-tag"
                    style={{ borderColor: slide.accentColor, color: slide.accentColor }}
                  >
                    <span className="tag-dot" style={{ backgroundColor: slide.accentColor }}></span>
                    {slide.tag}
                  </div>
                  
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-subtitle">{slide.subtitle}</p>

                  <div className="slide-cta-group">
                    <a href={slide.primaryCta.link} className="btn-primary-hero">
                      {slide.primaryCta.text}
                      <svg className="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                    <a href={slide.secondaryCta.link} className="btn-secondary-hero">
                      {slide.secondaryCta.text}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        className="carousel-nav-btn prev-btn"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        type="button"
        className="carousel-nav-btn next-btn"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Bottom Bar: Indicators & Counter */}
      <div className="carousel-bottom-bar">
        {/* Slide Counter */}
        <div className="carousel-counter">
          <span className="counter-current">0{current + 1}</span>
          <span className="counter-divider">/</span>
          <span className="counter-total">0{SLIDES.length}</span>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators" role="tablist">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              className={`indicator-tab ${idx === current ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <div className="indicator-track">
                {idx === current && (
                  <div
                    className="indicator-progress"
                    style={{
                      animationDuration: `${AUTOPLAY_DURATION}ms`,
                      animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                  />
                )}
              </div>
              <span className="indicator-label">{slide.tag.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          className="carousel-play-toggle"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
        >
          {isPaused ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default HeroCarousel;
