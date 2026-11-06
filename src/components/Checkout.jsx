
import React, { useState, useEffect } from 'react';
import './Checkout.css';

function Checkout({
    cartItems = [],
    setCartItems,
    userId,
    token,
    apiFetch,
    setActivePage
}) {
    const [customerName, setCustomerName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [addressLoading, setAddressLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // FETCH SAVED ADDRESSES
    useEffect(() => {
        const fetchSavedAddresses = async () => {
            if (!userId || !token) return;

            try {
                setAddressLoading(true);

                const response = await apiFetch(
                    `http://localhost:8080/api/addresses/${userId}`,
                    {
                        headers: {
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Unable to fetch saved addresses');
                }

                const data = await response.json();
                setSavedAddresses(data);

                if (data.length > 0) {
                    setSelectedAddressId(String(data[0].addressId));
                    setAddress(data[0].address);
                }

            } catch (error) {
                console.error('Address Error:', error);
            } finally {
                setAddressLoading(false);
            }
        };

        fetchSavedAddresses();
    }, [userId, token, apiFetch]);

    // CALCULATE GRAND TOTAL
    const grandTotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.food.price) * item.quantity,
        0
    );

    // PLACE ORDER
    const handlePlaceOrder = async () => {
        if (!userId || !token) {
            alert('Login session expired. Please login again.');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add food items.');
            return;
        }

        if (
            !customerName.trim() ||
            !phone.trim() ||
            !address.trim()
        ) {
            alert('Please fill all delivery details!');
            return;
        }

        if (!/^\d{10}$/.test(phone.trim())) {
            alert('Please enter a valid 10-digit phone number!');
            return;
        }

        try {
            setLoading(true);

            console.log('Order User ID:', userId);
            console.log('Cart Items:', cartItems);

            const response = await apiFetch(
                `http://localhost:8080/api/orders/${userId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customerName: customerName.trim(),
                        phone: phone.trim(),
                        address: address.trim(),
                        paymentMethod
                    })
                }
            );

            const responseText = await response.text();

            console.log('Backend Status:', response.status);
            console.log('Backend Response:', responseText);

            if (!responseText) {
                throw new Error(
                    'Empty response from backend. Check backend console.'
                );
            }

            let data;

            try {
                data = JSON.parse(responseText);
            } catch {
                throw new Error(
                    'Backend returned an invalid response. Check backend console.'
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message || 'Order placement failed!'
                );
            }

            setToastMessage('Order placed successfully!');
            setCartItems([]);

            setTimeout(() => {
                setToastMessage('');
                setActivePage('Home');
            }, 3000);

        } catch (error) {
            console.error('Order Error:', error);
            alert(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="checkout-page">

            {toastMessage && (
                <div className="success-toast">
                    {toastMessage}
                </div>
            )}

            <h1>Checkout</h1>

            {/* YOUR ORDER */}
            <div className="checkout-card">
                <h2>🛒 Your Order</h2>

                {cartItems.map((item) => (
                    <div className="checkout-item" key={item.cartItemId}>
                        <img
                            src={item.food.imageUrl}
                            alt={item.food.name}
                        />

                        <div className="checkout-product-info">
                            <h3>{item.food.name}</h3>
                            <p>₹{item.food.price}</p>
                        </div>

                        <strong>× {item.quantity}</strong>

                        <strong>
                            ₹{item.food.price * item.quantity}
                        </strong>
                    </div>
                ))}
            </div>

            {/* PAYMENT METHOD */}
            <div className="checkout-card">
                <h2>💳 Payment Method</h2>

                <label className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />
                    <span>💵</span>
                    <div>
                        <h3>Cash on Delivery</h3>
                        <p>Pay when your order is delivered</p>
                    </div>
                </label>

                <label className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />
                    <span>📱</span>
                    <div>
                        <h3>UPI Payment</h3>
                        <p>Pay using Google Pay, PhonePe or Paytm</p>
                    </div>
                </label>

                <label className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        value="CARD"
                        checked={paymentMethod === 'CARD'}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />
                    <span>💳</span>
                    <div>
                        <h3>Credit / Debit Card</h3>
                        <p>Pay using your bank card</p>
                    </div>
                </label>
            </div>

            {/* ORDER SUMMARY */}
            <div className="checkout-card">
                <h2>📋 Order Summary</h2>

                <div className="summary-row">
                    <span>Items Total</span>
                    <span>
                        ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                </div>

                <div className="summary-row">
                    <span>Delivery Charge</span>
                    <span>₹0</span>
                </div>

                <div className="grand-total">
                    <strong>Grand Total</strong>
                    <strong>
                        ₹{grandTotal.toLocaleString('en-IN')}
                    </strong>
                </div>
            </div>

            {/* DELIVERY DETAILS */}
            <div className="checkout-card">
                <h2>📍 Delivery Details</h2>

                <label>Full Name *</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(e.target.value)
                    }
                    placeholder="Enter your full name"
                />

                <label>Phone Number *</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                    placeholder="Enter phone number"
                />

                <label>Delivery Address *</label>

                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete delivery address"
                />
            </div>

            {/* PLACE ORDER */}
            <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
            >
                {loading ? 'Placing Order...' : '🛍️ Place Order'}
            </button>

        </section>
    );
}

export default Checkout;
