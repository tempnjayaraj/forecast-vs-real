import './thinkingVSexecution.css';
import './plain.js';
import data from './data.json'

function ThinkingVSexecution() {
    let numCols = 0;
    let numRows = 0;

function writeCheckboxAndName(tableName,fieldName){
  let table = document.getElementById(tableName);
  var row = table.insertRow();
  row.style.backgroundColor = "#dddddd";
  var checkBox = row.insertCell(0);
  checkBox.innerHTML = "+";
  checkBox.addEventListener("click",function(){
    alert('Clicked');
});
  var particular = row.insertCell(1);
  particular.innerHTML = fieldName;
  return row;
}

function writeSummary(){
      var row2 = writeCheckboxAndName('tableTop','Monthly TDS Summary');
      row2.style.backgroundColor = "white";
      for(let i=2;i<14;i++){
        var tdsSum = row2.insertCell(i);
        let sum = Number(0);
        for(let itr=0;itr<data.outFlow.length;itr++){
          let amount = data.outFlow[itr].valueArray[i-2];
          let tds = data.outFlow[itr]['tds%'][i-2];
          sum = sum + amount*(tds/100);
        }
        tdsSum.innerHTML = `<b>${Number(sum)}</b>`;
      }
      
      var row = writeCheckboxAndName('tableTop','Cash OutFlow');
      for(let i=2;i<14;i++){
        var totalSum = row.insertCell(i);
        let sum = Number(0);
        for(let itr=0;itr<data.outFlow.length;itr++){
          let amount = data.outFlow[itr].valueArray[i-2];
          let gst = data.outFlow[itr]['gst%'][i-2];
          let tds = data.outFlow[itr]['tds%'][i-2];
          sum = sum + amount + amount*(gst/100) + amount*(tds/100);
        }
        totalSum.innerHTML = `<b>${Number(sum)}<b>`;
      }

      var row5 = writeCheckboxAndName('tableTop','GST Payment');
      for(let i=2;i<14;i++){
        var tdsSum = row5.insertCell(i);
        let sum = Number(0);
        for(let itr=0;itr<data.inFlow.length;itr++){
          let amount = data.inFlow[itr].valueArray[i-3];
          let tds = data.inFlow[itr]['gst%'][i-3];
          sum = sum + amount*(tds/100);
        }
        if(!Number(sum)){
          tdsSum.innerHTML = `<b>Not Entered</b>`
        }else{
          tdsSum.innerHTML = `<b>${Number(sum)}</b>`;
        }
      }

      var row3 = writeCheckboxAndName('tableBottom','Monthly GST Summary');
      row3.style.backgroundColor = "white";
      for(let i=2;i<14;i++){
        var tdsSum = row3.insertCell(i);
        let sum = Number(0);
        for(let itr=0;itr<data.inFlow.length;itr++){
          let amount = data.inFlow[itr].valueArray[i-2];
          let tds = data.inFlow[itr]['gst%'][i-2];
          sum = sum + amount*(tds/100);
        }
        tdsSum.innerHTML = `<b>${Number(sum)}</b>`;
      }
      
      var row4 = writeCheckboxAndName('tableBottom','Cash Inflow');
      for(let i=2;i<14;i++){
        var totalSum = row4.insertCell(i);
        let sum = Number(0);
        for(let itr=0;itr<data.inFlow.length;itr++){
          let amount = data.inFlow[itr].valueArray[i-2];
          let gst = data.inFlow[itr]['gst%'][i-2];
          let tds = data.inFlow[itr]['tds%'][i-2];
          sum = sum + amount + amount*(gst/100) + amount*(tds/100);
        }
        totalSum.innerHTML = `<b>${Number(sum)}<b>`;
      }
   
}
  
    function hideSummary(){
      var children = document.getElementsByClassName('child');
      if(children.length!=0){
        for (var i = 0; i < children.length; i ++) {
          children[i].classList.remove('child');
          hideSummary();
        }
      }else{
        
      }

    }
    function populate(){
    let iterator = 0;
    let table = document.getElementById('tableTop');  
    for(iterator=0;iterator<data.outFlow.length;iterator++){
        let currentObject = data.outFlow[iterator];
        let name = currentObject.name;
        let amount = currentObject.valueArray;
        let gst = currentObject['gst%'];
        let tds = currentObject['tds%'];
        let row = table.insertRow();
        var checkBox = row.insertCell(0);
        checkBox.innerHTML = '<input class="selects" id=row'+numRows+' type="checkbox">';
        var particular = row.insertCell(1);
        particular.innerHTML = name;
        for(let i=2;i<14;i++){
          let calcSum = amount[i-2] - amount[i-2]*((tds[i-2])/100)+amount[i-2]*((gst[i-2])/100);
          var cell2 = row.insertCell(i);
          cell2.innerHTML = `<table>
          <tr>
              <td>${amount[i-2]}</td>
              <td><b><font color="blue">${tds[i-2]}</font></b></td>
              <td><b><font color="red">${gst[i-2]}</font></b></td>
          </tr>
          <tr>
              <td colspan="3"><b>${calcSum}</b></td>
          </tr>
      </table>`;                            
        }
      }
      numRows++;
      secondTable();
      writeSummary();
    }
    // function closeModal(){
    //     var modal = document.getElementById("myModal");
    //     modal.style.display = "none"
    // }
    // function popup(){
    //     document.getElementById("myModal").style.display = "block";
    // }
    function secondTable(){
      let iterator = 0;
      let table = document.getElementById('tableBottom');  
      for(iterator=0;iterator<data.inFlow.length;iterator++){
          let currentObject = data.inFlow[iterator];
          let name = currentObject.name;
          let amount = currentObject.valueArray;
          let gst = currentObject['gst%'];
          let tds = currentObject['tds%'];
          let row = table.insertRow();
          var checkBox = row.insertCell(0);
          checkBox.innerHTML = '<input class="selects" id=row'+numRows+' type="checkbox">';
          var particular = row.insertCell(1);
          particular.innerHTML = name;
          for(let i=2;i<14;i++){
            let calcSum = amount[i-2] - amount[i-2]*((tds[i-2])/100)+amount[i-2]*((gst[i-2])/100);
            var cell2 = row.insertCell(i);
            cell2.innerHTML = `<table>
            <tr>
                <td>${amount[i-2]}</td>
                <td><b><font color="blue">${tds[i-2]}</font></b></td>
                <td><b><font color="red">${gst[i-2]}</font></b></td>
            </tr>
            <tr>
                <td colspan="3"><b>${calcSum}</b></td>
            </tr>
        </table>`;                            
          }
        }
        numRows++;
        // writeSummary();
    }
    return <div>
        <center>
            <br></br><br></br>
        <button onClick={()=>populate()} >Populate</button>
        <button onClick={()=>secondTable()}>Delete Field</button>
        <br></br><br></br>
     <div id="topDiv">
     <table id='tableBottom'>
<tr>
    <th style={{position:'sticky'}} colSpan={14}>Cash InFlow</th>
  </tr>
        <tr>
          <th>.</th>
          <th>Particulars</th>
          <th>January</th>
          <th>February</th>
          <th>March</th>
          <th>April</th>
          <th>May</th>
          <th>June</th>
          <th>July</th>
          <th>August</th>
          <th>September</th>
          <th>October</th>
          <th>November</th>
          <th>December</th>
        </tr>
        {/* <div id="view"></div>
        <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={()=>closeModal()}>&times;</span>

        </div>
    </div>  */}
      </table>
      </div>   
      
      <div id="bottomDiv">
      <table id='tableTop'>
  <tr>
    <th style={{position:'sticky'}} colSpan={14}>Cash OutFlow</th>
  </tr>
        <tr>
          <th>.</th>
          <th>Particulars</th>
          <th>January</th>
          <th>February</th>
          <th>March</th>
          <th>April</th>
          <th>May</th>
          <th>June</th>
          <th>July</th>
          <th>August</th>
          <th>September</th>
          <th>October</th>
          <th>November</th>
          <th>December</th>
        </tr>
        {/* <div id="view"></div>
        <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={()=>closeModal()}>&times;</span>
          
        </div>
    </div>  */}
      </table>

      </div>   
        </center>
    </div>;
  }
  export default ThinkingVSexecution;