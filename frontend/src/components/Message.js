import React from "react";

const Message = ({ message }) => {
  return (
    message && (
      <div className={`mb-4 p-2 text-center bg-red-500 text-white rounded-md`}>
        {message}
      </div>
    )
  );
};

export default Message;
