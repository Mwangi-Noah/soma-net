import App from './Components/App';
import PostCreator from './Components/PostCreator';
import Comments from './components/Comments';
import PostPage from './Components/PostPage';
import LoginForm from './Components/LoginForm';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';

const AppRouter = () => {
	return (
		<>
			<Router>
				<Route exact path='/' component={App} />
				<Route path='/create' component={PostCreator} />
				<Route path='/comment' component={Comments} />
				<Route path='/posts/:id' component={PostPage} />
				<Route path='/login' component={LoginForm} />
				<Route path='/registration' component={RegistrationForm} />
			</Router>
		</>
	);
};
ReactDOM.render(<AppRouter />, document.getElementById('root'));
