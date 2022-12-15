import { getScopedCssBaselineUtilityClass } from "@mui/material";
import React from "react";

function Real() {
  let i = 0;
  let inFlowRows = 0;
  let outFlowRows = 0;
  function postJson(api, json) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", api, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json));
    // var jsonObject = JSON.parse(xmlhttp.responseText);
    return xmlhttp.responseText;
  }
  function getJson(api) {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", api, false);
    xhReq.send(null);
    var jsonObject = JSON.parse(xhReq.responseText);
    return jsonObject;
  }
  let options = [
    { value: "-1", label: "2021" },
    { value: "0", label: "2022" },
    { value: "1", label: "2023" },
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let inFLow;
  let outFLow;
  let today = new Date();
  let thisYear = today.getFullYear();
  let displayArray = [];
  let columns = [];
  let inFlowGST = 0;
  let singleEntryReal = {
    amount: null,
    tds: null,
    gst: null,
    isPartial:null,
    cfo_id:null,
    month:String(today.getMonth()+1),
    year:String(today.getFullYear())
  };
  let toDBFC = {
    data: [],
  };
  for (let i = 0; i < 12; i++) {
    let j = today.getMonth();
    if (j - 10 + i > 11) {
      let month = j - 10 + i - 11;
      let year = thisYear + 1;
      columns.push(month + "" + year);
      displayArray.push(
        <th>{monthNames[j - 10 + i - 12] + "-" + Number(thisYear + 1)}</th>
      );
    } else if (j - 10 + i < 0) {
      let month = j - 10 + i + 11;
      let year = thisYear - 1;
      columns.push(month + "" + year);
      displayArray.push(
        <th>{monthNames[j - 10 + i + 12] + "-" + Number(thisYear - 1)}</th>
      );
    } else {
      let month = j - 10 + i + 1;
      let year = thisYear;
      columns.push(month + "" + year);
      displayArray.push(<th>{monthNames[j - 10 + i] + "-" + thisYear}</th>);
    }
  }

  function writeInFlow() {
    let table = document.getElementById("inFlow");
    for (let i = 0; i < inFLow.length; i++) {
      let row = table.insertRow();
      var checkBox = row.insertCell(0);
      checkBox.innerHTML = '<input class="selects" id="row" type="checkbox">';
      var particular = row.insertCell(1);
      particular.innerHTML = `<b>${inFLow[i].name}<b>`;
      let forecastData = inFLow[i].data.real;
      if (forecastData.length === 0) {
        for (let j = 2; j < 14; j++) {
          var temp = row.insertCell(j);
          temp.innerHTML = `<font color="grey">No Data</font>`;
        }
      } else {
        for (let j = 2; j < 14; j++) {
          var temp = row.insertCell(j);
          temp.innerHTML = `<font color="grey">No Data</font>`;
        }
        for (let k = 0; k < forecastData.length; k++) {
          let dataMonth = forecastData[k]._month;
          let dataYear = forecastData[k]._year;
          let check = dataMonth + "" + dataYear;

          for (let l = 0; l < columns.length; l++) {
            if (check == columns[l]) {
                
              let gopal = `<table>
            <tr>
                <td><font size="2.2px">${forecastData[k].amount}</font></td>
                <td><b><font size="2.2px" color="blue">${
                  forecastData[k].tds
                }</font></b></td>
                <td><b><font size="2.2px" color="red">${
                  forecastData[k].gst
                }</font></b></td>
            </tr>
            <tr>
                <td colspan="3"><b>${
                  forecastData[k].amount -
                  (forecastData[k].amount * forecastData[k].tds) / 100 +
                  (forecastData[k].amount * forecastData[k].gst) / 100
                }</b></td>
            </tr>
        </table>`;
              row.cells[l + 2].innerHTML = gopal;
              if(forecastData[k].status==1){
                    row.cells[l+2].style.backgroundColor = "white";
              }else{
                row.cells[l+2].style.backgroundColor = "yellow"
              }
              // `<font color="black">${forecastData[k].amount - forecastData[k].amount*(forecastData[k].tds)/100+ forecastData[k].amount*(forecastData[k].gst)/100}</font>`;
            }
          }
        }
      }
    }
    let row = table.insertRow();
    var checkBox = row.insertCell(0);
    var particular = row.insertCell(1);
    particular.innerHTML = `<b>Monthly GST Summary<b>`;
    for (let j = 2; j < 14; j++) {
      var temp = row.insertCell(j);
    }
    for (let i = 0; i < inFLow.length; i++) {
      let forecastData = inFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            // console.log(forecastData[k].gst);
            let previousValue = row.cells[l + 2].innerHTML;
            row.cells[l + 2].innerHTML = `${
              Number(previousValue) +
              Number(forecastData[k].amount * (forecastData[k].gst / 100))
            }`;
          }
        }
      }
    }
    let row1 = table.insertRow();
    row1.style.backgroundColor = "#d7d7d7";
    var checkBox = row1.insertCell(0);
    var particular = row1.insertCell(1);
    particular.innerHTML = `<b>Cash In-Flow<b>`;
    for (let j = 2; j < 14; j++) {
      var temp = row1.insertCell(j);
    }
    for (let i = 0; i < inFLow.length; i++) {
      let forecastData = inFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            // console.log(forecastData[k].gst);
            let previousValue = row1.cells[l + 2].innerHTML;
            row1.cells[l + 2].innerHTML = `${
              Number(previousValue) +
              Number(
                forecastData[k].amount -
                  (forecastData[k].amount * forecastData[k].tds) / 100 +
                  (forecastData[k].amount * forecastData[k].gst) / 100
              )
            }`;
          }
        }
      }
    }
  }
  function writeNetFlow() {
    let table = document.getElementById("netFlow");
    let inFlowtable = document.getElementById("inFlow");
    let outFlowtable = document.getElementById("outFlow");
    let outFlow = outFlowtable.rows[outFlowtable.rows.length - 1];
    let inFlow = inFlowtable.rows[inFlowtable.rows.length - 1];
    // console.log(inFlow.cells + "" + outFlow.cells);
    for (let i = 1; i < 13; i++) {
      let value =
        Number(inFlow.cells[i + 1].innerHTML) -
        Number(outFlow.cells[i + 1].innerHTML);
      table.rows[1].cells[i].innerHTML = `<b>${value}</b>`;
      if (value < 0) {
        table.rows[1].cells[i].style.color = "red";
      } else {
        table.rows[1].cells[i].style.color = "green";
      }
    }
  }
  function closeModal() {
    let array = document.getElementsByTagName("th");
    for (let i = 0; i < array.length; i++) {
      array[i].style.visibility = "visible";
    }
    document.getElementById("myModal").style.visibility = "hidden";
    document.getElementById("myModal").style.display = "none";
  }
  function openModal() {
    let array = document.getElementsByTagName("th");
    for (let i = 0; i < array.length; i++) {
      array[i].style.visibility = "hidden";
    }
    document.getElementById("myModal").style.visibility = "visible";
    document.getElementById("myModal").style.display = "block";
  }
  function submit() {
    let elementArray = [];
    let count = 0;
    let array = [];
    if(document.getElementById("flow").value=="in"){
        count = inFLow.length;
        array = inFLow;
    }else{
        count = outFLow.length;
        array = outFLow;
    }
    for (let j = 0; j < count; j++) {
        singleEntryReal.cfo_id = array[j].cfo_id;
        singleEntryReal.isPartial = document.getElementById("isPartial" + j).value;
        singleEntryReal.amount = document.getElementById("amount" + j).value;
        singleEntryReal.gst = document.getElementById("gst" + j).value;
        singleEntryReal.tds = document.getElementById("tds" + j).value;
        elementArray.push(JSON.parse(JSON.stringify(singleEntryReal)));
    }
    console.log(elementArray);
    toDBFC.data = elementArray;
    let okay = postJson("http://localhost:8080/postRealData", toDBFC);
    // window.location.reload(false);
    console.log(okay);
  }
  function form() {
    openModal();
    let left = i * 17;
    let content = document.getElementById("modalContent");
    content.innerHTML = `
                  <div id="selectWhichFlow">
                    <b>Select flow</b>
                    <select name="flow" id="flow">
                      <option value="">--Select Your Flow Direction--</option>
                      <option value="in">In-Flow</option>
                      <option value="out">Out-Flow</option>
                    </select>
                  </div>
                 
                  <h2>${monthNames[today.getMonth()] +"-"+ today.getFullYear()}</h2>
                  <div id="overallEntries" style="width:55%;padding:10px;height:30%;position:absolute">
                  </div>`;
                //   <div id="whichObject">
                //   <b>Select available objects</b>
                //   <select name="flow" id="object">
                //   </select>
                // </div>
    // var selectList = document.getElementById("object");
    // document.getElementById("whichObject").appendChild(selectList);
    let flow = document.getElementById("flow");
    // var option = document.createElement("option");
    // option.value = "";
    // option.text = "Select Your Object";
    // selectList.appendChild(option);
    flow.addEventListener("change", function () {
      let array;
      if (flow.value == "in") {
        array = inFLow;
      } else {
        array = outFLow;
      }
    //   if (selectList.length != 0) {
    //     for (let i = selectList.length; i >= 0; i--) {
    //       selectList.remove(i);
    //     }
    //   }
    //   for (var i = 0; i < array.length; i++) {
    //     var option = document.createElement("option");
    //     option.value = array[i].cfo_id;
    //     option.text = array[i].name;
    //     selectList.appendChild(option);
    //   }
      let allInFlow = array.length;
      let gopal;
      for(let s=0;s<array.length;s++){
        if(s==0){
            gopal = `<div id="entry${s}" style="width:14%;padding:10px;left:${s*17}%;display:inline;position:absolute"> 
            <h3>${array[s].name}</h3>
            <div id="entryType">
                <b>Entry Type</b>
                <select name="entryType" id="isPartial${s}">
                <option value="">--Select Entry Type--</option>
                <option value="0">Partial</option>
                <option value="1">Full</option>
                </select>
            </div>
          <input type="text" id="amount${s}" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
          <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
          <input type="text" id="tds${s}" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
          <input type="text" id="gst${s}" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
        </div>`
        }else{
            gopal = gopal + `<div id="entry${s}" style="width:14%;padding:10px;left:${s*17}%;display:inline;position:absolute"> 
            <h3>${array[s].name}</h3>
            <div id="entryType">
                <b>Entry Type</b>
                <select name="entryType" id="isPartial${s}">
                <option value="">--Select Entry Type--</option>
                <option value="0">Partial</option>
                <option value="1">Full</option>
                </select>
            </div>
          <input type="text" id="amount${s}" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
          <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
          <input type="text" id="tds${s}" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
          <input type="text" id="gst${s}" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
        </div>`
        }
       
      }
      document.getElementById('overallEntries').innerHTML = gopal;
    });
  }
  function writeOutFlow() {
    let table = document.getElementById("outFlow");
    for (let i = 0; i < outFLow.length; i++) {
      let row = table.insertRow();
      var checkBox = row.insertCell(0);
      checkBox.innerHTML = '<input class="selects" id="row" type="checkbox">';
      var particular = row.insertCell(1);
      particular.innerHTML = `<b>${outFLow[i].name}<b>`;
      let forecastData = outFLow[i].data.real;
      if (forecastData.length === 0) {
        for (let j = 2; j < 14; j++) {
          var temp = row.insertCell(j);
          temp.innerHTML = `<font color="grey">No Data</font>`;
        }
      } else {
        for (let j = 2; j < 14; j++) {
          var temp = row.insertCell(j);
          temp.innerHTML = `<font color="grey">No Data</font>`;
        }
        for (let k = 0; k < forecastData.length; k++) {
          let dataMonth = forecastData[k]._month;
          let dataYear = forecastData[k]._year;
          let check = dataMonth + "" + dataYear;

          for (let l = 0; l < columns.length; l++) {
            if (check == columns[l]) {
              let gopal = `<table>
              <tr>
                  <td><font size="2.2px">${forecastData[k].amount}</font></td>
                  <td><b><font size="2.2px" color="blue">${
                    forecastData[k].tds
                  }</font></b></td>
                  <td><b><font size="2.2px" color="red">${
                    forecastData[k].gst
                  }</font></b></td>
              </tr>
              <tr>
                  <td colspan="3"><b>${
                    forecastData[k].amount -
                    (forecastData[k].amount * forecastData[k].tds) / 100 +
                    (forecastData[k].amount * forecastData[k].gst) / 100
                  }</b></td>
              </tr>
          </table>`;
              row.cells[l + 2].innerHTML = gopal;
              if(forecastData[k].status==1){
                    row.cells[l+2].style.backgroundColor = "white";
              }else{
                row.cells[l+2].style.backgroundColor = "yellow"
              }
              // `<font color="black">${forecastData[k].amount - forecastData[k].amount*(forecastData[k].tds)/100+ forecastData[k].amount*(forecastData[k].gst)/100}</font>`;
            }
          }
        }
      }
    }
    let row = table.insertRow();
    var checkBox = row.insertCell(0);
    var particular = row.insertCell(1);
    particular.innerHTML = `<b>GST Payment<b>`;
    for (let j = 2; j < 14; j++) {
      var temp = row.insertCell(j);
    }
    for (let i = 0; i < inFLow.length; i++) {
      let forecastData = inFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l <= columns.length; l++) {
          if (check == columns[l]) {
            if (l != 11) {
              let previousValue = row.cells[l + 3].innerHTML;
              row.cells[l + 3].innerHTML = `${
                Number(previousValue) +
                Number(forecastData[k].amount * (forecastData[k].gst / 100))
              }`;
            }else{
              // console.log(columns[0]);
              // console.log(JSON.stringify(forecastData));
              forecastData.map((obj)=>{
                let month = obj._month+1;
                let year = obj._year;
                if(month+""+year == columns[0]){
                //   console.log('true');
                //   console.log(obj);
                  let previousValue = row.cells[2].innerHTML;
                  row.cells[2].innerHTML = `${
                    Number(previousValue) +
                    Number(obj.amount * (obj.gst / 100))
                  }`;
                } 
              })
              
            }
          }
        }
      }
    }
    let row2 = table.insertRow();
    // row2.style.backgroundColor='#d7d7d7' ;
    var checkBox = row2.insertCell(0);
    var particular = row2.insertCell(1);
    particular.innerHTML = `<b>TDS Payment<b>`;
    for (let j = 2; j < 14; j++) {
      var temp = row2.insertCell(j);
    }
    for (let i = 0; i < outFLow.length; i++) {
      let forecastData = outFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            // console.log(forecastData[k].gst);
            let previousValue = row2.cells[l + 2].innerHTML;
            row2.cells[l + 2].innerHTML = `${
              Number(previousValue) +
              Number((forecastData[k].amount * forecastData[k].tds) / 100)
            }`;
          }
        }
      }
    }
    let row1 = table.insertRow();
    row1.style.backgroundColor = "#d7d7d7";
    var checkBox = row1.insertCell(0);
    var particular = row1.insertCell(1);
    particular.innerHTML = `<b>Cash Out-Flow<b>`;
    for (let j = 2; j < 14; j++) {
      var temp = row1.insertCell(j);
    }
    for (let i = 0; i < outFLow.length; i++) {
      let forecastData = outFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            // console.log(forecastData[k].gst);
            let previousValue = row1.cells[l + 2].innerHTML;
            row1.cells[l + 2].innerHTML = `${
              Number(previousValue) +
              Number(
                forecastData[k].amount -
                  (forecastData[k].amount * forecastData[k].tds) / 100 +
                  (forecastData[k].amount * forecastData[k].gst) / 100
              )
            }`;
          }
        }
      }
    }
  }
  try {
    inFLow = getJson("http://localhost:8080/in");
    outFLow = getJson("http://localhost:8080/out");
  } catch {
    return (
      <>
        <center>
          <br></br>
          <h1>Java Service Down, Please make sure it is running</h1>
        </center>
      </>
    );
  }

  // useEffect(() => {
  //   console.log("Hello");
  // }, []);
  return (
    <div>
      <script></script>
      <center>
        <br></br>
        <button
          onClick={() => {
            writeInFlow();
            writeOutFlow();
            writeNetFlow();
          }}
        >
          Populate
        </button>
        {/* <button
          onClick={() => {
            openModal();
          }}
        >
          Open Popup
        </button> */}
        <button
          onClick={() => {
            form();
          }}
        >
          Enter current month data
        </button>
        <button>Create new cfo</button>
        <div id="topDiv">
          <table id="inFlow">
            <tr>
              <th colSpan={14}>Cash InFlow</th>
            </tr>
            <tr>
              <th>.</th>
              <th>Particulars</th>
              {displayArray}
            </tr>
          </table>
        </div>
        <div id="bottomDiv">
          <table id="outFlow">
            <tr>
              <th colSpan={14}>Cash OutFlow</th>
            </tr>
            <tr>
              <th>.</th>
              <th>Particulars</th>
              {displayArray}
            </tr>
          </table>
        </div>
      </center>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => closeModal()}>
            &times;
          </span>
          <div id="modalContent"></div>
          <br></br>


          <button
            style={{ position: "absolute", bottom: "300px" }}
            onClick={() => {
              submit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div id="lowestDiv">
        <table id="netFlow" >
          <tr>
            <th>.</th>
            {displayArray}
          </tr>
          <tr>
            <td>NetFlow</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Real;