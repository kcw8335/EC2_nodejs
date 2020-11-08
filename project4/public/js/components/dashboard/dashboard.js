export function Dashboard(state) {
  this.state = state;
}

Dashboard.prototype = {
  changeDom() {
    const edges = this.state.state.edges;

    if (!edges) {
      return;
    }

    const img1 = document.querySelector("#img_E1");
    img1.src = "IMG/E1_T" + edges[0] + "_GL.png";

    const img2 = document.querySelector("#img_E2");
    img2.src = "IMG/E2_T" + edges[1] + "_GL.png";
  },
  // TODO: 꼭 봐!
  onInit() {
    this.changeDom();
  },
  getBody() {
    return `
      <div class="dashboard__container">
        <h2 class="dashboard__title">DashBoard</h2>
        <div class="dashboard__content">
          <div class="dashboard__element">
            <img id="img_E1"/>
          </div>
          <div class="dashboard__element">
            <img id="img_E2"/>
          </div>
        </div>
      </div>
    `;
  },
  initEventListeners() {},
};
