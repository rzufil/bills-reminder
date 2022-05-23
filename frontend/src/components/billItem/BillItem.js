import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteBill } from '../../features/bills/billSlice';
import categories from '../../utils/categories.json';
import {
  FaHome,
  FaCar,
  FaUtensils,
  FaBolt,
  FaSocks,
  FaClinicMedical,
  FaDollarSign,
  FaFingerprint,
  FaMoneyBillAlt,
  FaUserClock,
  FaGlassMartiniAlt,
  FaBook,
  FaAsterisk
} from 'react-icons/fa';
import './BillItem.css';

const categoriesArray = [];
Object.entries(categories).forEach((category) => {
  const [key, value] = category;
  categoriesArray[key] = value;
});

const iconComponent = {
  FaHome,
  FaCar,
  FaUtensils,
  FaBolt,
  FaSocks,
  FaClinicMedical,
  FaDollarSign,
  FaFingerprint,
  FaMoneyBillAlt,
  FaUserClock,
  FaGlassMartiniAlt,
  FaBook,
  FaAsterisk
}

const BillItem = ({ bill }) => {
  const dispatch = useDispatch();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months range from 0-11
  let dueDate;
  if (bill.repeat === 'month') {
    const monthIncrement = bill.dueDate >= day ? 0 : 1;
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

  const getCategoryIcon = (category) => {
    const IconComponent = iconComponent[categoriesArray[category]['icon']];
    return <IconComponent />;
  };

  const removeBill = async (id) => {
    if (window.confirm('Delete the bill reminder?')) {
      await dispatch(deleteBill(id));
      toast.success('Reminder has been been deleted.');
    }
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
          <p className='card-text'>
            <span className='category-icon'>
              {getCategoryIcon(bill.category)}
            </span>
            <span className='category-text'>
              {getCategoryName(bill.category)}
            </span>
          </p>
          <p className='card-text'>{bill.notes}</p>
        </div>
        <div className='card-footer'>
          <button
            className='bill-footer-remove-btn'
            onClick={() => removeBill(bill._id)}
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillItem;