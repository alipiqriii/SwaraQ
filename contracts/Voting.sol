pragma solidity ^0.4.18;
import "./ECRecovery.sol";

contract Voting {
  using ECRecovery for bytes32;
  
  struct Event{
    uint ID;
    mapping(bytes32 => Voter) voterInfo;
    mapping (bytes32 => uint8) votesReceived;
  }

  struct Voter {
      bytes32 choosen_candidate;
      bytes signature;
      bool status;
  }

  mapping (bytes32 => Event) public eventList;
  // mapping (bytes32 => uint8) public votesReceived;
  // mapping(bytes32 => Voter) public voterInfo;

  function bytes32ToStr(bytes32 _bytes32) public constant returns (string){

    bytes memory bytesArray = new bytes(32);
    for (uint256 i; i < 32; i++) {
        bytesArray[i] = _bytes32[i];
        }
    return string(bytesArray);
  }

  function getVoterChoosen(bytes32 _event, bytes32 _nik) view public returns (bytes32){
    if(eventList[_event].voterInfo[_nik].status) return eventList[_event].voterInfo[_nik].choosen_candidate;
    else return 'Undefined';
  }

  function validNIK(bytes32 _event, bytes32 _nik) view public returns (bool) {
    if(eventList[_event].voterInfo[_nik].status) return false;
    else return true; 
  }

  function totalVotesFor(bytes32 _event, bytes32 _candidate) view public returns (uint8) {
    return eventList[_event].votesReceived[_candidate];
  }

  function voteForCandidate(bytes32 _event, bytes32 _candidate, address _voter, bytes _signedMessage, bytes32 _nik) public {

    require(!eventList[_event].voterInfo[_nik].status);
    eventList[_event].votesReceived[_candidate] += 1;

    eventList[_event].voterInfo[_nik].choosen_candidate = _candidate;
    eventList[_event].voterInfo[_nik].signature = _signedMessage;
    eventList[_event].voterInfo[_nik].status = true;

  }
}

