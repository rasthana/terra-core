/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'xfc';
import styles from './Provider.scss';

class FullScreenProvider extends React.Component {
  componentDidMount() {
    document.body.classList.toggle('embedded-content-body');
    Provider.init({ acls: ['http://localhost:8080'] });
  }

  render() {
    const onFullScreen = () => {
      Provider.fullscreen('http://localhost:8080/#/tests/embedded-content-consumer-tests/basic-provider');
    };

    return (
      <div className={[styles['embedded-content']]}>
        <title>Full Screen Event</title>
        <meta charSet="utf-8" />
        <div>
          <h1>Full Screen Event</h1>
          <p>Provide an API for consuming applications to request that an application be launched full screen.</p>
          <button type="fullscreen" onClick={onFullScreen}>Show Provider</button>
        </div>
      </div>
    );
  }
}

export default FullScreenProvider;
