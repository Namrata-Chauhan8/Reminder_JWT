import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateReminderAction } from "../../redux/actions/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import { SERVER_URL, GET_REMINDER} from "../../constants/Constants";

const Update = ({ display, UpdateArray, setArray }) => {
  let userId = localStorage.getItem("id");
  const [Input, setInput] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setInput({
      title: UpdateArray.title,
      description: UpdateArray.description,
      date: UpdateArray.date,
      time: UpdateArray.time
    });
  }, [UpdateArray]);

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const success = await dispatch(updateReminderAction(UpdateArray._id, Input));
      if (success) {
        toast.success("Reminder updated successfully");
        display("none");
        const fetch = async () => {
          const response = await axios.get(`${SERVER_URL}${GET_REMINDER}${userId}`);
          setArray(response.data.getList);
        }
        fetch();
      } else {
        toast.error("Failed to update reminder");
      }
    } catch (error) {
      console.error("Error updating reminder:", error);
      toast.error("Failed to update reminder");
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h1>Update your Task</h1>
      <div className="mt-3" style={{ width: "100%" }}>
        <input
          type="text"
          className="form-control mb-3 w-100"
          placeholder="Enter Title"
          name="title"
          value={Input.title}
          onChange={change}
        />
        <textarea
          className="form-control mb-3"
          name="description"
          placeholder="Enter Description"
          rows="3"
          value={Input.description}
          onChange={change}
        ></textarea>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <DatePicker
              selected={Input.date}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              onChange={(date) => change({ target: { name: "date", value: date } })}
              name="date"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              value={Input.time}
              onChange={change}
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() => display("none")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
