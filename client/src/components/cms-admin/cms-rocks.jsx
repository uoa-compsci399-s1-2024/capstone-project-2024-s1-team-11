import { useState } from 'react';
import Hamburger from '../Hamburger';
import './styles.css'

function EditRock({close}) {
  return (
    <>
        <h2>View or edit rock details</h2>
        <form>
          <label name="topic">Associated topic
            <select>
              <option value="0">Zero</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </label> 
          <label name="rname">Rock name
            <input type="text" name="rname" id='rname' value="Zero" />
          </label>
          <div className='cms-image'><img src="maths-rocks-zero.jpg" /></div>
          <label name="filename">Change the rock image
            <input type="file" id="myFile" name="filename" />
          </label>  
          <button type='submit' className='btn'>Submit</button>
        </form>
    </>
  )}


function AddRock({close}) {

  return (
    <>
        <h2>Add a new rock</h2>
        <form>
          <label name="topic">Select a topic page to associate the rock with
            <select>
              <option value="0">Zero</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </label> 
          <label name="rname">Rock name
            <input type="text" name="rname" id='rname' />
          </label>
          <label name="filename">Rock image
            <input type="file" id="myFile" name="filename" />
          </label>  
          <button type='submit' className='btn'>Submit</button>
        </form>
    </>
  )}


  function CmsModal({close, content}) {

    return (
      <>
        <div className="modal-content">
          <span className='close' onClick={() => close()}>
            <Hamburger />
          </span>
          {content.add ? <AddRock /> : null}
          {content.edit ? <EditRock /> : null}
        </div>
      </>
    )}

    
export default function CmsRocks() {
  const [editModal, setEditModal] = useState(false);
  const [content, setContent] = useState({
    edit: false,
    add: false
  });

  function handleState() {
    setEditModal(!editModal);
  }

  return (
    <>
      <h2>Rocks</h2>
      <p>This table shows all rocks that have been loaded to the database.</p>
      <button className='btn' onClick={() => {
        setEditModal(!editModal);
        setContent({edit: false, add: true})
      }}>Add new rock +</button>
      <div className={editModal ? 'modal-wrapper open-modal' : 'modal-wrapper'}>
        <CmsModal close={handleState} content={content}  />
      </div>
      <table>
        <tr>
          <th>Rock id</th>
          <th>Associated Topic</th>
          <th>Rock name</th>
          <th>QR code url</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Zero</td>
          <td>Zero</td>
          <td><a href='http://localhost:5173/rock/1' target='_blank'>http://localhost:5173/rock/1</a></td>
          <td>
          <button className='btn' onClick={() => {
            setEditModal(!editModal);
            setContent({edit: true, add: false})
          }}>View/Edit</button>
          <div className={editModal ? 'modal-wrapper open-modal' : 'modal-wrapper'}>
            <CmsModal close={handleState} content={content} /></div>
          </td>
        </tr>
      </table>
      </>
  );
}