import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map(task => (
      <li key={task.id}>{task.title}</li>
    ))}
  </ul>
);

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TaskList;