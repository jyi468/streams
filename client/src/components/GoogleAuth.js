import React from 'react';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '892109219604-3iitchk6ughk1q0mifhc6jkl0m6o9vs7.apps.googleusercontent.com',
                scope: 'email'
            });
        });
    }

    render() {
        return <div>Google Auth </div>;
    }
}

export default GoogleAuth;