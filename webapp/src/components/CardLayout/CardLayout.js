import React from "react";
import "./CardLayout.scss";
import { Card } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default class CardLayout extends React.Component {
    // This component is the base for cards we are showing on other pages
    constructor(props) {
        super(props);
        const cardInfo = this.props.cardInfo;
        this.clckedNgo = "";
        console.log("props", props);
    }

    search = (state) => {
        /*const searchElemets=this.cardInfo  filter(word =>      */
        console.log("test");
    }

    // We are setting the ID of USER when we click on the card

    handleClick = (e) => {
        this.props.setId(e.target.value);
    }

    // This is called when donor try to make a visit request to particular NGO

    handleClickVisit = (e) => {
        var array = e.target.value.split(',');
        this.props.setNgoName(array[0]);
        this.props.setNgoEmail(array[1]);
    }

    renderCard(card, index) {

        // This displays how our card will actually look with data and 2 buttons

        return (
            <Card key={index} className="box" >
                <Card.Img variant="top" src="assets/party-card.png" />
                <Card.Body>
                    <div className="title">
                        {card.username}
                    </div>

                    <div className="date-time-container">
                        <div className="date">{(new Date(card.date)).toString().slice(0, 10)}</div>
                        <div className="time">{card.time}</div>                        
                    </div>

                    <div className="location-container">
                        <div className="location">
                            <div className="city">{card.city},</div>
                            <div className="state">{card.state}</div>
                        </div>
                        <div className="zip">{card.zipcode}</div>
                    </div>

                    <Link to={{
                        pathname: '/visitSchedule',
                        state: [{ ngoRequests: this.clckedNgo }]
                    }}>
                        <Button className="button" value={[card.username, card.email]} onClick={this.handleClickVisit.bind(this)}>Book Ticket</Button>
                    </Link>
                </Card.Body>
            </Card >
        );
    };

    render() {
        const cardInfo = this.props.cardInfo;

        let ngoCardInfo = cardInfo.filter(card => card.role == "party");
        return <div className="grid">
            <div className="cardlayout-elements">
                {ngoCardInfo.map(this.renderCard.bind(this))}
            </div>
        </div>;
    }

}
