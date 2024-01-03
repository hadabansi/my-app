import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OOgEPIkmKy32BTDivwqtLNAKQWsYNCXgyJJhF1r78sCqodWoblBHRZmAGSMuKI1CRTHEpbjjFCrMuxUdOWBqq6W002oUkjqMN');
export default function App() {
  const options = {
    // passing the client secret obtained from the server
   
  };

  return (
    <Elements stripe={stripePromise}>
     <CheckoutForm/>
    </Elements>
  );
};








