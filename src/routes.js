/* eslint-disable no-unused-vars */
/**
 *
 * Message object is the Messaging Passing Class Object
 * which contains methods suitable for message passing apis.
 *
 * */
export default message => {
  message.on("/echo", async (req, res, actions) => {
    // eslint-disable-next-line no-console
    console.log("message logged");
    res({ response: "hello world" });
  });
};
