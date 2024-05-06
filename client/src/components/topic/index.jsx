import { Link, NavLink } from "react-router-dom";

export default function TopicCards() {
    return (
      <>
       <Link to={`/rocks/1`} className="rock-grid-item">
            <div className='rock-grid-img' style={{backgroundImage: `url("../maths-rocks-zero.jpg")`}}></div>
            <h3>What's so cool about the number 0?</h3>
            <button className='btn'>Learn More</button>
        </Link >
        <Link to={`/rocks/1`} className="rock-grid-item">
            <div className='rock-grid-img' style={{backgroundImage: `url("../maths-rocks-one.jpg")`}}></div>
            <h3>Why we love the number 1!</h3>
            <button className='btn'>Learn More</button>
        </Link >
        <Link to={`/rocks/1`} className="rock-grid-item">
            <div className='rock-grid-img' style={{backgroundImage: `url("../maths-rocks-two.jpg")`}}></div>
            <h3>Learn about the number 2</h3>
            <button className='btn'>Learn More</button>
        </Link >
        <Link to={`/rocks/1`} className="rock-grid-item">
            <div className='rock-grid-img' style={{backgroundImage: `url("../maths-rocks-three.jpg")`}}></div>
            <h3>Learn about the number 3</h3>
            <button className='btn'>Learn More</button>
        </Link >
      </>
    );
  }