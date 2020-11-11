import { Header } from "./components/header/header.js";
import { Sidebar } from "./components/sidebar/sidebar.js";
import { router } from "./router.js";
import { State } from "./state/state.js";
import { SocketController } from "./socket/socket.js";

function init() {
  initHeader();
  initSideBar();
  const state = new State();
  initsocket(state);
  router.init(state);
}

function initHeader() {
  const header = new Header();
  const headerContainer = document.querySelector(".header");
  headerContainer.innerHTML = header.getBody();
}

function initSideBar() {
  const sidebar = new Sidebar();
  const sidebarContainer = document.querySelector(".sidebar");
  sidebarContainer.innerHTML = sidebar.getBody();
}

function initsocket(state) {
  const socket = new SocketController();

  socket.registerListener(((data) => state.notify(data)).bind(state));
  socket.connect();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
