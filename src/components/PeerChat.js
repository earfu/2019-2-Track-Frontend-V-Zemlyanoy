import React from 'react';
import PropTypes from 'prop-types';
import Peer from 'peerjs';
// import chatDefaults from '../chatDefaults';
import MessageForm from './MessageForm';

class PeerChat extends React.Component {
  constructor(props) {
    super(props);
    // new comment
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.makePeer = this.makePeer.bind(this);

    this.state = { conns: [], input: '', current: null, arrays: [] };
  }

  componentDidMount() {
    this.makePeer();
  }

  componentWillUnmount() {
    const { peer } = this.state;
    if (peer) {
      peer.destroy();
    }
  }

  async makePeer() {
    const peer = await new Peer();
    peer.on('error', (error) => console.log(error));
    peer.on('connection', (conn) => {
      const { arrays, conns } = this.state;
      const arr = [];
      conn.on('data', (data) => {
        const { arrays: arraysLocal } = this.state;
        arr.push(data);
        // abuse of closure with an array, and state reset too
        this.setState({ arrays: arraysLocal });
        if (!data.returned) {
          const dataR = data;
          dataR.returned = true;
          conn.send(dataR);
        }
      });

      // close event is not even supported on Firefox, docs say
      // if it were, should remove both conn and arr
      // conn.on('close', ()=>null);

      conns.push(conn);
      arrays.push(arr);
      this.setState({ conns, arrays });
    });
    peer.on('open', () => {
      this.setState({ peer, peerId: peer.id });
    });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleButtonClick(event) {
    event.preventDefault();
    const { input } = this.state;
    if (input === '') {
      return;
    }
    const { arrays, conns, peer } = this.state;
    const { username } = this.props;
    const conn = peer.connect(input, { metadata: { username } });
    const arr = [];
    conn.on('open', () => {
      conn.on('data', (data) => {
        const { arrays: arraysLocal } = this.state;
        arr.push(data);
        // abuse of closure with an array, and state reset too
        this.setState({ arrays: arraysLocal });
        if (!data.returned) {
          const dataR = data;
          dataR.returned = true;
          conn.send(dataR);
        }
      });

      // close event is not even supported on Firefox, docs say
      // if it were, should remove both conn and arr
      // conn.on('close', ()=>null);
    });
    conns.push(conn);
    arrays.push(arr);
    this.setState({ conns, arrays, input: '' });
  }

  handleOpen(event) {
    this.setState({ current: event.target.id });
  }

  render() {
    const { inError } = this.state;
    if (inError) {
      const { error } = this.state;
      return <p>{error}</p>;
    }
    const { current } = this.state;
    if (current) {
      const { arrays, conns, peerId } = this.state;
      const { username } = this.props;
      return (
        <MessageForm
          messageArray={arrays[current]}
          conn={conns[current]}
          peer
          username={username}
          chatId={peerId}
        />
      );
    }
    const { peerId, input, conns } = this.state;
    return (
      <div className="peer-chat-div">
        <p>Your Peer ID:</p>
        <p>{peerId || ''}</p>
        <p>Target Peer ID:</p>
        <input type="text" onChange={this.handleChange} value={input} />
        <button type="button" onClick={this.handleButtonClick}>
          Connect
        </button>
        {conns.map((item, index) => (
          <li className="peer-chat-li" key={item.id}>
            <p>{item.label}</p>
            <button type="button" id={index} onClick={this.handleOpen}>
              <i id={index} className="fa fa-chevron-right" />
            </button>
          </li>
        ))}
      </div>
    );
  }
}

PeerChat.propTypes = {
  username: PropTypes.string.isRequired,
};

export default PeerChat;
