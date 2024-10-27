import React from 'react';
import './How.css';
import Footer from './Footer';

const How = () => {
    return (
        <>
        <div className="how-claims-container">
            <h2>How Our Claims Work</h2>
            <p>
                Our claims process is designed to be straightforward and user-friendly. Here’s how it works:
            </p>
            <ol className="claims-steps">
                <li>
                    <strong>Step 1: Report the Incident</strong>
                    <p>
                        Notify us about the incident as soon as possible. You can do this by calling our customer service or using our online portal.
                    </p>
                </li>
                <li>
                    <strong>Step 2: Document the Damage</strong>
                    <p>
                        Take photos and collect any necessary documentation related to the incident. This will help us assess your claim quickly.
                    </p>
                </li>
                <li>
                    <strong>Step 3: Submit Your Claim</strong>
                    <p>
                        Fill out our claims form online or submit it via email. Ensure all required documents are attached for a smoother process.
                    </p>
                </li>
                <li>
                    <strong>Step 4: Claim Assessment</strong>
                    <p>
                        Our claims team will review your submission and may contact you for additional information if necessary.
                    </p>
                </li>
                <li>
                    <strong>Step 5: Claim Approval</strong>
                    <p>
                        Once your claim is approved, you will receive a notification regarding the settlement amount and the next steps.
                    </p>
                </li>
                <li>
                    <strong>Step 6: Receive Payment</strong>
                    <p>
                        After approval, we will process your payment promptly. You can choose to receive it via direct deposit or check.
                    </p>
                </li>
            </ol>
            <p>
                For more information, please refer to our complete claims policy or contact our support team.
            </p>
        </div>
        <Footer/>
        </>
    );
}

export default How;
