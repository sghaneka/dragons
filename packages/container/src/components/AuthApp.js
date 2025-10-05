import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        onNavigate: ({ pathname: nextPathname }) => {
          console.log("Container navigated to", nextPathname);
          const { pathname } = history.location;
          if (pathname !== nextPathname) {
            history.push(nextPathname);
          }
        },
        onSignIn: () => {
          console.log("User signed in");
          onSignIn();
        },
      });
      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};
