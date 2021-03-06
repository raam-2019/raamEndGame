import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as amplifyService from 'services/amplify';
// import * as trackLeaderService from 'services/trackLeaders';
// import * as analyticsService from 'services/analytics';
// import * as costOfRestService from 'services/costOfRest';

import config from './aws-exports';



amplifyService.configure(config);
// costOfRestService.init();
// trackLeaderService.init();
// analyticsService.init();



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
