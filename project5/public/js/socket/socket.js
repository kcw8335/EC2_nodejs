export function SocketController() {
  this.listeners = []; //
}

SocketController.prototype = {
  connect() {
    // 소켓 연결
    const socket = io();

    socket.on("edge1", (data, dbstate) => {
      console.log("socket connect");
      this.listeners.forEach((listener) => listener(data));
    });
    socket.on("dbState", (data) => {
      /// 수정부분
      console.log("socket connect2");
      this.listeners.forEach((listener) => listener(data));
    });
  },
  registerListener(listener) {
    this.listeners.push(listener);

    console.log(this.listeners);
  },
};
