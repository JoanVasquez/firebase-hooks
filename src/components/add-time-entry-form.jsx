import { useState } from "react";
import firebase from "../firebase";

const AddTimeEntryForm = () => {
  const [title, setTitle] = useState();
  const [time, setTime] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    firebase
      .firestore()
      .collection("times")
      .add({
        title,
        time_seconds: parseInt(time),
      })
      .then(() => {
        setTitle("");
        setTime("");
      });
  };

  return (
    <form className="btn-light p-3" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="number"
          id="time"
          className="form-control"
          value={time}
          onChange={(event) => setTime(event.currentTarget.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Add Time Entry
      </button>
    </form>
  );
};

export default AddTimeEntryForm;
