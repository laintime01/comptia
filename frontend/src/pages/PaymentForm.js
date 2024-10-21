import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      // 发送 paymentMethod.id 到您的后端
      // 后端应该创建一个 Stripe Customer 和 Subscription
      console.log('PaymentMethod:', paymentMethod);
      // TODO: 调用后端 API 来处理订阅
      setProcessing(false);
      // TODO: 处理成功支付后的逻辑（例如，更新用户状态，重定向等）
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay 7 CAD'}
      </button>
    </form>
  );
};

export default PaymentForm;