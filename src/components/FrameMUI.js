/* eslint-disable react/prop-types */
import { useState, useRef, useCallback } from "react";
import NoSsr from "@mui/material/NoSsr";
import IFrame from "react-frame-component";
function FrameComponent(props) {
  const { children, ...other } = props;
  const [state, setState] = useState({
    ready: false
  });
  const instanceRef = useRef();
  const handleRef = useCallback(ref => {
    instanceRef.current = {
      contentDocument: ref ? ref.node.contentDocument : null,
      contentWindow: ref ? ref.node.contentWindow : null
    };
  }, []);
  const onContentDidMount = () => {
    setState({
      ready: true,
      sheetsManager: new Map(),
      container: instanceRef.current.contentDocument.body,
      window: () => instanceRef.current.contentWindow
    });
  };
  // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
  return (
    <NoSsr defer>
      <IFrame
        ref={handleRef}
        contentDidMount={onContentDidMount}
        {...other}
      >
        <div id="frame-jss" />
        {state.ready ?
          { children }
          : null}
      </IFrame>
    </NoSsr>
  );
}
export default FrameComponent;
