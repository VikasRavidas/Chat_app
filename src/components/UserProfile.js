import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import image from '../components/img/images.png';
import { fetchUserProfile } from '../actions/profile';

class UserProfile extends Component {
  componentDidMount() {
    const { id } = this.props.params; // Get userId from props
    console.log('User ID:', id);

    if (id) {
      this.props.fetchUserProfile(id); // ✅ Correct way to call the action
    }
  }

  render() {
    const { profile } = this.props;
    const user = profile?.user || {}; // ✅ Ensure `user` exists
    // if (profile.inProgress) {
    //   return <h1>Loading....</h1>;
    // }
    return (
      <div className="settings">
        <div className="img-container">
          <img src={image} alt="user-dp" />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name || 'Some name'}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email || 'a@a.com'}</div>
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

// ✅ Connect Redux state and actions to UserProfile
const mapStateToProps = (state) => ({
  profile: state.profile, // Adjust this based on your Redux store structure
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: (id) => dispatch(fetchUserProfile(id)), // ✅ Correctly map action
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileWithParams);
