import { Fragment, useState, useEffect } from "react";
import firebase from "../firebase";

const SORT_OPTIONS = {
  TIME_ASC: { column: "time_seconds", direction: "asc" },
  TIME_DESC: { column: "time_seconds", direction: "desc" },

  TITLE_ASC: { column: "title", direction: "asc" },
  TITLE_DESC: { column: "title", direction: "desc" },
};

const useTimes = (sortBy = "TIME_ASC") => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("times")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newTimes = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTimes(newTimes);
        return () => unsubscribe();
      });
  }, [sortBy]);

  return times;
};

const TimesList = () => {
  const [sortBy, setSortBy] = useState("TIME_ASC");
  const times = useTimes(sortBy);
  return (
    <Fragment>
      <form>
        <h2>Time List</h2>
        <div className="form-group">
          <label htmlFor="time-options">Sort By:</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.currentTarget.value)}
            id="time-options"
            className="form-control"
          >
            <option value="TIME_ASC">Time (fastest first)</option>
            <option value="TIME_DESC">Time (slowest first)</option>
            <option disabled>---</option>
            <option value="TITLE_ASC">Title a - z)</option>
            <option value="TITLE_DESC">Title (z - a)</option>
          </select>
        </div>
      </form>
      <ul>
        {times.map((time) => {
          return (
            <li
              key={time.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {time.title}
              <span class="badge badge-primary badge-pill">
                {time.time_seconds} seconds
              </span>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default TimesList;
