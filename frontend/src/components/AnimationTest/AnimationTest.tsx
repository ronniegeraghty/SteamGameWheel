import React from "react";
import { useSpring, animated, interpolate } from "react-spring";

const AnimationTest = () => {
  //const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [toggle, setToggle] = React.useState(false);
  const props = useSpring({
    from: {
      opacity: toggle ? 0 : 1,
      right: toggle ? "0" : "200px",
      height: toggle ? "500px" : "auto",
      // transform: `translate3d(0, 0, 0)`
    },
    to: async (next: any, cancel: any) => {
      await next({
        opacity: toggle ? 1 : 0,
        x: 200,
        right: toggle ? "200px" : "0",
        height: toggle ? "100px" : "500px",
        // transform: `translate3d("240px", 0, 0)`
      });
    },
  });
  return (
    <div>
      <animated.div
        style={{
          ...props,
          position: "absolute",
          width: "100px",
          background: "blue",
          top: "10px",
          color: "#fff",
          display: "block",
        }}
      >
        TEST
      </animated.div>

      <div
        onClick={() => setToggle(!toggle)}
        style={{
          margin: "200px 0 ",
        }}
      >
        Toggle
      </div>
    </div>
  );
};

export default AnimationTest;
