import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NewClaim.css';
import Footer from './Footer';
import CheckService from '../Service/CheckService';
import UserService from '../Service/UserService';

export class NewClaim extends Component {
  state = {
    isAuthenticated: false,
    showAuthMessage: false,
    authMessage: '',
    claims: {
      hasBike: false,
      hasCar: false,
      hasHealth: false,
      hasLife: false,
      hasHome: false,
    },
  };

  async componentDidMount() {
    const isAuthenticated = UserService.isAuthenticated();
    this.setState({ isAuthenticated });

    if (isAuthenticated) {
      await this.fetchClaims();
    } else {
      this.setState({
        claims: {
          hasBike: true,
          hasCar: true,
          hasHealth: true,
          hasLife: true,
          hasHome: true,
        },
      });
    }
  }

  fetchClaims = async () => {
    try {
      const claims = {
        hasBike: await CheckService.hasBike(),
        hasCar: await CheckService.hasCar(),
        hasHealth: await CheckService.hasHealth(),
        hasLife: await CheckService.hasLife(),
        hasHome: await CheckService.hasHome(),
      };
      this.setState({ claims });
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  handleClaimClick = (e) => {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      e.preventDefault();
      this.setState({
        showAuthMessage: true,
        authMessage: '',
      });
    }
  };

  render() {
    const { showAuthMessage, authMessage, claims } = this.state;

    return (
      <>
        <div className="new-claim-container">
          <div className="massmutual-button-container">
            <h2>No policies? Buy now from MassMutual</h2>
            <a href="https://www.massmutual.com" target="_blank" rel="noopener noreferrer">
              <button className="massmutual-button">Visit MassMutual</button>
            </a>
          </div>

          <div className="chikkabal">
            <h1>New Claim</h1>
            <img src="claim.png" alt="Claim" className="claim-image" />
          </div>
          <div className="claim-options-container">
            {claims.hasBike ? (
              <div className="claim-option top-left">
                <div className="option-border">
                  <img src="bike_claim.png" alt="Bike Claim" className="option-image" />
                  <Link to="/new-claim/bike-claim" onClick={this.handleClaimClick}>
                    <button className="claim-button">Bike Claim</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="claim-option top-left" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <div className="option-border" data-tooltip="Buy this policy to access this claim">
                  <img src="bike_claim.png" alt="Bike Claim" className="option-image" />
                  <button className="claim-button" disabled>Bike Claim</button>
                </div>
              </div>
            )}
            {claims.hasCar ? (
              <div className="claim-option top-right">
                <div className="option-border">
                  <img src="car_claim.png" alt="Car Claim" className="option-image" />
                  <Link to="/new-claim/car-claim" onClick={this.handleClaimClick}>
                    <button className="claim-button">Car Claim</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="claim-option top-right" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <div className="option-border" data-tooltip="Buy this policy to access this claim">
                  <img src="car_claim.png" alt="Car Claim" className="option-image" />
                  <button className="claim-button" disabled>Car Claim</button>
                </div>
              </div>
            )}
            {claims.hasHealth ? (
              <div className="claim-option bottom-left">
                <div className="option-border">
                  <img src="health_claim.png" alt="Health Claim" className="option-image" />
                  <Link to="/new-claim/health-claim" onClick={this.handleClaimClick}>
                    <button className="claim-button">Health Claim</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="claim-option bottom-left" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <div className="option-border" data-tooltip="Buy this policy to access this claim">
                  <img src="health_claim.png" alt="Health Claim" className="option-image" />
                  <button className="claim-button" disabled>Health Claim</button>
                </div>
              </div>
            )}
            {claims.hasLife ? (
              <div className="claim-option bottom-right">
                <div className="option-border">
                  <img src="life_claim.png" alt="Life Claim" className="option-image" />
                  <Link to="/new-claim/life-claim" onClick={this.handleClaimClick}>
                    <button className="claim-button">Life Claim</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="claim-option bottom-right" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <div className="option-border" data-tooltip="Buy this policy to access this claim">
                  <img src="life_claim.png" alt="Life Claim" className="option-image" />
                  <button className="claim-button" disabled>Life Claim</button>
                </div>
              </div>
            )}
            {claims.hasHome ? (
              <div className="claim-option bottom-right">
                <div className="option-border">
                  <img src="home_claim.png" alt="Home Claim" className="option-image" />
                  <Link to="/new-claim/home-claim" onClick={this.handleClaimClick}>
                    <button className="claim-button">Home Claim</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="claim-option bottom-right" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <div className="option-border" data-tooltip="Buy this policy to access this claim">
                  <img src="home_claim.png" alt="Home Claim" className="option-image" />
                  <button className="claim-button" disabled>Home Claim</button>
                </div>
              </div>
            )}
          </div>
          <div className="how-to-apply">
            <div className="option-border">
              <img src="how.png" alt="How to Apply" className="how-image" />
              <Link to="/new-claim/our">
                <button className="claim-button">How our Claims work</button>
              </Link>
            </div>
          </div>
          {showAuthMessage && (
            <p className="auth-message">
              {authMessage} Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to file a new claim.
            </p>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default NewClaim;
