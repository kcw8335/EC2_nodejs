function postmsg() {
  const light = document.querySelector("#light");
  console.log(light);
  // ec2올릴시 변경!!!!!!!!!!!!****************
  // var select = $('select[name=Select_light]').val();
  // var control = $('input[name=control_light_time]').val()
  var select = document.querySelector("#select_light").value;
  var control = document.querySelector("#control_light_time").value;

  console.log(select);

  var data = {
    traffic_light: `${select}`,
    how_many: `${control}`,
  };

  console.log(data);
  fetch("http://localhost:8080/api/response-e2", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then();
}

// const light = document.getElementById('light');

var button = document.getElementById("Response_E1_btn");
button.addEventListener("click", postmsg, false);

// const button = document.getElementById('light');

//       button.addEventListener("click", function(){
//         console.log("light");
// // ec2올릴시 변경!!!!!!!!!!!!****************
//         var select = $('select[name=Select_light]').val();
//         var control = $('input[name=control_light_time]').val()
//       var data = {
//         traffic_light: `${select}`,
//         how_many: `${control}`
//       }

//       console.log(data);
//         fetch("http://localhost:8080/Response_E1", {
//           method: "POST",
//           body: JSON.stringify(data),
//           headers: {
//             "Content-Type": "application/json",
//           }
//         }).then();

//       });
