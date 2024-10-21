import React from 'react';
import Layout from '../components/Layout';

const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/00gg0P5pDg2OcxidQQ';

const Payment = () => {
  const handleCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Upgrade to Premium</h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <p className="mb-6 text-center">
            Upgrade to our premium plan for just 7 CAD per month to access unlimited practice questions and full exam simulations.
          </p>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;