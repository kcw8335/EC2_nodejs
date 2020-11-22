
export function SocketController() {
  this.listeners = [];
}

SocketController.prototype = {
  connect() {
    const socket = io();

    socket.on("edge1", (data) => {
      console.log("socket connect");
      this.listeners.forEach((listener) => listener(data));
    });
  },

  registerListener(listener) {
    this.listeners.push(listener);

    console.log(this.listeners);
  },
};


