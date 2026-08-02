import React from 'react'
import { Link } from 'react-router'

export default function Hero() {
  return (
    <section className="hero" id="opportunity">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Powered by TalentBridge Ethiopia</span>
          </div>
          <h1>Build Your Business with <em>HBT Courses</em></h1>
          <p>Join a growing community of young entrepreneurs selling practical business and personal development course packages. Earn commissions, lead a team, and create lasting income.</p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-rose btn-lg">Start Your Journey</Link>
            <a href="#levels" className="btn btn-outline btn-lg">Explore Levels</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value" data-count="3200">0</div>
              <div className="hero-stat-label">Active Distributors</div>
            </div>
            <div>
              <div className="hero-stat-value" data-count="12">0</div>
              <div className="hero-stat-label">Regional Leaders</div>
            </div>
            <div>
              <div className="hero-stat-value" data-prefix="" data-count="35" data-suffix="%">0%</div>
              <div className="hero-stat-label">Max Commission</div>
            </div>
            <div>
              <div className="hero-stat-value" data-count="8">0</div>
              <div className="hero-stat-label">Regions Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
