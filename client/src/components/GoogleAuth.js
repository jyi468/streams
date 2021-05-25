import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";

const GoogleAuth = ({signIn, signOut, isSignedIn}) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '892109219604-3iitchk6ughk1q0mifhc6jkl0m6o9vs7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                setAuth(window.gapi.auth2.getAuthInstance());
            });
        })
    }, []);

    useEffect(() => {
        if (auth) {
            onAuthChange(auth.isSignedIn.get());  // Update application state based on google auth isSignedIn
            auth.isSignedIn.listen(onAuthChange);  // listen for sign in or out
        }
    }, [auth]);

    // Make any callback functions into arrow functions
    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            signIn(auth.currentUser.get().getId());
        } else {
            signOut();
        }
    };

    const onSignInClick = () => {
        auth.signIn();
    };

    const onSignOutClick = () => {
        auth.signOut();
    };

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return <div>Not sure if signed in</div>;
        } else if (isSignedIn) {
            return (
                <button onClick={onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    };

    return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleAuth);