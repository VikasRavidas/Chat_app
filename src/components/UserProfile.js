import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import image from '../components/img/images.png';

class UserProfile extends Component {
  componentDidMount() {
    const { id } = this.props.params; // Get userId from props

    if (id) {
      // dispatch an action
      console.log('User ID:', id);
    }
  }

  render() {
    const { id } = this.props.params;
    console.log('this.props', this.props);

    return (
      <div className="settings">
        <div className="img-container">
          <img src={image} alt="user-dp" />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">Some name</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">test@test.com</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

// Wrapper function to pass URL params to class component
const UserProfileWithParams = (props) => {
  const params = useParams();
  return <UserProfile {...props} params={params} />;
};

export default UserProfileWithParams;
