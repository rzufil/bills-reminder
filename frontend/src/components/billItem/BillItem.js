import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteBill } from '../../features/bills/billSlice';
import categories from '../../utils/categories.json';
import './BillItem.css';

const categoriesArray = [];
Object.entries(categories).forEach((category) => {
  const [key, value] = category;
  categoriesArray[key] = value;
});

const BillItem = ({ bill }) => {
  const dispatch = useDispatch();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months range from 0-11
  let dueDate;
  if (bill.repeat === 'month') {
    const monthIncrement = bill.dueDate > day ? 0 : 1;
    dueDate = new Date(date.getFullYear(), month - 1 + monthIncrement, bill.dueDate);
  } else if (bill.repeat === 'year') {
    let yearIncrement = 0;
    if (bill.dueMonth < month) {
      yearIncrement = 1;
    } else {
      if (bill.dueMonth === month) {
        if (bill.dueDate < day) {
          yearIncrement = 1;
        }
      }
    }
    dueDate = new Date(date.getFullYear() + yearIncrement, bill.dueMonth - 1, bill.dueDate);
  }

  const getCategoryColor = (category) => {

    return categoriesArray[category]['color'];
  };

  const getCategoryName = (category) => {
    return categoriesArray[category]['name'];
  };

  const removeBill = async (id) => {
    await dispatch(deleteBill(id));
    toast.success('Reminder has been been deleted.');
  };

  return (
    <div className='bill'>
      <div className='card' style={{ borderLeftColor: getCategoryColor(bill.category) }}>
        <div className='card-header'>
          {bill.name}
        </div>
        <div className='card-body'>
          <h5 className='card-title'>Due on {dueDate.toLocaleDateString('en-US')}</h5>
          <p className='card-text'>Repeats every {bill.repeat}</p>
          <p className='card-text'>{getCategoryName(bill.category)}</p>
          <p className='card-text'>{bill.notes}</p>
        </div>
        <button onClick={() => removeBill(bill._id)} className='close'>
          X
        </button>
      </div>
    </div>
  );
};

export default BillItem;