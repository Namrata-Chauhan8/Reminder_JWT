import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Reminder App</h1>
        <p>
          This app helps you stay organized by managing your tasks and reminders
          effectively. Whether it's for work, study, or personal life, the Reminder App
          has got you covered!
        </p>
        <p>
          With features like task categorization, due date reminders, and priority
          settings, you'll never miss an important task again.
        </p>
        <p>
          Start using the Reminder App today and boost your productivity!
        </p>
      </div>
    </div>
  );
}

export default Home;
