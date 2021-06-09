/* eslint-disable react/prop-types */
import { useState, useRef, useCallback } from "react";
import { create } from "jss";
import { useTheme, jssPreset, StylesProvider } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";
import rtl from "jss-rtl";
import IFrame from "react-frame-component";
function FrameComponent(props) {
  const { children, ...other } = props;
  const theme = useTheme();
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
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: instanceRef.current.contentWindow["demo-frame-jss"]
      }),
      sheetsManager: new Map(),
      container: instanceRef.current.contentDocument.body,
      window: () => instanceRef.current.contentWindow
    });
  };
  const onContentDidUpdate = () => {
    instanceRef.current.contentDocument.body.dir = theme.direction;
  };
  // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
  return (
    <NoSsr defer>
      <IFrame
        ref={handleRef}
        contentDidMount={onContentDidMount}
        contentDidUpdate={onContentDidUpdate}
        {...other}
      >
        <div id="demo-frame-jss" />
        {state.ready ?
          <StylesProvider jss={state.jss} sheetsManager={state.sheetsManager}>
            {children}
          </StylesProvider>
          : null}
      </IFrame>
    </NoSsr>
  );
}
export default FrameComponent;
