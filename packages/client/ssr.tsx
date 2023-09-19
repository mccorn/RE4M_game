import ReactDOMServer from 'react-dom/server';
import main from '../client/src/main';
// import App from './src/app/components/app/App';

export default function render() {
    return ReactDOMServer.renderToString(main.mainComponent);
}
