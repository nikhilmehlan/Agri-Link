import './Insurance.css'
import React from 'react';
import { assets } from '../../assets/assets';
import InsuranceForm from '../../components/InsuranceForm/InsuranceForm';

const Insurance = () => {
    return (
        <div className="insurance-page">
            <div className="insurance-header">
                <div className='left-insurance'>
                    <h1>
                        Decentralized<br />
                        Crop Insurance<br />
                        Pool<br />
                    </h1>
                </div>

                <div className='middle-insurance'>
                    <div>
                        <img src={assets.bullet} alt="" />
                        <p>By eliminating intermediaries and automating insurance processes through smart contracts, blockchain reduces administrative costs associated with traditional insurance models.</p>
                    </div>

                    <div>
                        <img src={assets.bullet} alt="" />
                        <p>Provides easy insurance takeouts</p>
                    </div>
                </div>

                <div className='right-insurance'>
                    <img src={assets.insuranceHeader} alt="" />
                </div>
            </div>

            <div className="insurance-form">
                <div className='insurance-form-left'>
                    <div>
                        <img src={assets.bullet} alt="" />
                        <p>Welcome! Insure your products easily here</p>
                    </div>

                    <div>
                        <img src={assets.bullet} alt="" />
                        <p>Install Metamask</p>
                    </div>

                    <div>
                        <img src={assets.bullet} alt="" />
                        <p>Complete the form in a few simple steps</p>
                    </div>

                    <div>
                        <img src={assets.bullet} alt="" />
                        <p>Your info is safe with us, encrypted</p>
                    </div>

                </div>
                <InsuranceForm className='insurance-form-right' />
            </div>
        </div>
    );
}

export default Insurance;