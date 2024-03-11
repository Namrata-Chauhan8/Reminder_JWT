import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  SERVER_URL,
  GET_REMINDER,
} from "../../constants/Constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReminderList from "./ReminderList";
import "./Reminder.css";
import Update from "./Update";
import axios from "axios";
import {
  addReminderAction,
  deleteReminderAction,
  getReminderAction,
} from "../../redux/actions/actions";


let UpdateArray = [];

const Reminder = (e) => {
  const dispatch = useDispatch();
  const [Data, updateData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(getCurrentTime());
  const [Array, setArray] = useState([]);
  const [Input, setInput] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: selectedTime,
  });
  const userId = localStorage.getItem("id");

  function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return `${hours}:${minutes}`;
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const addReminder = async () => {
    try {
      // Accessing the cookie named "token"
      const tokenCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));
  
      // Extracting the token value
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;
      console.log("hello",token);
      const newReminder = {
        title: Input.title,
        description: Input.description,
        date: selectedDate,
        time: selectedTime,
        id: userId,
      };
    
  
      if (token) { // Check if token exists
        const success = await dispatch(addReminderAction(newReminder, token));
        if (success) {
          setInput({
            title: "",
            description: "",
            date: new Date(),
            time: getCurrentTime(),
          });
          toast.success("Reminder added successfully");
          fetchReminders();
        } else {
          toast.error("Failed to add reminder");
        }
      } else {
        toast.error("User not authenticated"); // Handle case where token is not present
      }
    } catch (error) {
      console.error("Error adding reminder:", error);
      toast.error("Failed to add reminder");
    }
  };
  
  const deleteId = async (deleteId) => {
    try {
      if (userId) {
        const deleteReminder = await dispatch(
          deleteReminderAction(deleteId, userId)
        );
        if (deleteReminder) {
          toast.success("Reminder deleted successfully");
        }
      } else {
        toast.error("Failed to delete the Reminder");
      }
      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Failed to delete the Reminder");
    }
  };

  const fetchReminders = async () => {
    try {
      // Accessing the cookie named "token"
      const tokenCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));
  
      // Extracting the token value
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;
  
      if (token && userId) { // Check if token and userId exist
        const getReminder = await dispatch(getReminderAction(userId, token));
        if (getReminder) {
          setArray(getReminder.data.getList);
        }
      } else {
        console.error("User not authenticated or userId missing");
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };
  

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await axios
          .get(`${SERVER_URL}${GET_REMINDER}${userId}`)
          .then((response) => {
            setArray(response.data.getList);
          });
      };
      fetch();
    }
  }, [Input]);

  const update = (value) => {
    UpdateArray = Array[value];

    updateData({
      _id: Array[value]._id,
      title: Array[value].title,
      description: Array[value].description,
      date: Array[value].date,
      time: Array[value].time,
    });
  };

  useEffect(() => {
    if (Array && Array.length > 0) {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const currentTime = getCurrentTime();

        Array.forEach((item) => {
          const itemDate = new Date(item.date);
          const itemTime = item.time;

          if (
            currentDate.getDate() === itemDate.getDate() &&
            currentDate.getMonth() === itemDate.getMonth() &&
            currentDate.getFullYear() === itemDate.getFullYear() &&
            currentTime === itemTime
          ) {
            toast.info(`${item.title}\nDescription: ${item.description}`);
          }
        });
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [Array, selectedDate, selectedTime]); 

  const isDisabled =
    Input.title.trim() === "" || Input.description.trim() === "";

  const show = (value) => {
    document.getElementById("reminder-update").style.display = value;
  };

  return (
    <div className="container mb-3 mt-5">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={addReminder}>
            <input
              type="text"
              className="form-control"
              name="title"
              value={Input.title}
              onChange={change}
              placeholder="Title"
              required
            />
            <div className="mt-3">
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={Input.description}
                onChange={change}
                placeholder="Description"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mt-3">
              <div className="row">
                <div className="col-md-2">
                  <label className="form-label">Date</label>
                  <DatePicker
                    selected={selectedDate}
                    name="date"
                    dateFormat="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    className="form-control"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Time</label>
                  <TimePicker
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                onClick={addReminder}
                disabled={isDisabled}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="reminder-body">
        <ToastContainer />
        <div className="container-fluid">
          <div className="row">
            {Array &&
              Array.map((item, index) => (
                <div className="col-lg-3 col-8 mx-5 my-2" key={index}>
                  <ReminderList
                    title={item.title}
                    description={item.description}
                    selectedDate={item.date}
                    selectedTime={item.time}
                    id={item._id}
                    onDelete={deleteId}
                    display={show}
                    updateId={index}
                    toUpdate={update}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="reminder-update" id="reminder-update">
        <Update display={show} UpdateArray={Data} setArray={setArray} />
      </div>
    </div>
  );
};

export default Reminder;
