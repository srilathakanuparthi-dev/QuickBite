
import { useState, useEffect } from 'react';
import './Profile.css';

function Profile({
    firstName,
    lastName,
    email,
    userId,
    onLogout
}) {
    const [activeSection, setActiveSection] = useState('My Profile');

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

    useEffect(() => {
        setFirst(firstName || '');
        setLast(lastName || '');
        setUserEmail(email || '');

        setEditFirst(firstName || '');
        setEditLast(lastName || '');
        setEditEmail(email || '');
    }, [firstName, lastName, email]);

    // Fetch orders
    const fetchOrders = async () => {
        if (!userId) return;

        try {
            setOrdersLoading(true);
            setOrdersError('');

            const response = await fetch(
                `http://localhost:8080/api/orders/user/${userId}`
            );

            if (!response.ok) {
                throw new Error('Unable to load orders. Please check backend API.');
            }

            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error('Orders error:', error);
            setOrdersError(error.message);
        } finally {
            setOrdersLoading(false);
        }
    };

    // Fetch saved addresses
    const fetchAddresses = async () => {
        if (!userId) return;

        try {
            setAddressLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/addresses/${userId}`
            );

            if (!response.ok) {
                throw new Error('Unable to load addresses');
            }

            const data = await response.json();
            setAddresses(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error('Address error:', error);
            setAddresses([]);
        } finally {
            setAddressLoading(false);
        }
    };

    // Menu navigation
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setMessage('');

        if (section === 'My Orders') {
            fetchOrders();
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
        if (!editFirst.trim() || !editLast.trim() || !editEmail.trim()) {
            setMessage('Please fill all profile details.');
            return;
        }

        try {
            setSaving(true);
            setMessage('');

            const response = await fetch(
                `http://localhost:8080/api/users/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: editFirst.trim(),
                        lastName: editLast.trim(),
                        email: editEmail.trim()
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Profile update failed.');
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
            const response = await fetch(
                `http://localhost:8080/api/users/${userId}/change-password`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Password change failed.');
            }

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Password changed successfully!');

        } catch (error) {
            setMessage(error.message);
        }
    };

    // Save address
    const handleSaveAddress = async () => {
        if (!newAddress.trim()) {
            alert('Please enter an address.');
            return;
        }

        try {
            const isEditing = editingAddressId !== null;

            const url = isEditing
                ? `http://localhost:8080/api/addresses/${userId}/${editingAddressId}`
                : `http://localhost:8080/api/addresses/${userId}`;

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: newAddress.trim()
                })
            });

            if (!response.ok) {
                throw new Error('Unable to save address.');
            }

            setNewAddress('');
            setEditingAddressId(null);
            fetchAddresses();

        } catch (error) {
            alert(error.message);
        }
    };

    // Delete address
    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Delete this address?')) return;

        try {
            const response = await fetch(
                `http://localhost:8080/api/addresses/${userId}/${addressId}`,
                { method: 'DELETE' }
            );

            if (!response.ok) {
                throw new Error('Unable to delete address.');
            }

            fetchAddresses();

        } catch (error) {
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
                            className={activeSection === 'My Profile' ? 'profile-menu-active' : ''}
                            onClick={() => handleSectionChange('My Profile')}
                        >
                            👤 My Profile
                        </button>

                        <button
                            className={activeSection === 'My Orders' ? 'profile-menu-active' : ''}
                            onClick={() => handleSectionChange('My Orders')}
                        >
                            📦 My Orders
                        </button>

                        <button
                            className={activeSection === 'Saved Addresses' ? 'profile-menu-active' : ''}
                            onClick={() => handleSectionChange('Saved Addresses')}
                        >
                            📍 Saved Addresses
                        </button>

                        <button
                            className={activeSection === 'Settings' ? 'profile-menu-active' : ''}
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
                                        onChange={(e) => setEditFirst(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Last Name
                                    <input
                                        value={editMode ? editLast : last}
                                        readOnly={!editMode}
                                        onChange={(e) => setEditLast(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Email Address
                                    <input
                                        type="email"
                                        value={editMode ? editEmail : userEmail}
                                        readOnly={!editMode}
                                        onChange={(e) => setEditEmail(e.target.value)}
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
                                            {saving ? 'Saving...' : 'Save Changes'}
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
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
            />
        </label>

        <label>
            New Password
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
            />
        </label>

        <label>
            Confirm New Password
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <h2>My Orders</h2>

                            {ordersLoading ? (
                                <p>Loading orders...</p>
                            ) : ordersError ? (
                                <p>{ordersError}</p>
                            ) : orders.length === 0 ? (
                                <p>You haven't placed any orders yet.</p>
                            ) : (
                                orders.map((order) => (
                                    <div className="order-card" key={order.orderId}>
                                        <h3>Order #{order.orderId}</h3>
                                        <p>Total: ₹{order.totalAmount}</p>
                                        <p>Status: {order.orderStatus}</p>
                                        <p>Payment: {order.paymentMethod}</p>
                                        <p>Delivery Address: {order.deliveryAddress}</p>
                                    </div>
                                ))
                            )}
                        </>
                    )}

                    {/* SAVED ADDRESSES */}
                    {activeSection === 'Saved Addresses' && (
                        <>
                            <h2>Saved Addresses</h2>
                            <p>Add or update your delivery address.</p>

                            <textarea
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder="Enter your delivery address"
                            />

                            <button
                                className="profile-save-button"
                                onClick={handleSaveAddress}
                            >
                                {editingAddressId !== null ? 'Update Address' : 'Add Address'}
                            </button>

                            {addressLoading ? (
                                <p>Loading addresses...</p>
                            ) : (
                                addresses.map((item) => (
                                    <div className="order-card" key={item.addressId}>
                                        <p>{item.address}</p>

                                        <button
                                            onClick={() => {
                                                setNewAddress(item.address);
                                                setEditingAddressId(item.addressId);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteAddress(item.addressId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </>
                    )}

                    {/* SETTINGS */}
                    {activeSection === 'Settings' && (
                        <>
                            <h2>Settings</h2>
                            <p>Manage your QuickBite account settings here.</p>
                        </>
                    )}

                </div>
            </div>
        </section>
    );
}

export default Profile;
