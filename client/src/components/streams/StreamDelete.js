import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from "../../actions";

const StreamDelete = ({fetchStream, match, deleteStream, stream}) => {
    useEffect(() => {
        fetchStream(match.params.id);
    }, [fetchStream]);

    const renderActions = () => {
        const { id } = match.params;
        return (
            <React.Fragment>
                <button onClick={() => deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };

    const renderContent = () => {
        if (!stream) {
            return 'Are you sure you want to delete this stream?';
        }

        return `Are you want to delete the stream with title: ${stream.title}`;
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
