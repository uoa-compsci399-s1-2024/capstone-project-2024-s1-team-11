import './styles.css'
import mainimg from '/placeholder.jpg'


export default function TopImage() {
  return (
    <div className='top-image'style={{backgroundImage: `url("${mainimg}")`}}>
        <span className='bottom-curve'>
          <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.29 22">
            <path className="curve" d="M146.29,22v-.11C127.33,8.33,101.58,0,73.21,0,44.77,0,18.97,8.39,0,22h146.29Z"/>
          </svg>
        </span>
    </div>
  );
}