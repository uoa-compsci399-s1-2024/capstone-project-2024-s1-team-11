import { useState } from 'react';
import Hamburger from '../Hamburger';
import './styles.css'
import TextEditor from './text-editor';

function EditTopic({close}) {
  return (
    <>
        <h2>View or edit topic details</h2>
        <form>
          <label name="heading">Topic heading
            <input type="text" name="heading" id='heading' />
          </label>
          <label >Current main image
            <div className='cms-image'><img src="/maths-rocks-zero.jpg" /></div>
          </label>
          <label name="filename">Change the main image
            <input type="file" id="myFile" name="filename" />
          </label>  
          <label name="texteditor">Update the page text
            <TextEditor />
          </label>  
          <label name="metatitle">Meta title (this is for ranking on google)
            <input type="text" name="metatitle" id='metatitle' />
          </label>
          <label name="metadesc">Meta description (this is a short summary for ranking on google)
            <input type="text" name="metadesc" id='metadesc' />
          </label>
          <button type='submit' className='btn'>Submit</button>
        </form>
    </>
  )}


function AddTopic({close}) {

  return (
    <>
        <h2>Add a new topic</h2>
        <form>
          <label name="heading">Page heading
            <input type="text" name="heading" id='heading' />
          </label>
          <label name="filename">Choose a main image
            <input type="file" id="myFile" name="filename" />
          </label>
          <label name="texteditor">Add the page text
            <TextEditor />
          </label>  
          <label name="metatitle">Meta title (this is for ranking on google)
            <input type="text" name="metatitle" id='metatitle' />
          </label>
          <label name="metadesc">Meta description (this is a short summary for ranking on google)
            <input type="text" name="metadesc" id='metadesc' />
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
          {content.add ? <AddTopic /> : null}
          {content.edit ? <EditTopic /> : null}
        </div>
      </>
    )}

    
export default function CmsTopics() {
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
      <h2>Maths topics</h2>
      <p>This table shows all the maths topic pages.</p>
      <button className='btn' onClick={() => {
        setEditModal(!editModal);
        setContent({edit: false, add: true})
      }}>Add new topic +</button>
      <div className={editModal ? 'modal-wrapper open-modal' : 'modal-wrapper'}>
        <CmsModal close={handleState} content={content}  />
      </div>
      <table>
        <tr>
          <th>Topic id</th>
          <th>Title (H1 tag)</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Zero</td>
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