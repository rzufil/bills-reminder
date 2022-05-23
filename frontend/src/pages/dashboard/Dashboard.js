import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BillForm from '../../components/billForm/BillForm';
import BillItem from '../../components/billItem/BillItem';
import Spinner from '../../components/spinner/Spinner';
import { getBills, reset } from '../../features/bills/billSlice';
import { update } from '../../features/auth/authSlice';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { bills, isLoading, isError, message } = useSelector(
    (state) => state.bills
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getBills());
    setChecked(!user.optOut);

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  const toggleNotifications = async () => {
    const optOut = user.optOut;
    let userData = {
      optOut: !optOut
    };
    setDisabled(true);
    setChecked(!checked);
    const response = await dispatch(update(userData));
    if (response.payload?.optOut !== optOut) {
      toast.success('Notification settings have been changed.');
    } else {
      toast.error('There was an error while changing the notifications settings.');
    }
    setDisabled(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className='dashboard-container'>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Bills Reminder Dashboard</p>
        <Button
          variant='secondary'
          onClick={toggleModal}
          className='create-btn'
        >
          Create Reminder
        </Button>
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Bill Reminder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BillForm toggleModal={toggleModal} />
          </Modal.Body>
        </Modal>
      </section>

      <section className='dashboard-container'>
        {bills.length > 0 ? (
          <>
            <div className='notification-toggler container'>
              <span>Email Notifications?</span>
              <div className='toggle-switch'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='Email Notifications'
                  id='email-notifications'
                  disabled={disabled}
                  onChange={toggleNotifications}
                  checked={checked}
                />
                <label className='label' htmlFor='email-notifications'>
                  <span className='inner' />
                  <span className='switch' />
                </label>
              </div>
            </div>
            <div className='bills container'>
              {bills.map((bill) => (
                <BillItem key={bill._id} bill={bill} />
              ))}
            </div>
          </>
        ) : (
          <h3>You have not created any bill reminders</h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard;