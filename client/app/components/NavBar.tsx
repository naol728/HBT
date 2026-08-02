import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="container">
                    {/* Logo */}
                    <a href="/" className="nav-logo" onClick={closeMenu}>
                        <div className="nav-logo-text">
                            <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
                                <img
                                    src="/logo.jpg"
                                    alt="TalentBridge Ethiopia"
                                    className="h-9 w-auto rounded object-contain"
                                />
                                <div className="font-main text-[1.3rem] font-bold text-[var(--text-primary)]">
                                    HBT<span className="text-[var(--rose)]"> · TalentBridge</span>
                                </div>
                            </Link>
                        </div>
                    </a>

                    {/* Navigation Links */}
                    <ul className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
                        <li>
                            <a href="#opportunity" className="active" onClick={closeMenu}>
                                Opportunity
                            </a>
                        </li>
                        <li>
                            <a href="#levels" onClick={closeMenu}>
                                Levels
                            </a>
                        </li>
                        <li>
                            <a href="#compensation" onClick={closeMenu}>
                                Earnings
                            </a>
                        </li>
                        <li>
                            <a href="#how" onClick={closeMenu}>
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a href="#products" onClick={closeMenu}>
                                Courses
                            </a>
                        </li>
                        {/* Mobile Auth Buttons */}
                        <li className="mobile-auth-buttons">
                            <Link to="/login" className="btn btn-outline btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                                Sign In
                            </Link>
                            <Link to="/signup" className="btn btn-gold btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                                Join Now
                            </Link>
                        </li>
                    </ul>

                    {/* Desktop Actions */}
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-outline btn-sm desktop-only">
                            Sign In
                        </Link>
                        <Link to="/signup" className="btn btn-gold btn-sm desktop-only">
                            Join Now
                        </Link>
                        <button
                            className={`hamburger ${isOpen ? 'open' : ''}`}
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile */}
            {isOpen && (
                <div className="nav-overlay" onClick={closeMenu}></div>
            )}

            <style jsx>{`
                /* ===== NAVBAR ENHANCEMENTS ===== */
                
                /* Mobile Auth Buttons - Hidden on desktop */
                .mobile-auth-buttons {
                    display: none;
                    flex-direction: column;
                    gap: 10px;
                    padding: 16px 0 8px;
                    border-top: 1px solid var(--border);
                    margin-top: 8px;
                }

                /* Desktop Only - Hidden on mobile */
                .desktop-only {
                    display: inline-flex;
                }

                /* Navbar Overlay */
                .nav-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 998;
                    backdrop-filter: blur(4px);
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 768px) {
                    .desktop-only {
                        display: none !important;
                    }

                    .mobile-auth-buttons {
                        display: flex !important;
                    }

                    .nav-overlay {
                        display: block;
                    }

                    .nav-links.mobile-open {
                        display: flex !important;
                        flex-direction: column;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: rgba(10, 10, 15, 0.98);
                        backdrop-filter: blur(20px);
                        padding: 80px 24px 30px;
                        gap: 4px;
                        border-bottom: 1px solid var(--border);
                        z-index: 999;
                        min-height: 100vh;
                        overflow-y: auto;
                    }

                    .nav-links.mobile-open li {
                        width: 100%;
                    }

                    .nav-links.mobile-open a {
                        display: block;
                        padding: 14px 16px;
                        border-radius: var(--radius-sm);
                        font-size: 0.95rem;
                        font-weight: 500;
                        transition: var(--transition);
                        color: var(--text-secondary);
                    }

                    .nav-links.mobile-open a:hover,
                    .nav-links.mobile-open a.active {
                        background: rgba(201, 168, 76, 0.08);
                        color: var(--rose);
                        padding-left: 20px;
                    }

                    .nav-links.mobile-open .mobile-auth-buttons a {
                        text-align: center;
                        padding: 12px;
                        font-size: 0.85rem;
                        font-weight: 600;
                    }

                    .nav-links.mobile-open .mobile-auth-buttons .btn-outline {
                        border-color: var(--border-hover);
                        color: var(--rose);
                    }

                    .nav-links.mobile-open .mobile-auth-buttons .btn-gold {
                        background: linear-gradient(135deg, var(--gold), var(--gold-dark));
                        color: var(--dark);
                        box-shadow: 0 4px 16px rgba(201, 168, 76, 0.3);
                    }

                    .nav-links.mobile-open .mobile-auth-buttons .btn-gold:hover {
                        background: linear-gradient(135deg, var(--gold-light), var(--gold));
                        transform: translateY(-2px);
                        box-shadow: 0 8px 24px rgba(201, 168, 76, 0.45);
                    }
                }

                /* Very Small Phones */
                @media (max-width: 480px) {
                    .nav-logo-text {
                        font-size: 0.85rem !important;
                    }

                    .nav-logo-text span {
                        font-size: 0.7rem;
                    }

                    .nav-logo-icon {
                        width: 30px;
                        height: 30px;
                        font-size: 0.9rem;
                    }

                    .nav-links.mobile-open {
                        padding: 70px 16px 30px;
                    }

                    .nav-links.mobile-open a {
                        padding: 12px 14px;
                        font-size: 0.9rem;
                    }
                }

                /* Tiny Phones */
                @media (max-width: 380px) {
                    .nav-logo-text {
                        display: none !important;
                    }

                    .nav-logo-icon {
                        width: 28px;
                        height: 28px;
                        font-size: 0.8rem;
                    }
                }

                /* ===== GOLDEN THEME ENHANCEMENTS ===== */
                
                /* Add golden glow to logo on hover */
                .nav-logo:hover .nav-logo-icon {
                    box-shadow: 0 0 20px rgba(201, 168, 76, 0.3);
                    transition: var(--transition);
                }

                /* Golden accent on active link */
                .nav-links a.active {
                    color: var(--rose);
                    position: relative;
                }

                .nav-links a.active::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, var(--gold), var(--gold-light));
                    border-radius: 2px;
                }

                @media (max-width: 768px) {
                    .nav-links.mobile-open a.active::after {
                        bottom: 8px;
                        left: 16px;
                        right: 16px;
                    }
                }

                /* Hamburger golden hover */
                .hamburger:hover span {
                    background: var(--gold);
                    transition: var(--transition);
                }

                /* Scrolled state enhancement */
                .navbar.scrolled {
                    border-bottom-color: rgba(201, 168, 76, 0.2);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }

                .navbar.scrolled .nav-logo-text {
                    color: var(--text-primary);
                }

                /* Smooth scroll behavior for menu items */
                .nav-links a {
                    scroll-behavior: smooth;
                }

                /* Fix for iOS zoom on inputs/buttons */
                .btn {
                    touch-action: manipulation;
                }
            `}</style>
        </>
    )
}