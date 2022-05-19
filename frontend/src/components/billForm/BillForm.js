import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBill } from '../../features/bills/billSlice';
import categories from '../../utils/categories.json';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './BillForm.css';

const categoriesArray = [];
Object.entries(categories).forEach((category) => {
  const [key, value] = category;
  categoriesArray[key] = value;
});

const BillForm = ({ toggleModal }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueMonth, setDueMonth] = useState('');
  const [repeat, setRepeat] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createBill({ name, repeat, dueDate, dueMonth, notes, category }));
    if (response.payload?._id) {
      toggleModal();
      toast.success('New reminder successfully created.');
    }
  };

  const changeRepeat = (e) => {
    setRepeat(e.target.value);
    if (e.target.value === 'month') {
      setDueMonth('');
    }
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Bill Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Repeat Every</label>
          <select
            name='repeat'
            id='repeat'
            onChange={(e) => changeRepeat(e)}
            required
          >
            <option value={''}>Select a repeat pattern</option>
            <option value='month'>Month</option>
            <option value='year'>Year</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Due Date</label>
          <select
            name='duedate'
            id='duedate'
            onChange={(e) => setDueDate(e.target.value)}
            required
          >
            <option value={''}>Select a due date</option>
            {[...Array(31).keys()].map(
              (day, index) => <option value={day + 1} key={index}>
                {day + 1}
              </option>
            )}
          </select>
        </div>
        {repeat === 'year' && (
          <div className='form-group'>
            <label htmlFor='name'>Due Month</label>
            <select
              name='duemonth'
              id='duemonth'
              onChange={(e) => setDueMonth(e.target.value)}
              required
            >
              <option value={''}>Select a due month</option>
              {[...Array(12).keys()].map(
                (month, index) => <option value={month + 1} key={index}>
                  {month + 1}
                </option>
              )}
            </select>
          </div>
        )}
        <div className='form-group'>
          <label htmlFor='name'>Notes</label>
          <input
            type='text'
            name='notes'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Category</label>
          <select
            name='categories'
            id='categories'
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value={''}>Select a category</option>
            {categoriesArray.map(
              (category, index) => <option value={index} key={index}>
                {category['name']}
              </option>
            )}
          </select>
        </div>
        <div className='form-group'>
          <Button
            variant='secondary'
            type='submit'
          >
            Add Reminder
          </Button>
        </div>
      </form>
    </section>
  )
};

export default BillForm;