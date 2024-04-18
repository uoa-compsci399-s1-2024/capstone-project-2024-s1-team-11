import './styles.css'
import overlay from '/bottom-curve.svg';
import mainimg from '/placeholder.jpg'


export default function TopImage() {
  return (
    <div className='top-image'>
        <span className='bottom-curve'>
            <img src={overlay} alt="Image overlay" />
        </span>
        <img src={mainimg} alt="Image overlay" />
    </div>
  );
}