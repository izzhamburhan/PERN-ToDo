
import { useState } from "react";

const Modal = ({mode, setShowModal, getData, task}) => {
  const editMode = mode === 'edit' ? true: false
  
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : 'izzham@test.com', // code untuk kalau editmode is on , otherwise null
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })

  // hantar pada database
  const postData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.statusCode === 200){
        console.log('Success')
        setShowModal(false)
        getData()
      }
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.statusCode === 200){
        console.log('Success')
        setShowModal(false)
        getData()
      }
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  } 


  const handleChange = (e) => {

    const {name, value} = e.target

    setData(data => ({
      ...data, 
      [name] : value
    }))

    console.log(data)
  }
  return (

      <div className="overlay">
        <div className="modal"> 
          <div className="form-title-container"> 
            <h3>Let's {mode} your task</h3>
            <button onClick= {()=>setShowModal(false)}>X</button>
          </div>

          <form>
            <input 
              required
              maxLength={30}
              placeholder="Your task goes here"
              name = "title"
              value={data.title}
              onChange={handleChange}
            />
            <br/>
            <label for="range">Drag to select your current progress</label>
            <input 
              type="range"
              id="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />
            <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
          </form>
        </div> 
      </div>
    )
  }
  
  export default Modal;
  