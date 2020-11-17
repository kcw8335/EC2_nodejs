export function Management(state) {
  this.setTitle();
  this.state = state;
}

Management.prototype = {
  setTitle() {
    document.title = "관리페이지";
  },
  changeDom() {
    this.change_img();
    //const img1 = document.querySelector("#img_E1");
    //img1.src = "IMG/E1_T" + data[0] + "_GL.png";
    //const img2 = document.querySelector("#img_E2");
    //img2.src = "IMG/E2_T" + data[1] + "_GL.png";
  },
  getBody() {
    return `<div class="container">
  <div class="traffic-light-container">
    <img class="traffic-light"  />
  </div>
  <div class="controller-container">
    <div class="controller-container__top">
      <div class="subtitle">
        부제목
      </div>
      <div class="management__controller">
        <select id="edge-number" class="edge-number">
          <option value="">Edge선택</option>
          <option value="1">Edge 1</option>
          <option value="2">Edge 2</option>
        </select>
      </div>
      <div class="management__controller">
        <select id="state" class="action-type">
          <option value="">조치선택</option>
          <option value="response-accident">사고대응</option>
          <option value="change-policy">정책변경</option>
        </select>
      </div>
      <div class="management__controller">
        <div class="traffic-controller">
          <select id="select_light">
          <option value="">신호등 선택</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input id="control_light_time" placeholder="초" />
        </div>
      </div>
      <div class="management__controller">
        <button class="confirm">확인</button>
      </div>
    </div>

    <div class="controller-container__bottom">
      <div class="management__controller">
        <button class="reset">정상 동작</button>
      </div>
    </div>
  </div>
</div>


`;
  },
  send_postmsg(data) {
    fetch("http://13.209.12.175:8080/api/response-e1", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then();
  },
  postmsg_nomal() {
    console.log("nomal");
	  var edge = document.querySelector("#edge-number").value;

    var data = {
      edgeNo: `${edge}`,
      traffic_light: "",
      how_many: "",
      occasion: "nomalization",
    };

    this.send_postmsg(data);
  },

  postmsg() {
    console.log("post");

    //var edge = document.querySelector("#") //화면 합쳐질 시 필요함
    var edge = document.querySelector("#edge-number").value;
    var select = document.querySelector("#select_light").value;
    var control = document.querySelector("#control_light_time").value;

    var state = document.querySelector("#state").value;
    var send_state;

    if (state == "response-accident") send_state = "A";
    else send_state = "NA";

    var data = {
      edgeNo: `${edge}`,
      traffic_light: `${select}`,
      how_many: `${control}`,
      occasion: `${send_state}`,
    };

    this.send_postmsg(data);
  },

  change_img() {
    const edges = this.state.state.edges;
    console.log(edges);
    var edgeSel1 = document.querySelector("#edge-number").value;
    console.log(edgeSel1);

    if (edgeSel1 == 1) {
      const img1 = document.querySelector(".traffic-light");
      img1.src = "IMG/E1_T" + edges[0] + "_GL.png";
    } else {
      const img2 = document.querySelector(".traffic-light");
      img2.src = "IMG/E2_T" + edges[1] + "_GL.png";
    }

    // const img2 = document.querySelector("#img_E2");
    // img2.src = "IMG/E2_T" + data[1] + "_GL.png";
  },

  initEventListeners() {
    // 이벤트 바인딩 작업 실시

    var button = document.querySelector(".confirm"); // 확인버튼
    button.addEventListener("click", (() => this.postmsg()).bind(this));

    var button2 = document.querySelector(".reset"); //정상화버튼
    button2.addEventListener("click", (() => this.postmsg_nomal()).bind(this));

    var edgeSel = document.querySelector(".edge-number");
    edgeSel.addEventListener("click", (() => this.change_img()).bind(this));
  },
  onInit() {
    this.change_img();
  },
};
