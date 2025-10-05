import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        onNavigate: ({ pathname: nextPathname }) => {
          console.log("Container navigated to", nextPathname);
          const { pathname } = history.location;
          if (pathname !== nextPathname) {
            history.push(nextPathname);
          }
        },
      });
      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};
