import React from 'react';
import { firebase } from '../firebase';

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      aria-label={`Complete the ${taskDesc} task`}
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          archiveTask();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};
