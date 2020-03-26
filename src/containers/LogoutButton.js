import React from "react";

function LogoutButton(props) {
  console.log(props);

  return (
    <div className="logout-button" onClick={() => props.userHasAuthenticated(false)}>
      Logout
    </div>
  );
}

export default LogoutButton;
