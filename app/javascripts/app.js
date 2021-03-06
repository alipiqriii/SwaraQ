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

import voting_artifacts from '../../build/contracts/Voting.json';

var Voting = contract(voting_artifacts);

window.isAlreadyVoting = function(NIK){
  console.log(NIK.length);
  Voting.deployed().then(function(contractInstance) {
    contractInstance.validNIK(localStorage.getItem("EventID"),NIK).then(function(isValid) {
      if(isValid && NIK.length == 16 && !isNaN(NIK)){
        localStorage.setItem("NIK",NIK);
        window.location.href = "http://localhost:3000/EventID="+localStorage.getItem("EventID")+"/Pemilihan";
      }
      else if (isNaN(NIK)) swal("QR Code Anda Tidak Valid [Karakte!r]");
      else if (NIK.length != 16) swal("QR Code Anda Tidak Valid");
      else swal("Maaf Anda Sudah Melakukan Pemilihan");
    });
  });
}

window.initQRCamera = function(){
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas");
  var canvas = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");
  var outputData = document.getElementById("outputData");

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
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
      canvasElement.hidden = false;
      outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
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
        isAlreadyVoting(code.data);
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
}
window.initWeb3 = function(){
if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  Voting.setProvider(web3.currentProvider);
}

window.setVotesChart = function(candidate){
  Voting.deployed().then(function(contractInstance) {
    contractInstance.totalVotesFor.call(localStorage.getItem("EventID"),candidate).then(function(v) {
      $("#candidate-" + candidate).val(v.toString());
    });
  })
}

window.initChart = function(nCalon){
  for (var i = 1; i <= localStorage.getItem("nCalon"); i++) {
    setVotesChart(i);
  }
}

window.reloadchart = function(nCalon){
    Voting.setProvider(web3.currentProvider);
  for (var i = 0; i < nCalon; i++) {
    Voting.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(localStorage.getItem("EventID"),name).then(function(v) {
        $("#candidate" + i).val(v.toString());
        var ctx = document.getElementById("myChart");
        var myPieChart = new Chart(ctx,{
          type: 'bar',
          data: {
          labels: ["Pasangan 1", "Pasangan 2", "Pasangan 3"],
          datasets: [{
              label: '# Hasil Voting',
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
}

window.Voting = function(candidate) {
  let candidateName = candidate;
  let signature;
  let NIK;
  let voterAddress = web3.eth.accounts[0];
  var from = web3.eth.accounts[0]
  var value = localStorage.getItem("NIK");
    
    Voting.deployed().then(function(contractInstance) {
      contractInstance.validNIK(localStorage.getItem("EventID"),value).then(function(isValid) {
        if(isValid){
          let msgParams = [
            {
              type: 'string',      // Any valid solidity type
              name: 'Message',     // Any string label you want
              value: 'Voting Dari ' + value  // The value to sign
            }
          ]
          var params = [msgParams, from]
          var method = 'eth_signTypedData'
          console.log("Hash is ");
          console.log(sigUtil.typedSignatureHash(msgParams));
          NIK = value;
          web3.currentProvider.sendAsync({
            method,
            params,
            from,
          }, function (err, result) {
            if (err) return console.dir(err)
            if (result.error) {
              alert(result.error.message)
            }
            if (result.error) return console.error(result)
            signature = result.result;

            console.log(candidateName + '\n' + from + '\n' + result.result);
            swal("Anonim ID Telah terbuat");
            swal({
              title: "Apa Kamu Yakin ?",
              text: "Memilih Calon "+ candidateName +"\n",
              icon: "warning",
              buttons: true,
              dangerMode: true,
              buttons: ["Salah Pilihan", "Yakin"]
            })
            .then((Sure) => {
              if (Sure) {
                console.log(NIK);
                contractInstance.voteForCandidate(localStorage.getItem("EventID"),candidateName, voterAddress, signature, NIK, {gas:181877, from: web3.eth.accounts[0]}).then(function() {

                  swal("Terimakasih Atas Voting Anda", {
                    icon: "success",
                  });

                  window.location.href = "http://localhost:3000/Pemilihan?ID="+localStorage.getItem("EventID");
                });
              } else {
                swal("Pilihlah Calon Yang Tepat");
              }
            });
          });
        }
        else swal("Maaf NIK "+value+" Tersebut Telah Voting");
      });
    });
}

$(document).ready(function(){
    initWeb3();
    initChart(localStorage.getItem("nCalon"));
    reloadchart(localStorage.getItem("nCalon"));
    initQRCamera();
    
});

