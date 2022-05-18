import { FaSignInAlt, FaSignOutAlt, FaUser, FaCalendarCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { Button } from 'react-bootstrap';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <nav className='navbar navbar-light bg-light shadow'>
      <div className='container'>
        <ul className='nav navbar-nav d-inline'>
          <li className='nav-item'>
            <Link to='/'>
              <div className='navbar-brand'>
                <span className='icon'>
                  <FaCalendarCheck />
                </span>
                <span className='text'>Bills Reminder</span>
              </div>
            </Link>
          </li>
          {user ? (
            <li className='nav-item'>
              <Link to='/dashboard'>
                <div className='navbar-brand'>
                  <span className='text'>Dashboard</span>
                </div>
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        <ul className='nav navbar-nav d-inline'>
          {user ? (
            <li className='nav-item'>
              <Button
                variant='secondary'
                onClick={onLogout}
              >
                <FaSignOutAlt /><span>Logout</span>
              </Button>
            </li>
          ) : (
            <>
              <li className='nav-item'>
                <Link to='/login'>
                  <Button
                    variant='secondary'
                  >
                    <FaSignInAlt /><span>Login</span>
                  </Button>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/register'>
                  <Button
                    variant='secondary'
                  >
                    <FaUser /><span>Register</span>
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;