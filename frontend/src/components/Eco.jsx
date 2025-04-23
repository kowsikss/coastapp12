import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Eco.css";

const EcoInitiatives = () => {
  const [events, setEvents] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [envEvents, setEnvEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
    
    axios.get("https://environment-api.com/events") // Replace with actual API
      .then(response => setEnvEvents(response.data))
      .catch(error => console.error("Error fetching environmental events:", error));
  }, []);

  const handleDonate = () => setShowPayment(true);

  const processPayment = () => {
    if (paymentMethod && userName && userEmail && userPhone) {
      axios.post("http://localhost:5000/donate", {
        method: paymentMethod,
        userName,
        userEmail,
        userPhone,
      })
      .then(response => alert(response.data.message))
      .catch(error => alert("Payment failed!"));
      setShowPayment(false);
    } else {
      alert("Please fill all details and select a payment method.");
    }
  };

  const handleSignUp = (eventId) => {
    axios.post("http://localhost:5000/signup", { eventId, userName, userEmail })
      .then(response => alert("Signed up successfully!"))
      .catch(error => alert("Sign-up failed!"));
  };

  return (
    <div className="eco-container">
      <h1 className="eco-title">Eco-Friendly Initiatives 🌱</h1>

      <section className="eco-section">
        <h2>Water Conservation Efforts 💧</h2>
        <p>Join us in protecting our water bodies! Reduce pollution and conserve marine life.</p>
        <button className="donate-btn" onClick={handleDonate}>Donate to Support 💙</button>
      </section>

      {showPayment && (
        <div className="payment-modal">
          <h3>Enter Your Details</h3>
          <input type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} />
          <input type="text" placeholder="Phone Number" onChange={(e) => setUserPhone(e.target.value)} />

          <h3>Select Payment Method</h3>
          <select onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Select</option>
            <option value="netbanking">Net Banking</option>
            <option value="upi">UPI</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="gpay">Google Pay</option>
          </select>
          <button onClick={processPayment}>Proceed</button>
        </div>
      )}

      <section className="eco-section">
        <h2>Volunteer for Cleanups 🏖</h2>
        <ul className="volunteer-list">
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.icon} {event.name}:</strong> {event.date}, {event.location} - 
              <button className="signup-btn" onClick={() => handleSignUp(event.id)}>Sign Up</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="eco-section">
        <h2>Upcoming Environmental Events 🌍</h2>
        <ul className="event-list">
          {envEvents.map(event => (
            <li key={event.id}>
              <strong>{event.name}:</strong> {event.date}, {event.location}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EcoInitiatives;