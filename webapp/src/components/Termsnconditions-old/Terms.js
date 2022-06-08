import './Terms.scss';
import '../Navbar/Navbar.scss'
import { Link } from "react-router-dom";

import React from 'react'


const Terms = () => {
    return (
        <div className="tnc">
            <div className='create-your-party'>
                <div className='title'>Host your own Party.</div>
                <button className='button'>Get Started</button>
            </div>


            <div className='more-info'>
                <div className='col'>
                    <div className='col-title'>Your Account</div>
                    <span>Sign up</span>
                    <span>Login</span>
                    <span>Help</span>
                </div>
                <div className='col'>
                    <div className='col-title'>Discover</div>
                    <span>Sign up</span>
                    <span>Sign up</span>
                    <span>Sign up</span>
                </div>
                <div className='col'>
                    <div className='col-title'>Party</div>
                    <span>Sign up</span>
                    <span>Sign up</span>
                    <span>Sign up</span>
                </div>
            </div>

            <div className='follow-us'>
                <div className='icon-container'>
                    <div className='follow-us-title'>Follow us</div>
                    <div className='follow-us-icons'>
                        <a href="https://www.youtube.com/">
                            <img src="../../assets/icons/facebook.png" className="icon" />
                        </a>
                        <a href="https://www.youtube.com/">
                            <img src="../../assets/icons/facebook.png" className="icon" />
                        </a>
                        <a href="https://www.youtube.com/">
                            <img src="../../assets/icons/facebook.png" className="icon" />
                        </a>
                        <a href="https://www.youtube.com/">
                            <img src="../../assets/icons/facebook.png" className="icon" />
                        </a>
                        <div className='download'></div>
                    </div>
                </div>

                <div className='store-buttons'>
                    <a href="https://play.google.com/store">
                        <img src="https://secure.meetupstatic.com/next/images/app-download/android/download_en-US.svg?w=256" />
                    </a>
                    <a href="https://www.apple.com/app-store/">
                    <img src="https://secure.meetupstatic.com/next/images/app-download/ios/download_en-US.svg?w=256" />
                    </a>
                </div>

            </div>

            <div className='privacy'>
                <div className='item-title'> @2022 WhereIsTheParty</div>
                <div className='item'> Terms of Service</div>
                <div className='item'> Privacy Policy</div>
                <div className='item'> Cookie Policy</div>
                <div className='item'> Help</div>
            </div>
        </div>
    )
}

export default Terms
