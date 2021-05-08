import React, {useEffect, useRef, useState} from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
    const videoRef = useRef(null);
    const [player, setPlayer] = useState(null);
    const {match, fetchStream, stream} = props;
    useEffect(() => {
        if (!stream) {
            const {id} =  match.params;
            fetchStream(id);
        }

        buildPlayer();

        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, [player]);


    const buildPlayer = () => {
        const {id} =  match.params;
        // We stream needs to exist first because videoRef will not exist without it
        // In the render, there is a condition where it won't render anything until it receives stream
        if (player || !stream) {
            return;
        }
        setPlayer(flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        }));
        if (player) {
            player.attachMediaElement(videoRef.current);
            player.load();
        }
        //player.play();
    };

    if (!stream) {
        return <div>Loading...</div>
    }

    const {title, description} = stream;

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%', }} controls/>
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);