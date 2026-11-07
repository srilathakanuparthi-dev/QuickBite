
import { useState, useEffect, useCallback } from 'react';
import './profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function Profile({
    firstName,
    lastName,
    email,
    userId,
    token,
    apiFetch,
    onLogout
}) {
    const [activeSection, setActiveSection] = useState('My Profile');
    const [language, setLanguage] = useState('English');
    const [theme, setTheme] = useState('Light');

    // Profile details
    const [editMode, setEditMode] = useState(false);
    const [first, setFirst] = useState(firstName || '');
    const [last, setLast] = useState(lastName || '');
    const [userEmail, setUserEmail] = useState(email || '');

    const [editFirst, setEditFirst] = useState(firstName || '');
    const [editLast, setEditLast] = useState(lastName || '');
    const [editEmail, setEditEmail] = useState(email || '');

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Password
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Orders
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [ordersError, setOrdersError] = useState('');

    // Addresses
    const [addresses, setAddresses] = useState([]);
    const [addressLoading, setAddressLoading] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [editingAddressId, setEditingAddressId] = useState(null);

    // Update profile details when props change
    useEffect(() => {
        setFirst(firstName || '');
        setLast(lastName || '');
        setUserEmail(email || '');

        setEditFirst(firstName || '');
        setEditLast(lastName || '');
        setEditEmail(email || '');
    }, [firstName, lastName, email]);

    // Fetch orders
    const fetchOrders = useCallback(async (showLoading = true) => {
        if (!userId || !token) return;

        try {
            if (showLoading) {
                setOrdersLoading(true);
            }

            setOrdersError('');

            const response = await apiFetch(
                `${API_URL}/api/orders/user/${userId}`,
                {
                    headers: {
                    }
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Orders API failed: ${response.status} - ${errorText}`
                );
            }

            const data = await response.json();
            const newOrders = Array.isArray(data) ? data : [];

            setOrders(previousOrders =>
                JSON.stringify(previousOrders) === JSON.stringify(newOrders)
                    ? previousOrders
                    : newOrders
            );

        } catch (error) {
            console.error('Orders error:', error);
            setOrdersError(error.message);

        } finally {
            if (showLoading) {
                setOrdersLoading(false);
            }
        }
    }, [userId, token, apiFetch]);

    // Automatically refresh orders every 5 seconds
    useEffect(() => {
        if (activeSection !== 'My Orders') return;

        const interval = setInterval(() => {
            fetchOrders(false);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeSection, fetchOrders]);

    // Fetch saved addresses
    const fetchAddresses = async () => {
        if (!userId || !token) return;

        try {
            setAddressLoading(true);

            const response = await apiFetch(
                `${API_URL}/api/addresses/${userId}`,
                {
                    headers: {
                    }
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    errorText || 'Unable to load addresses.'
                );
            }

            const data = await response.json();
            setAddresses(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error('Address error:', error);
            setAddresses([]);
            alert(error.message);

        } finally {
            setAddressLoading(false);
        }
    };

    // Menu navigation
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setMessage('');

        if (section === 'My Orders') {
            fetchOrders(true);
        }

        if (section === 'Saved Addresses') {
            fetchAddresses();
        }
    };

    // Edit profile
    const handleEdit = () => {
        setEditFirst(first);
        setEditLast(last);
        setEditEmail(userEmail);
        setEditMode(true);
        setMessage('');
    };

    // Save profile
    const handleSaveProfile = async () => {
        if (
            !editFirst.trim() ||
            !editLast.trim() ||
            !editEmail.trim()
        ) {
            setMessage('Please fill all profile details.');
            return;
        }

        try {
            setSaving(true);
            setMessage('');

            const response = await apiFetch(
                `${API_URL}/api/users/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: editFirst.trim(),
                        lastName: editLast.trim(),
                        email: editEmail.trim()
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    errorText || 'Profile update failed.'
                );
            }

            setFirst(editFirst.trim());
            setLast(editLast.trim());
            setUserEmail(editEmail.trim());

            setEditMode(false);
            setMessage('Profile updated successfully!');

        } catch (error) {
            console.error('Profile update error:', error);
            setMessage(error.message);

        } finally {
            setSaving(false);
        }
    };

    // Cancel profile editing
    const handleCancel = () => {
        setEditFirst(first);
        setEditLast(last);
        setEditEmail(userEmail);
        setEditMode(false);
        setMessage('');
    };

    // Change password
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage('Please fill all password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setMessage('Password must contain at least 8 characters.');
            return;
        }

        try {
            const response = await apiFetch(
                `${API_URL}/api/users/${userId}/change-password`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    errorText || 'Password change failed.'
                );
            }

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Password changed successfully!');

        } catch (error) {
            console.error('Password error:', error);
            setMessage(error.message);
        }
    };

    // Save or update address
    const handleSaveAddress = async () => {
        if (!newAddress.trim()) {
            alert('Please enter an address.');
            return;
        }

        if (!userId || !token) {
            alert('Please login again.');
            return;
        }

        try {
            const isEditing = editingAddressId !== null;

            const url = isEditing
                ? `${API_URL}/api/addresses/${userId}/${editingAddressId}`
                : `${API_URL}/api/addresses/${userId}`;

            const response = await apiFetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: newAddress.trim()
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    errorText || 'Unable to save address.'
                );
            }

            setNewAddress('');
            setEditingAddressId(null);

            await fetchAddresses();

            alert(
                isEditing
                    ? 'Address updated successfully!'
                    : 'Address saved successfully!'
            );

        } catch (error) {
            console.error('Save address error:', error);
            alert(error.message);
        }
    };

    // Delete address
    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Delete this address?')) return;

        try {
            const response = await apiFetch(
                `${API_URL}/api/addresses/${userId}/${addressId}`,
                {
                    method: 'DELETE',
                    headers: {
                    }
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    errorText || 'Unable to delete address.'
                );
            }

            await fetchAddresses();

        } catch (error) {
            console.error('Delete address error:', error);
            alert(error.message);
        }
    };

    return (
        <section className="profile-page">

            <div className="profile-header">
                <p>MY ACCOUNT</p>
                <h1>My Profile</h1>
                <span>Manage your personal information</span>
            </div>

            <div className="profile-layout">

                {/* SIDEBAR */}
                <aside className="profile-sidebar">

                    <div className="profile-avatar-wrapper">
                        <div className="profile-avatar">👤</div>
                    </div>

                    <h2>{`${first} ${last}`.trim() || 'User'}</h2>
                    <p>{userEmail}</p>

                    <div className="profile-menu">

                        <button
                            className={
                                activeSection === 'My Profile'
                                    ? 'profile-menu-active'
                                    : ''
                            }
                            onClick={() => handleSectionChange('My Profile')}
                        >
                            👤 My Profile
                        </button>

                        <button
                            className={
                                activeSection === 'My Orders'
                                    ? 'profile-menu-active'
                                    : ''
                            }
                            onClick={() => handleSectionChange('My Orders')}
                        >
                            📦 My Orders
                        </button>

                        <button
                            className={
                                activeSection === 'Saved Addresses'
                                    ? 'profile-menu-active'
                                    : ''
                            }
                            onClick={() => handleSectionChange('Saved Addresses')}
                        >
                            📍 Saved Addresses
                        </button>

                        <button
                            className={
                                activeSection === 'Settings'
                                    ? 'profile-menu-active'
                                    : ''
                            }
                            onClick={() => handleSectionChange('Settings')}
                        >
                            ⚙️ Settings
                        </button>

                        <button onClick={onLogout}>
                            ↪️ Logout
                        </button>

                    </div>
                </aside>

                {/* RIGHT CONTENT */}
                <div className="profile-details-card">

                    {/* MY PROFILE */}
                    {activeSection === 'My Profile' && (
                        <>
                            <div className="profile-card-heading">
                                <h2>Personal Information</h2>
                                <p>Manage your account details.</p>
                            </div>

                            <div className="profile-fields">

                                <label>
                                    First Name
                                    <input
                                        value={editMode ? editFirst : first}
                                        readOnly={!editMode}
                                        onChange={(e) =>
                                            setEditFirst(e.target.value)
                                        }
                                    />
                                </label>

                                <label>
                                    Last Name
                                    <input
                                        value={editMode ? editLast : last}
                                        readOnly={!editMode}
                                        onChange={(e) =>
                                            setEditLast(e.target.value)
                                        }
                                    />
                                </label>

                                <label>
                                    Email Address
                                    <input
                                        type="email"
                                        value={editMode ? editEmail : userEmail}
                                        readOnly={!editMode}
                                        onChange={(e) =>
                                            setEditEmail(e.target.value)
                                        }
                                    />
                                </label>

                            </div>

                            {message && <p>{message}</p>}

                            <div className="profile-actions">

                                {!editMode ? (
                                    <button
                                        className="profile-save-button"
                                        onClick={handleEdit}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="profile-save-button"
                                            onClick={handleSaveProfile}
                                            disabled={saving}
                                        >
                                            {saving
                                                ? 'Saving...'
                                                : 'Save Changes'}
                                        </button>

                                        <button
                                            className="profile-edit-button"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}

                            </div>

                            <hr />

                            <div className="change-password-section">

                                <h2>Change Password</h2>

                                <div className="profile-fields">

                                    <label>
                                        Current Password
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            placeholder="Current password"
                                        />
                                    </label>

                                    <label>
                                        New Password
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            placeholder="New password"
                                        />
                                    </label>

                                    <label>
                                        Confirm New Password
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            placeholder="Confirm password"
                                        />
                                    </label>

                                </div>

                                <button
                                    className="profile-save-button"
                                    onClick={handleChangePassword}
                                >
                                    Change Password
                                </button>

                            </div>
                        </>
                    )}

                    {/* MY ORDERS */}
                    {activeSection === 'My Orders' && (
                        <>
                            <div className="orders-header">
                                <h2 className="orders-heading">My Orders</h2>

                                <button
                                    className="refresh-orders-btn"
                                    onClick={() => fetchOrders(true)}
                                    disabled={ordersLoading}
                                >
                                    {ordersLoading
                                        ? 'Refreshing...'
                                        : '↻ Refresh'}
                                </button>
                            </div>

                            {ordersLoading && orders.length === 0 ? (
                                <p>Loading orders...</p>
                            ) : ordersError ? (
                                <p>{ordersError}</p>
                            ) : orders.length === 0 ? (
                                <p>You haven't placed any orders yet.</p>
                            ) : (
                                orders.map((order) => {

                                    const statusSteps = [
                                        {
                                            status: 'PLACED',
                                            label: 'Order Placed',
                                            description:
                                                'Your order has been received.'
                                        },
                                        {
                                            status: 'PREPARING',
                                            label: 'Preparing',
                                            description:
                                                'Your food is being prepared.'
                                        },
                                        {
                                            status: 'OUT_FOR_DELIVERY',
                                            label: 'Out for Delivery',
                                            description:
                                                'Your order is on the way.'
                                        },
                                        {
                                            status: 'DELIVERED',
                                            label: 'Delivered',
                                            description:
                                                'Your order has been delivered.'
                                        }
                                    ];

                                    const currentStatus = (
                                        order.orderStatus || 'PLACED'
                                    ).toUpperCase();

                                    const currentStepIndex =
                                        statusSteps.findIndex(
                                            step =>
                                                step.status === currentStatus
                                        );

                                    return (
                                        <div
                                            className="order-card"
                                            key={order.orderId}
                                        >

                                            <div className="order-card-header">
                                                <h3>
                                                    Order #{order.orderId}
                                                </h3>

                                                <span
                                                    className={`order-status-badge ${
                                                        currentStatus === 'DELIVERED'
                                                            ? 'status-delivered'
                                                            : 'status-active'
                                                    }`}
                                                >
                                                    {currentStatus.replaceAll(
                                                        '_',
                                                        ' '
                                                    )}
                                                </span>
                                            </div>

                                            <div className="order-customer-details">

                                                <p>
                                                    <strong>Name:</strong>{' '}
                                                    {order.customerName}
                                                </p>

                                                <p>
                                                    <strong>Mobile:</strong>{' '}
                                                    {order.phone}
                                                </p>

                                                <p>
                                                    <strong>Address:</strong>{' '}
                                                    {order.deliveryAddress}
                                                </p>

                                            </div>

                                            {/* ORDER TRACKING */}
                                            <div className="order-tracking">

                                                <h3>Track Your Order</h3>

                                                {currentStepIndex === -1 ? (
                                                    <p>
                                                        Order status: {currentStatus}
                                                    </p>
                                                ) : (
                                                    <div className="tracking-timeline">

                                                        {statusSteps.map(
                                                            (step, index) => (
                                                                <div
                                                                    className={`tracking-step ${
                                                                        index <= currentStepIndex
                                                                            ? 'completed'
                                                                            : ''
                                                                    } ${
                                                                        index === currentStepIndex
                                                                            ? 'current'
                                                                            : ''
                                                                    }`}
                                                                    key={step.status}
                                                                >

                                                                    <div className="tracking-icon">
                                                                        {index < currentStepIndex
                                                                            ? '✓'
                                                                            : index === currentStepIndex
                                                                                ? '●'
                                                                                : '○'}
                                                                    </div>

                                                                    <div className="tracking-info">
                                                                        <h4>{step.label}</h4>
                                                                        <p>{step.description}</p>
                                                                    </div>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>
                                                )}

                                            </div>

                                            {/* ORDER ITEMS */}
                                            <h3 className="ordered-items-heading">
                                                Ordered Items
                                            </h3>

                                            {order.items?.map((item, index) => (
                                                <div
                                                    className="order-item-row"
                                                    key={index}
                                                >

                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.foodName}
                                                        className="order-food-image"
                                                    />

                                                    <div className="order-item-details">

                                                        <h3>{item.foodName}</h3>

                                                        <p>
                                                            Quantity: {item.quantity}
                                                        </p>

                                                        <p>
                                                            Amount: ₹
                                                            {item.price * item.quantity}
                                                        </p>

                                                    </div>
                                                </div>
                                            ))}

                                            <div className="order-total">
                                                <strong>
                                                    Total Amount: ₹{order.totalAmount}
                                                </strong>
                                            </div>

                                        </div>
                                    );
                                })
                            )}
                        </>
                    )}

                    {/* SAVED ADDRESSES */}
                    {activeSection === 'Saved Addresses' && (
                        <div className="saved-addresses-section">

                            <h2>Saved Addresses</h2>
                            <p>Add or update your delivery address.</p>

                            {addressLoading ? (
                                <p>Loading addresses...</p>
                            ) : addresses.length === 0 ? (
                                <p>No saved addresses yet.</p>
                            ) : (
                                addresses.map((item) => (
                                    <div
                                        className="address-card"
                                        key={item.addressId}
                                    >

                                        <h3>Home Address</h3>
                                        <p>{item.address}</p>

                                        <button
                                            className="edit-btn"
                                            onClick={() => {
                                                setNewAddress(item.address);
                                                setEditingAddressId(
                                                    item.addressId
                                                );
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDeleteAddress(
                                                    item.addressId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>
                                ))
                            )}

                            <div className="add-address-form">

                                <h3>
                                    {editingAddressId !== null
                                        ? 'Edit Address'
                                        : 'Add New Address'}
                                </h3>

                                <textarea
                                    value={newAddress}
                                    onChange={(e) =>
                                        setNewAddress(e.target.value)
                                    }
                                    placeholder="Enter your complete address"
                                />

                                <button
                                    onClick={handleSaveAddress}
                                    disabled={addressLoading}
                                >
                                    {editingAddressId !== null
                                        ? 'Update Address'
                                        : 'Save Address'}
                                </button>

                            </div>

                        </div>
                    )}

                    {/* SETTINGS */}
                    {activeSection === 'Settings' && (
                        <div className="settings-section">

                            <h2>Settings</h2>
                            <p>Customize your QuickBite experience.</p>

                            <div className="settings-option">

                                <h3>🌐 Language</h3>
                                <p>Select your preferred language</p>

                                <select
                                    value={language}
                                    onChange={(e) =>
                                        setLanguage(e.target.value)
                                    }
                                >
                                    <option value="English">English</option>
                                    <option value="Telugu">Telugu</option>
                                </select>

                            </div>

                            <div className="settings-option">

                                <h3>🎨 Theme</h3>
                                <p>Choose your preferred appearance</p>

                                <select
                                    value={theme}
                                    onChange={(e) =>
                                        setTheme(e.target.value)
                                    }
                                >
                                    <option value="Light">Light Mode</option>
                                    <option value="Dark">Dark Mode</option>
                                </select>

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

export default Profile;
