import React, { Component } from 'react';
import image from '../components/img/images.png';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
    }
  }

  render() {
    const {
      match: { params },
    } = this.props;
    console.log('this.props', params);

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

export default UserProfile;
