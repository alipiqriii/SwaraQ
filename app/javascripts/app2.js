// Import the page's CSS. Webpack will know what to do with it.
// import "../stylesheets/app.css";
// import "https://cdnjs.com/libraries/Chart.js";


// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { default as ethUtil} from 'ethereumjs-util';
import { default as sigUtil} from 'eth-sig-util';


/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import voting_artifacts from '../../build/contracts/Voting.json'



var Voting = contract(voting_artifacts);
let candidates = {"Arifin": "candidate-1", "Yossi": "candidate-2", "Oded": "candidate-3"}


$(document).ready(function(){
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  var video = document.createElement("video");
    var canvas2Element = document.getElementById("canvas2");
    var canvas2 = canvas2Element.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    var outputContainer = document.getElementById("output");
    var outputMessage = document.getElementById("outputMessage");
    var outputData = document.getElementById("outputData");

    function drawLine(begin, end, color) {
      canvas2.beginPath();
      canvas2.moveTo(begin.x, begin.y);
      canvas2.lineTo(end.x, end.y);
      canvas2.lineWidth = 4;
      canvas2.strokeStyle = color;
      canvas2.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    function tick() {
      loadingMessage.innerText = "⌛ Loading video..."
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvas2Element.hidden = false;
        outputContainer.hidden = false;

        canvas2Element.height = video.videoHeight;
        canvas2Element.width = video.videoWidth;
        canvas2.drawImage(video, 0, 0, canvas2Element.width, canvas2Element.height);
        var imageData = canvas2.getImageData(0, 0, canvas2Element.width, canvas2Element.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          outputMessage.hidden = true;
          outputData.parentElement.hidden = false;
          outputData.innerText = code.data;
          var cek = true;
          Voting.deployed().then(function(contractInstance) {
            contractInstance.getVoterChoosen(localStorage.getItem("EventID"),code.data).then(function(v) {
              console.log(v);
              // window.location.href = "http://localhost:3000/Event/"+localStorage.getItem("EventID")+"/"+v;
            });
          });
          
          // myFunction(cek);
        } else {
          outputMessage.hidden = false;
          outputData.parentElement.hidden = true;
        }
      }
      requestAnimationFrame(tick);
    }
    function myFunction(cek){
      // if (cek == true) window.location.href=("../../pemilihan.html")
      console.log("A")
    }

  Voting.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $("#" + candidates[name]).val(v.toString());
        var ctx = document.getElementById("myChart");
        var myPieChart = new Chart(ctx,{
          type: 'bar',
          data: {
          labels: ["Pasangan Arifin", "Pasangan Yossi", "Pasangan Oded"],
          datasets: [{
              label: '# Hasil Voting Pemilihan Walikota Bandung 2019',
              data: [$("#candidate-1").val(), $("#candidate-2").val(), $("#candidate-3").val()],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1
          }]
        },
        options: {
          legend: {
            labels: {
              fontSize: 24,
              fontColor: 'black'
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }],
            xAxes: [{
              ticks: {
                fontSize: 24,
                fontColor: 'black'
              }
            }]
          }
        }
        });
      });
    })
  }
});

