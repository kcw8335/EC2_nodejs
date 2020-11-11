export function Log(type) {
  this.type = type;
  this.setTitle();
}

Log.prototype = {
  setTitle() {
    document.title = "로그보기";
  },
  changeDom() {
    console.log("change DOM");
  },
  getBody() {
    console.log("getbody");
    return `
    <h2>로그보기_${this.matchType(1) ? "사고대응" : "정책변경"}</h2>
    <hr><br><br>
    <div>
       <div id="img_E1"; style="float:left">
            <img src="/IMG/E1_T2_GL.png" width="400px"> 
       </div>
       <div id="img_E2"; style="float:left">
            <img src="/IMG/E2_T2_GL.png" width="400px"> 
       </div>
    </div>
    <div>
        <table id="A_Log_table"  class="type04">
            <thead>
                <tr>
                    <th>idx</th>
                    <th>state_change</th>
                    <th>edgeNo.</th>
                    <th>traffic_light</th>
                    <th>how_many</th>
                    <th>logging_date</th>
                </tr>
            </thead>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>1</td>
                    <td>2</td>
                    <td>2020.10.10 20:34:17</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>1</td>
                    <td>2</td>
                    <td>2020.10.10 22:54:41</td>
                </tr>
        </table>
    </div>
    `;
  },
  initEventListeners() {},
  matchType(type) {
    return this.type === type;
  },
};
