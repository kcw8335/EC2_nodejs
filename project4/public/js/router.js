import { Dashboard } from "./components/dashboard/dashboard.js";
import { Log } from "./components/log/log.js";
import { Management } from "./components/management/management.js";

export const router = {
  state: {},
  routes: [
    { path: "/dashboard", element: (state) => new Dashboard(state) },
    { path: "/management", element: (state) => new Management(state) },
    { path: "/a-log", element: (state) => new Log(1, state) },
    { path: "/na-log", element: (state) => new Log(2, state) },
  ],
  init(state) {
    this.state = state;
    document.addEventListener(
      "click",
      ((e) => {
        const target = e.target;

        if (!target.matches("[data-link]")) {
          return;
        }

        e.preventDefault();
        if (location.href !== target.href) {
          history.pushState(null, null, target.href);
        }

        this.route();
      }).bind(this)
    );

    this.route();
  },
  route() {
    const path = location.pathname;
    let idx = this.routes.findIndex((route) => route.path === path);

    if (!~idx) {
      idx = 0;
    }

    const element = this.routes[idx].element(this.state);

    const contentContainer = document.querySelector(".content");
    contentContainer.innerHTML = element.getBody();

    element.initEventListeners();
    element.onInit();

    this.state.reset();
    this.state.addEventListener(element.changeDom.bind(element));
  },
  pushRoute({ path, component }) {
    this.routes.push({ path, html: component.getBody() });
  },
};
