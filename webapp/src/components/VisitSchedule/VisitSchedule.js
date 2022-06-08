import React, { useState } from "react";
import './VisitSchedule.scss'
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loading from '../LOADER/Loading';
import ErrorMessages from '../ErrorMessage/ErrorMessages';

// This page is used to schedule a visit by a Donor to NGO

const VisitSchedule = (props) => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [age, setage] = useState('');


    // const [ngoName, setNGOName] = useState(props.ngoName);
    // const [donorName, setDonorName] = useState('');
    // const [date, setDate] = useState('');
    // const [time, setTime] = useState('');
    // const [donorContact, setDonorContact] = useState('');

    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    // This is called when user clicks on Request to visit
    async function AddUser() {

        setLoading(true);

        try {
            const newVisit = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                age: age
            }

            console.log(newVisit);

            try {
                const { data } = await axios.post('http://localhost:3001/visit', newVisit)
                    .then(res => console.log(res.data));
            } catch (err) {
                throw err;
            }

            setLoading(false);
            alert("Visit has been scheduled");

        }
        catch (error) {
            setLoading(false);
        }
    }

    return (
        <div className="book-ticket-page">
            <form className="data-form">
                <div className="header-title">Book Ticket</div>

                <div class="form-element">
                    {/* <label for="inputNGO" className="visitSchedule-label">First Name</label> */}
                    <input placeholder="First Name" type="text" id="firstName" className="form-control"
                        onChange={(event) => {
                            setfirstName(event.target.value);
                        }}
                    />
                </div>

                <div class="form-element">
                    {/* <label for="inputDonorName" class="visitSchedule-label">Last Name</label> */}
                    <input placeholder="Last Name" type="text" id="LastName" class="form-control" required
                        onChange={(event) => {
                            setlastName(event.target.value);
                        }}
                    />
                </div>

                <div class="form-element">
                    {/* <label for="inputNGO" class="visitSchedule-label">Email:</label> */}
                    <input placeholder="Email" type="email" id="userEmail" class="form-control" required
                        onChange={(event) => {
                            setemail(event.target.value);
                        }}
                    />
                </div>

                <div className="form-element">
                    <input placeholder="Phone Number" type="text" id="phone" class="form-control" required
                        onChange={(event) => {
                            setphone(event.target.value);
                        }}
                    />
                </div>

                <div className="form-element">
                    <input placeholder="Age" type="number" id="phone" class="form-control" required
                        onChange={(event) => {
                            setage(event.target.value);
                        }}
                    />
                </div>

                <div className="vs-actionbtns">
                    <button onClick={AddUser} type="button" className="btn btn-primary bl-btn">Submit</button>
                </div>

                {/* <div class="form-element">
                    <label for="inputDonorContact" class="visitSchedule-label">Donor Contact</label>
                    <input type="text" class="form-control" id="inputDonorContact" placeholder="Donor contact" required
                        onChange={(event) => {
                            setDonorContact(event.target.value);
                        }}
                    />
                </div> */}

                {/* <div class="form-element">
                    <label for="inputDate" class="visitSchedule-label">Date</label>
                    <input type="date" class="form-control" id="inputDate" placeholder="Date" onChange={(event) => {
                        setDate(event.target.value);
                    }} required />
                </div>


                <div class="form-element">
                    <label for="inputTime" class="visitSchedule-label">Time</label>
                    <input type="time" class="form-control" id="inputTime" placeholder="Time" onChange={(event) => {
                        setTime(event.target.value);
                    }} required />
                </div> */}



            </form>


            {/* <div className="form-ele">
                <form className="data-form">
                    <div className="form-container">
                        <div className="form-element">
                            <div className="visitSchedule-container">
                                <div className="visitSchedule-head">
                                    <h2>Schedule Your Visit</h2>
                                    <div class="visitSchedule-element">
                                        <label for="inputNGO" className="visitSchedule-label">NGO Name</label>
                                        <input type="text" className="form-control" id="inputNGO" value={props.ngoName} disabled />
                                    </div>
                                    <div class="visitSchedule-element">
                                        <label for="inputNGO" class="visitSchedule-label">NGO Email:</label>
                                        <input type="email" class="form-control" id="inputNGO" value={props.ngoEmail} disabled />
                                    </div>
                                    <div class="visitSchedule-element">
                                        <label for="inputDonorName" class="visitSchedule-label">Donor name</label>
                                        <input type="text" class="form-control" id="inputDonorName" placeholder="Donor name" onChange={(event) => {
                                            setDonorName(event.target.value);
                                        }} required />
                                    </div>
                                    <div class="visitSchedule-element">
                                        <label for="inputDonorContact" class="visitSchedule-label">Donor Contact</label>
                                        <input type="text" class="form-control" id="inputDonorContact" placeholder="Donor contact" onChange={(event) => {
                                            setDonorContact(event.target.value);
                                        }} required />
                                    </div>
                                    <div class="visitSchedule-element">
                                        <label for="inputDate" class="visitSchedule-label">Date</label>
                                        <input type="date" class="form-control" id="inputDate" placeholder="Date" onChange={(event) => {
                                            setDate(event.target.value);
                                        }} required />
                                    </div>
                                    <div class="visitSchedule-element">
                                        <label for="inputTime" class="visitSchedule-label">Time</label>
                                        <input type="time" class="form-control" id="inputTime" placeholder="Time" onChange={(event) => {
                                            setTime(event.target.value);
                                        }} required />
                                    </div>
                                    <div className="vs-actionbtns">
                                        <button onClick={AddUser} type="button" className="btn btn-primary bl-btn">Submit</button>
                                        <Link to="/Donor" className="linking" className="bl-vs">Go Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div> */}

        </div>
    );
};

export default VisitSchedule;
