import React from 'react';
import './SmallFooter.css';

function SmallFooter() {
    return (
        <footer className="small-footer">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320"
                className="small-footer-svg"
            >
                <path 
                    fill="#002e6b"
                    d="M0,315 C720,128 720,128 1440,315 L1440,320 L0,320 Z" 
                />
            </svg>
            <div className="small-footer-content">
                <p>@Mass Mutual</p>
                <p>All rights reserved &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}

export default SmallFooter;
