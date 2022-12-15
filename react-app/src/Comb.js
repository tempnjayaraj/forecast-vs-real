import React from "react";

function Comb() {
  let i = 0;
  let inFlowRows = 0;
  let outFlowRows = 0;
  function newCFO() {
    openModal();
    let left = i * 17;
    let content = document.getElementById("modalContent");
    content.innerHTML = `
    <h2>New CFO Creation</h2>
                  <div id="selectWhichFlow">
                    <b>Select flow</b>
                    <select name="flow" id="flow">
                      <option value="">--Select Your Flow Direction--</option>
                      <option value="in">In-Flow</option>
                      <option value="out">Out-Flow</option>
                    </select>
                  </div>
                  CFO Name  : <input type="text" id="newCFO" placeholder="CFO Name"/>
                  `;
    var selectList = document.getElementById("object");
    document.getElementById("whichObject").appendChild(selectList);
    let flow = document.getElementById("flow");
    var option = document.createElement("option");
    option.value = "";
    option.text = "Select Your Object";
    selectList.appendChild(option);
    flow.addEventListener("change", function () {
      let array;
      if (flow.value == "in") {
        array = inFLow;
      } else {
        array = outFLow;
      }
      if (selectList.length != 0) {
        for (let i = selectList.length; i >= 0; i--) {
          selectList.remove(i);
        }
      }
      for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i].cfo_id;
        option.text = array[i].name;
        selectList.appendChild(option);
      }
    });
  }
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
  let singleEntryFC = {
    amount: null,
    tds: null,
    gst: null,
  };
  let newCFObject = {
    isInFlow: null,
    cfo_name: null,
  };
  for (let i = 0; i < 12; i++) {
    let j = today.getMonth();
    if (j - 5 + i > 11) {
      let month = j - 5 + i - 11;
      let year = thisYear + 1;
      columns.push(month + "" + year);
      displayArray.push(
        <th>{monthNames[j - 5 + i - 12] + "-" + Number(thisYear + 1)}</th>
      );
    } else if (j - 5 + i < 0) {
      let month = j - 5 + i + 11;
      let year = thisYear - 1;
      columns.push(month + "" + year);
      displayArray.push(
        <th>{monthNames[j - 5 + i + 12] + "-" + Number(thisYear - 1)}</th>
      );
    } else {
      let month = j - 5 + i + 1;
      let year = thisYear;
      columns.push(month + "" + year);
      displayArray.push(<th>{monthNames[j - 5 + i] + "-" + thisYear}</th>);
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
      let forecastData = inFLow[i].data.forecast;
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
              // `<font color="black">${forecastData[k].amount - forecastData[k].amount*(forecastData[k].tds)/100+ forecastData[k].amount*(forecastData[k].gst)/100}</font>`;
            }
          }
        }
      }

      forecastData = inFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            //   if (!forecastData[k].amount) {
            let gopal = `<table>
                    <tr>
                        <td><font size="2.2px">${
                          forecastData[k].amount
                        }</font></td>
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
            if (forecastData[k].status == 1) {
              row.cells[l + 2].style.backgroundColor = "white";
            } else {
              row.cells[l + 2].style.backgroundColor = "#ffc9bb";
            }
            //   }
            // `<font color="black">${forecastData[k].amount - forecastData[k].amount*(forecastData[k].tds)/100+ forecastData[k].amount*(forecastData[k].gst)/100}</font>`;
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
      let forecastData = inFLow[i].data.forecast;
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
      forecastData = inFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            let previousValue = row.cells[l + 2].innerHTML;
            console.log(forecastData[k]);
            let month = forecastData[k]._month;
            let year = forecastData[k]._year;
            // let curID = inFLow[i].cfo_id;
            let forecastgst;
            let forecastamount;
            let forecasttds;

            inFLow[i].data.forecast.map((inObj) => {
              if (inObj._month == month && inObj._year == year) {
                forecastgst = inObj.gst;
                forecastamount = inObj.amount;
                forecasttds = inObj.tds;
                console.log(forecastgst + forecastamount + forecasttds);
                row.cells[l + 2].innerHTML = `${
                  Number(previousValue) +
                  Number(forecastData[k].amount * (forecastData[k].gst / 100)) -
                  Number(forecastamount * (forecastgst / 100))
                }`;
              }
            });
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
      let forecastData = inFLow[i].data.forecast;
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
      forecastData = inFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            let previousValue = row1.cells[l + 2].innerHTML;
            console.log(forecastData[k]);
            let month = forecastData[k]._month;
            let year = forecastData[k]._year;
            // let curID = inFLow[i].cfo_id;
            let forecastgst;
            let forecastamount;
            let forecasttds;

            inFLow[i].data.forecast.map((inObj) => {
              if (inObj._month == month && inObj._year == year) {
                forecastgst = inObj.gst;
                forecastamount = inObj.amount;
                forecasttds = inObj.tds;
                console.log(forecastgst + forecastamount + forecasttds);
                row1.cells[l + 2].innerHTML = `${
                  Number(previousValue) +
                  Number(
                    forecastData[k].amount -
                      (forecastData[k].amount * forecastData[k].tds) / 100 +
                      (forecastData[k].amount * forecastData[k].gst) / 100
                  ) -
                  Number(
                    forecastamount -
                      (forecastamount * forecasttds) / 100 +
                      (forecastamount * forecastgst) / 100
                  )
                }`;
              }
            });
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
    console.log(inFlow.cells + "" + outFlow.cells);
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
    newCFObject.isInFlow =
      document.getElementById("flow").value == "in" ? true : false;
      newCFObject.cfo_name = document.getElementById("newCFO").value;
    let okay = postJson("http://localhost:8080/postForeCastData", newCFObject);
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
                  <div id="whichObject">
                    <b>Select available objects</b>
                    <select name="flow" id="object">
                    </select>
                  </div>
                  <div id="entryType">
                    <b>Select entry</b>
                    <select name="entryType" id="entry">
                      <option value="">--Select Entry Type--</option>
                      <option value="fore">Forecast</option>
                      <option value="real">Real-Time</option>
                    </select>
                  </div>
                  Year:<select name="year" id="year">
                  <option value="">--Select Year--</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
                  <div id="overallEntries" style="width:55%;padding:10px;height:30%;position:absolute">
                    <div id="entry${i}" style="width:14%;padding:10px;left:0%;display:inline;position:absolute"> 
                      <h2>January</h2>
                      <input type="text" id="amount0" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds0" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst0" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;left:17%;display:inline;position:absolute"> 
                      <h2>February</h2>
                      <input type="text" id="amount1" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds1" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst1" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;left:34%;display:inline;position:absolute"> 
                      <h2>March</h2>
                      <input type="text" id="amount2" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds2" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst2" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;left:51%;display:inline;position:absolute"> 
                      <h2>April</h2>
                      <input type="text" id="amount3" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds3" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst3" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;left:68%;display:inline;position:absolute"> 
                      <h2>May</h2>
                      <input type="text" id="amount4" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds4" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst4" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;left:85%;display:inline;position:absolute"> 
                      <h2>June</h2>
                      <input type="text" id="amount5" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds5" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst5" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;top:60%;left:0%;display:inline;position:absolute"> 
                      <h2>July</h2>
                      <input type="text" id="amount6" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds6" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst6" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;top:60%;left:17%;display:inline;position:absolute"> 
                      <h2>August</h2>
                      <input type="text" id="amount7" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds7" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst7" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;top:60%;left:34%;display:inline;position:absolute"> 
                      <h2>September</h2>
                      <input type="text" id="amount8" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds8" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst8" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;top:60%;left:51%;display:inline;position:absolute"> 
                      <h2>October</h2>
                      <input type="text" id="amount9" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds9" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst9" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;top:60%;left:68%;display:inline;position:absolute"> 
                      <h2>November</h2>
                      <input type="text" id="amount10" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds10" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst10" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                    <div id="entry${i}" style="width:14%;padding:10px;top:60%;left:85%;display:inline;position:absolute"> 
                      <h2>December</h2>
                      <input type="text" id="amount11" size="7" maxlength = "7" style="width:100%;padding:10px;" placeholder="Amount"/><br>
                      <!-- &nbsp GST  &nbsp &nbsp &nbsp &nbsp &nbsp TDS-->
                      <input type="text" id="tds11" size="2" maxlength = "2" style="padding:10px;width:40%" placeholder="TDS" /> &nbsp &nbsp
                      <input type="text" id="gst11" size="2" maxlength = "2" style="padding:10px;width:40%;display:inline"  placeholder="GST" />
                    </div>
                 </div>`;
    var selectList = document.getElementById("object");
    document.getElementById("whichObject").appendChild(selectList);
    let flow = document.getElementById("flow");
    var option = document.createElement("option");
    option.value = "";
    option.text = "Select Your Object";
    selectList.appendChild(option);
    flow.addEventListener("change", function () {
      let array;
      if (flow.value == "in") {
        array = inFLow;
      } else {
        array = outFLow;
      }
      if (selectList.length != 0) {
        for (let i = selectList.length; i >= 0; i--) {
          selectList.remove(i);
        }
      }
      for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i].cfo_id;
        option.text = array[i].name;
        selectList.appendChild(option);
      }
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
      let forecastData = outFLow[i].data.forecast;
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
              // `<font color="black">${forecastData[k].amount - forecastData[k].amount*(forecastData[k].tds)/100+ forecastData[k].amount*(forecastData[k].gst)/100}</font>`;
            }
          }
        }
      }
      forecastData = outFLow[i].data.real;
      for (let k = 0; k < forecastData.length; k++) {
        let dataMonth = forecastData[k]._month;
        let dataYear = forecastData[k]._year;
        let check = dataMonth + "" + dataYear;

        for (let l = 0; l < columns.length; l++) {
          if (check == columns[l]) {
            //   if (!forecastData[k].amount) {
            let gopal = `<table>
                    <tr>
                        <td><font size="2.2px">${
                          forecastData[k].amount
                        }</font></td>
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
            if (forecastData[k].status == 1) {
              row.cells[l + 2].style.backgroundColor = "white";
            } else {
              row.cells[l + 2].style.backgroundColor = "#ffc9bb";
            }
            //   }
            // `<font color="black">${forecastData[k].amount - forecastData[k].amount*(forecastData[k].tds)/100+ forecastData[k].amount*(forecastData[k].gst)/100}</font>`;
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
      let forecastData = inFLow[i].data.forecast;
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
            } else {
              // console.log(columns[0]);
              // console.log(JSON.stringify(forecastData));
              forecastData.map((obj) => {
                let month = obj._month + 1;
                let year = obj._year;
                if (month + "" + year == columns[0]) {
                  console.log("true");
                  console.log(obj);
                  let previousValue = row.cells[2].innerHTML;
                  row.cells[2].innerHTML = `${
                    Number(previousValue) + Number(obj.amount * (obj.gst / 100))
                  }`;
                }
              });
            }
          }
        }
      }
      forecastData = inFLow[i].data.real;
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
            } else {
              forecastData.map((obj) => {
                let month = obj._month + 1;
                let year = obj._year;
                if (month + "" + year == columns[0]) {
                  console.log("true");
                  console.log(obj);
                  let previousValue = row.cells[2].innerHTML;
                  row.cells[2].innerHTML = `${
                    Number(previousValue) + Number(obj.amount * (obj.gst / 100))
                  }`;
                }
              });
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
      let forecastData = outFLow[i].data.forecast;
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
      forecastData = outFLow[i].data.real;
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
      let forecastData = outFLow[i].data.forecast;
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
      forecastData = outFLow[i].data.real;
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
        {/* <button
          onClick={() => {
            form();
          }}
        >
          Enter data for existing cfo
        </button> */}
        <button
          onClick={() => {
            newCFO();
          }}
        >
          Create new cfo
        </button>
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
            Create CFO
          </button>
        </div>
      </div>
      <div id="lowestDiv">
        <table id="netFlow">
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

export default Comb;
