// @ts-nocheck
import Reactotron, {
    networking,
    openInEditor,
    trackGlobalErrors,
    overlay,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

/**
 * Configures the Reactotron debugging tool for the React Native application.
 * This configuration sets the Reactotron server connection details, including the
 * server IP address and port, as well as the name of the application.
 * The `enabled` option is set to `true` to enable Reactotron functionality.
 */
export default Reactotron.configure( {
    enabled: true,
    // host: '10.0.2.2',
    name: 'React Native Demo', // server ip
    port: 9090,
} )
    .use( reactotronRedux( false ) )
    .use( trackGlobalErrors() )
    .use( openInEditor() )
    .use( overlay() )
    .use( networking() )
    .connect();
