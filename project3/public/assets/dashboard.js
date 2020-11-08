const socket = io();
socket.on('edge1', (light) => {
    document.getElementById("img_E1").src = "IMG/E1_T"+light+"_GL.png"; 
 });

 socket.on('edge2', (light) => {
   document.getElementById("img_E2").src = "IMG/E2_T"+light+"_GL.png"; 
});
//  function refreshImg() {
//     var E_num_1=1;
//    // var T_num_1=Math.floor(Math.random() * 4) + 1;
//     var E_num_2=2;
//     //var T_num_2=Math.floor(Math.random() * 4) + 1;
//     document.getElementById("img_E1").src = "IMG/E"+E_num_1+"_T"+T_num_1+"_O.png"; 
//     document.getElementById("img_E2").src = "IMG/E"+E_num_2+"_T"+T_num_2+"_O.png"; 
//     //Id = setTimeout("refreshImg()", 2000);
//     }