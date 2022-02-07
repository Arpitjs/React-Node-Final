import '../css/welcome.css'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
        <div className="info">
        <h1>Welcome to Contact App</h1>
        <h1>Please Login or Register to continue </h1>
        </div>
        <img src={process.env.PUBLIC_URL + '/images/bg2.jpg'} alt="welcome" />
        <button className="btn" onClick={() => navigate('/login')}>Login</button>
        <button className="btn2" onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}

export default Welcome;