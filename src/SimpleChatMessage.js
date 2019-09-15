
/**
 * Created to give structure and standard to the messages sent between clients and server
 * @param msg     The text of the message
 * @param sender  The username of the sender
 * @param time    The time the message was sent
 */
export default class SimpleChatMessage {

  // Private variables
  #msg;
  #sender;
  #time;

  constructor(msg, sender, time = new Date()) {
    this.msg = msg;
    this.sender = sender;
    this.time = time;
  }

  getMsg() { return this.msg; }
  getSender() { return this.sender; }
  getTime() { return this.time; }

  // To send to the server
  toString() {
    return JSON.stringify({
      msg: this.msg,
      sender: this.sender,
      time: this.time.toISOString()
    })
  }

  // To get from the server
  static fromString(newMessage) {
    let temp = JSON.parse(newMessage);
    return new SimpleChatMessage(temp.msg, temp.sender, new Date(temp.time));
  }

}