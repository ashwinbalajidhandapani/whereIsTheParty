import React from 'react'
import './MainPage.scss';

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='mainpage-container'>
                <div className='header-container'>
                    <div className='info-container'>
                        <div className='header-title'>Where Is The Party</div>
                        <div className='header-desc'>Looking for parties around you ? you've come to the right spot</div>
                    </div>
                    <div className='image-container'>
                        <img className="header-image" src="assets/party.jpeg" alt="Architecture"></img>
                    </div>

                </div>

                <div className='how-it-works'>
                    <div className='title-container'>
                        <div className='title-text'>How It Works</div>
                        <div className='desc'>Meet new people who share your interests through online and in-person events.</div>
                        <div className='desc'>It’s free to create an account.</div>
                    </div>

                    <div className='items-container'>
                        <div className='item'>
                            <img className="item-image" src="assets/join.svg" alt="Architecture"></img>
                            <div className="item-title"> Join a party </div>
                            <div className="item-desc"> Do what you love, meet others who love it, find your community. The rest is history! </div>
                        </div>
                        <div className='item'>
                            <img className="item-image" src="assets/ticket.svg" alt="Architecture"></img>
                            <div className="item-title"> Find a party </div>
                            <div className="item-desc"> Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</div>
                        </div>
                        <div className='item'>
                            <img className="item-image" src="assets/group.svg" alt="Architecture"></img>
                            <div className="item-title"> Host a group </div>
                            <div className="item-desc"> You don’t have to be an expert to gather people together and explore shared interests.
                            </div>
                        </div>
                    </div>

                    <div className='button-container'>
                        <button className='button'>Host Party</button>
                        <button className='button'>Join Party</button>
                    </div>

                </div>


                <div className='customer-review'>
                    <div className='title-container'>
                        <div className='title-text'>Stories from people who love us</div>
                        <div className='title-desc'>People have used this platform to meet, network and have a great time.</div>
                        <div className='title-desc'>Here are a few stories from our customers.</div>
                    </div>
                    <div className='body-container'>
                        <div className='item'>
                            <a href="https://www.youtube.com/">
                                <img src="../../assets/icons/profile.png" className="icon" />
                            </a>
                            <div className='review'>Changed our whole party operations. A single application to host and join the existing parties. A wonderful crafted idea with innovation.</div>
                            <div className='name-container'>
                                <div className='name'>Ashwin Balaji</div>
                                <div className='location'>Trichy</div>
                            </div>
                        </div>

                        <div className='item'>
                            <a href="https://www.youtube.com/">
                                <img src="../../assets/icons/profile.png" className="icon" />
                            </a>
                            <div className='review'>I have been using this application since a year and found so amazing, I have connected with different sets of people in party and it also helps in getting new friends.</div>
                            <div className='name-container'>
                                <div className='name'>Ashwin Kumar</div>
                                <div className='location'>Chennai</div>
                            </div>
                        </div>

                        <div className='item'>
                            <a href="https://www.youtube.com/">
                                <img src="../../assets/icons/profile.png" className="icon" />
                            </a>
                            <div className='review'>I am using this app to connect new people when I move into different cities. Really a helpful and must needed service</div>
                            <div className='name-container'>
                                <div className='name'>Vinoth Mani</div>
                                <div className='location'>Coimbatore</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
