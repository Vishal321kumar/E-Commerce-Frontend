import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51OwGpvSGz8NjlN0ieiH2LHmC25hpns8nRxbwss7ON5Rr2p3rvXvJaJjZes5SuKR6bvOSRWNkV2kqLwuivlXV6ZjD00EiLtM8pm");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder=useSelector(selectCurrentOrder)   

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount ,orderId:currentOrder.id  }),
      // orderId:currentOrder.id   this will pass after totalAmount
      // meta:{
      //   order_id:currentOrder.id,
      // }
      
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the client secret state
        setClientSecret(data.clientSecret);
        console.log('Received client secret:', data.clientSecret);
      })
      .catch((error) => {
        console.error('Error fetching client secret:', error);
      });
  }, []);
  

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}
