import React, { Component } from 'react';
import './Footer.css';
import { FaEnvelope, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer id="footer">
          <div id="footerQuote">
            <img src="footer.png" alt="Footer" className="footer-image" />
            <blockquote className="footer-quote">
              <b>"Insurance is like a parachute. If you don't have it when you need it, you won't need it again."</b>
            </blockquote>
          </div>
          <hr/>
          <div id="footerContent">
            <p>&copy; {new Date().getFullYear()} MassMutual. All Rights Reserved.</p>
            <ul id="footerLinks">
              <li><a href="/">Home</a></li>
              <li><a href="/new-claim">New Claim</a></li>
              <li><a href="/policy">Policy</a></li>
              <li><a href="/my-claims">My Claims</a></li>
            </ul>
            <div id="contactInfo">
              <p>Contact Us:</p>
              <p>
                <a href="mailto:info@MassMutualcompany.com" className="footer-icon">
                  <FaEnvelope />
                </a>
                MassMutual@mail.com
              </p>
              <p>
                <a href="https://twitter.com/MassMutualprofile" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <FaTwitter />
                </a>
                @MassMutual
              </p>
              <p>
                <a href="https://instagram.com/MassMutualprofile" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <FaInstagram />
                </a>
                @MassMutual
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
