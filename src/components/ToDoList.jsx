import React from "react";
import Tasks from "./Tasks";
import OngoingTask from "./OngoingTask";
import PropTypes from "prop-types";

export default function ToDoList({ color }) {
  return (
    <div className={`bg-${color} p-4`}>
      <Tasks></Tasks>
    </div>
  );
}
Tasks.propTypes = {
  color: PropTypes.string,
};
