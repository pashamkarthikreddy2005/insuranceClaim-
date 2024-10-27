import React, { Component } from 'react';
import './Policy.css';
import Footer from './Footer';

export class Policy extends Component {
  render() {
    return (
      <>
      <div className='policies' >

        <div id="policy">
          <h1>Bike Insurance Claim Policy</h1>
          <p>
            Our bike insurance policy covers damage to your bike due to accidents,
            theft, fire, and natural calamities. Below are the key points of the policy:
          </p>
          <ul>
            <li>Coverage for own damage and third-party liability.</li>
            <li>Personal accident cover for the rider.</li>
            <li>Coverage for accessories and additional fittings.</li>
            <li>No-claim bonus for claim-free years.</li>
          </ul>
          <p>
            Please review the complete policy document for further details and
            exclusions.
          </p>
        </div>

        <div id="policy">
          <h1>Car Insurance Claim Policy</h1>
          <p>
            Our car insurance policy provides comprehensive coverage for damage to
            your vehicle and third-party liability. Here are the main features:
          </p>
          <ul>
            <li>Coverage for own damage and third-party liability.</li>
            <li>Personal accident cover for driver and passengers.</li>
            <li>Coverage for theft and total loss.</li>
            <li>Option for zero depreciation cover.</li>
          </ul>
          <p>
            Refer to the full policy document for more details and exclusions.
          </p>
        </div>

        <div id="policy">
          <h1>Life Insurance Claim Policy</h1>
          <p>
            Our life insurance policy ensures financial protection for your loved
            ones. Below are the key aspects of the policy:
          </p>
          <ul>
            <li>Coverage for natural and accidental death.</li>
            <li>Option for critical illness coverage.</li>
            <li>Tax benefits under applicable laws.</li>
            <li>Flexibility to choose coverage amount and term.</li>
          </ul>
          <p>
            Please read the complete policy document for detailed terms and
            conditions.
          </p>
        </div>

        <div id="policy">
          <h1>Health Insurance Claim Policy</h1>
          <p>
            Our health insurance policy covers medical expenses incurred due to
            hospitalization and treatment. Key features include:
          </p>
          <ul>
            <li>Coverage for hospitalization expenses.</li>
            <li>Pre- and post-hospitalization expenses covered.</li>
            <li>Daycare procedures covered.</li>
            <li>Network of hospitals for cashless treatment.</li>
          </ul>
          <p>
            Please review the detailed policy document for complete information.
          </p>
        </div>

        <div id="policy">
          <h1>Home Insurance Claim Policy</h1>
          <p>
            Our home insurance policy covers damage to your home and personal
            belongings due to fire, natural disasters, theft, and other
            unforeseen events. Below are the key aspects of the policy:
          </p>
          <ul>
            <li>Coverage for structural damage and loss of personal property.</li>
            <li>Coverage against fire, theft, and natural calamities.</li>
            <li>Option to include coverage for home appliances and electronics.</li>
            <li>Flexible sum insured options based on property value.</li>
          </ul>
          <p>
            Please review the complete policy document for more details and
            exclusions.
          </p>
        </div>
      </div>

        <Footer />
      </>
    );
  }
}

export default Policy;
