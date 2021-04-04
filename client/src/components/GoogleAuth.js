import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '892109219604-3iitchk6ughk1q0mifhc6jkl0m6o9vs7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });  // re-render of component
                this.auth.isSignedIn.listen(this.onAuthChange);  // listen for sign in or out
            });
        })
    }

    // Make any callback functions into arrow functions
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>Not sure if signed in</div>;
        } else if (this.state.isSignedIn) {
            return <div>I am signed in</div>;
        } else {
            return <div>I am not signed in</div>
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;