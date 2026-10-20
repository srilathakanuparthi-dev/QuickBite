
import { useState, useEffect } from 'react';
import './Profile.css';

function Profile({ firstName, lastName, email }) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(
    `${firstName || ''} ${lastName || ''}`.trim()
  );

  const [userEmail, setUserEmail] = useState(email || '');

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(userEmail);

  useEffect(() => {
    const fullName = `${firstName || ''} ${lastName || ''}`.trim();

    setName(fullName);
    setUserEmail(email || '');
    setEditName(fullName);
    setEditEmail(email || '');
  }, [firstName, lastName, email]);

  const handleEdit = () => {
    setEditName(name);
    setEditEmail(userEmail);
    setIsEditing(true);
  };

  const handleSave = () => {
    setName(editName);
    setUserEmail(editEmail);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(name);
    setEditEmail(userEmail);
    setIsEditing(false);
  };

  return (
    <section className="profile-page">
      <div className="profile-header">
        <p>MY ACCOUNT</p>
        <h1>My Profile</h1>
        <span>Manage your personal information</span>
      </div>

      <div className="profile-layout">
        {/* Profile Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrapper">
  <div className="profile-avatar">👤</div>

  <button
    type="button"
    className="profile-avatar-edit"
    onClick={handleEdit}
    title="Edit Profile"
  >
    ✏️
  </button>
</div>

          <h2>{name || 'User'}</h2>
          <p>{userEmail}</p>

          <div className="profile-menu">
            <button
              type="button"
              className="profile-menu-active"
            >
              👤 My Profile
            </button>

            <button
              type="button"
              onClick={() => alert('My Orders coming soon!')}
            >
              📦 My Orders
            </button>

            <button
              type="button"
              onClick={() => alert('Saved Addresses coming soon!')}
            >
              📍 Saved Addresses
            </button>

            <button
              type="button"
              onClick={() => alert('Settings coming soon!')}
            >
              ⚙️ Settings
            </button>

            <button
              type="button"
              onClick={() => alert('Logout coming soon!')}
            >
              ↪️ Logout
            </button>
          </div>
        </aside>

        {/* Profile Details */}
        <div className="profile-details-card">
          <div className="profile-card-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Update your profile details here.</p>
            </div>
          </div>

          <div className="profile-fields">
            <label>
              Full Name
              <input
                type="text"
                value={isEditing ? editName : name}
                readOnly={!isEditing}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your full name"
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={isEditing ? editEmail : userEmail}
                readOnly={!isEditing}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </label>
          </div>

          {/* Show buttons only while editing */}
          <div className="profile-button-area">
            {isEditing && (
              <div className="profile-actions">
                <button
                  type="button"
                  className="profile-save-button"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
