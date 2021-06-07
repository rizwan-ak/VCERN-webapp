import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './common/theme.js';
import Routes from './common/routes';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API);

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <Elements stripe={stripePromise}>
                        <Routes />
                    </Elements>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
/*
    h1 96px
    h2 60px
    h3 48px
    h4 34px
    h5 24px
    h6 20px
    subtitle1 16px
    subtitle2 14px
    body1 16px
    body2 14px
    button 14px
    caption 12px
    overline 12px
*/
