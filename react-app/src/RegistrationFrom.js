import React, { useState } from 'react';
import './RegistrationForm.css';
let api = [
'http://10.100.12.211:9001/country',
'http://10.100.12.211:9001/collects',
'http://10.100.12.211:9001/questions',
'http://10.100.12.211:9001/geoExceptionCategories',
'http://10.100.12.211:9001/parentquestion',
'http://10.100.12.211:9001/geoforCountryandCategory',
'http://10.100.12.211:9001/domains',
'http://10.100.12.211:9001/companysizes',
'http://10.100.12.211:9001/companytypes',
'http://10.100.12.211:9001/employeesizes',
'http://10.100.12.211:9001/getMetadata',
'http://10.100.12.211:9001/country',
'http://10.100.12.211:9001/geo',
'http://10.100.12.211:9001/domain',
'http://10.100.12.211:9001/companysize',
'http://10.100.12.211:9001/companytype'
        ];
let initial_metadata = {
    "country_id":null,
    "geo_level_1":null,
    "geo_level_2":null,
    "geo_level_3":null,
    "domain_id":null,
    "company_size_id":null,
    "company_type_id":null,
    "employee_strength_id":null
}



function RegistrationForm(){
    let stop;
    let i = 0;
    let raw;
    let countryQuestions;
    let questionJson;
    let metadata;
    let geo_level_1 = {};
    let answerJson = {};
    let domains = {};
    let company_size = {};
    let company_type = {};
    let employee_size = {};
    let error = false;
    let meta = [];
    function popup(header,message){
        let headerText = '<p><font style="color:red;font-size: 30px;font-family: "Montserrat", sans-serif;font-weight: bolder;">'+header+'</font></p>';
        let messageText = '<p><font style="color:black;font-size: 15px;font-family: "Montserrat", sans-serif;font-weight: regular;">'+message+'</font></p>';
        document.getElementById('pop').innerHTML=headerText+messageText;
        document.getElementById("myModal").style.display = "block";
    }
    
    function closeModal(){
        var modal = document.getElementById("myModal");
        modal.style.display = "none"
    }
    function getAndChange(api){
        let initial_metadata = 'Hello';
        fetch(api)
            .then((res) => res.json())
            .then(function(json){
               setValues(json);
            });
    }
    
    function setNextQuestion(question,metaId,values){
        setQuestion(question);
        setMetaId(metaId);
        clearOptions();
        setValues(values);
    }
    
    function clearOptions(){
        var length = document.getElementById('answer').options.length;
        for(var j=0;j<length;j++){
            document.getElementById('answer').options.remove(0);
        }
    }
    
    function setValues(Json){
        Json.map((obj) => {
            var option = document.createElement("option");
            option.value = obj.id;
            option.text = obj.value;
            document.getElementById('answer').add(option);
            })
    }

    function setNValues(Json){
        var empty = document.createElement("option");
        empty.value = "";
        empty.text = "--Select--"
        document.getElementById('answer').add(empty);
        Json.map((obj) => {
            var option = document.createElement("option");
            option.value = obj.id;
            option.text = obj.object_value;
            document.getElementById('answer').add(option);
            })
    }

    function setExValues(Json){
        var empty = document.createElement("option");
        empty.value = "";
        empty.text = "--Select--"
        document.getElementById('answer').add(empty);
        Json.map((obj) => {
            var option = document.createElement("option");
            option.value = obj.id;
            option.text = obj.object_value;
            document.getElementById('answer').add(option);
            })
    }

    function setGeValues(Json){
        var empty = document.createElement("option");
        empty.value = "";
        empty.text = "--Select--"
        document.getElementById('answer').add(empty);
        Json.map((obj) => {
            var option = document.createElement("option");
            option.value = obj.geo_id;
            option.text = obj.geo_name;
            document.getElementById('answer').add(option);
            })
    }
    
    function setMetaId(Fname){
        document.getElementById('answer').name = Fname;
    }
    
    function setQuestion(question){
        document.getElementById('question').innerHTML = question;
    }
    
    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    function getJson(api) {
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", api, false);
        xhReq.send(null);
        var jsonObject = JSON.parse(xhReq.responseText);
        return jsonObject;
    }

    function getString(api) {
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", api, false);
        xhReq.send(null);
        var jsonObject = xhReq.responseText;
        return jsonObject;
    }

    function postJson(api,json) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", api, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(json));
        var jsonObject = JSON.parse(xmlhttp.responseText);
        return jsonObject;
    }
    function submit(){
        alert('Form Submitted, wait until we fetch your rules');
    }
    function reset(){
        window.location.reload();
    }
    const next=()=>{
        
        var key = document.getElementById('answer').name;
        var value = document.getElementById('answer').value;
        console.log(key + " " + value);
        if(i==0){
            if(key=="country_id"){
                raw =  postJson(api[1],Number(value));
                console.log(raw);
                countryQuestions = raw[1];
                if(countryQuestions.length==0){
                    popup("Country not covered","Please inform officials at DZPLIN for coverage");
                    error = true;
                    let game = document.getElementById('myModal').style.display;
                    if(game!='block'){
                        stop = true;
                        window.location.reload();
                    }
                    
                }else{
                    error = false;
                    let gopal = raw[7];
                    metadata = postJson(api[10],gopal[0]);
                    // console.log(metadata)
                    questionJson = postJson(api[2],countryQuestions);
                }
                
            }
           
        }
        
        if(!value){
            popup("Invalid Selection","Please select an option of your choice");
        }
        else if(key=="geo_category_id"){
            answerJson.map((obj)=>{
                if(obj.id==value){
                    let question = getJson(api[4]+'/'+value);
                    let met = {country_id:Number(initial_metadata['country_id']),geo_category_id:Number(value)};
                    geo_level_1 = postJson(api[5],met);
                    setQuestion(question.object_value);
                    setMetaId(metadata[i+2]);
                    clearOptions();
                    setGeValues(geo_level_1);
                    i++;
                }
            })
        }
        else{
            if(!stop&&!error){
                initial_metadata[key]=value;
                var num = countryQuestions[i] -1;
                var numOfQuestions = countryQuestions.length;
                if(i>numOfQuestions-1){
                    let toShow;
                    toShow = "" + "<p><label>Selected Country - </label><b>"+getString(api[11]+'/'+initial_metadata['country_id'])+"</b></p>";
                    let temp=0;
                    console.log(temp++);
                    toShow = toShow + "<p><label>Selected Geo-Level_1- </label><b>"+getString(api[12]+'/'+initial_metadata['geo_level_1'])+"</b></p>";
                    console.log(temp++);
                    if(initial_metadata['geo_level_2']!=null){
                        toShow = toShow + "<p><label>Selected Geo-Level_2- </label><b>"+getString(api[12]+'/'+initial_metadata['geo_level_2'])+"</b></p>";
                    }
                    toShow = toShow + "<p><label>Selected Domain- </label><b>"+getJson(api[13]+'/'+initial_metadata['domain_id']).object_value+"</b></p>";
                    console.log(temp++);
                    toShow = toShow + "<p><label>Selected Company Size- </label><b>"+getJson(api[14]+'/'+initial_metadata['company_size_id']).object_value+"</b></p>";
                    console.log(temp++);
                    toShow = toShow + "<p><label>Selected Company Type- </label><b>"+getJson(api[15]+'/'+initial_metadata['company_type_id']).object_value+"</b></p>";
                    console.log(temp++);
                    toShow = toShow + "<p><label>Entered Employee Strength- </label><b>"+initial_metadata['employee_strength_id']+"</b></p>";
                    document.getElementById('questionObject').innerHTML = toShow;
                    document.getElementById('header').innerHTML = "You are almost done!<br><font color='black'>Verify the form before submission</font>";
                    document.getElementById('header').style.color = "grey";
                    document.getElementById('next').style.visibility = "hidden";
                    document.getElementById('next').style.display = "none";
                    document.getElementById('reset').style.visibility = "visible";
                    document.getElementById('reset').innerHTML = "Start filling again";
                    document.getElementById('submit').style.visibility = "visible";
                    document.getElementById('submit').style.display = "inline-block";
                    i = 0;
                    return false;
                }
                
                if(num+1==10){
                    answerJson = postJson(api[3],initial_metadata['country_id']);
                    meta.push(answerJson);
                    setQuestion(questionJson[i].object_value);
                    setMetaId('geo_category_id');
                    clearOptions();
                    setExValues(answerJson);
                    i--;
                }else{
                    
                    if(metadata[i+2]=="employee_strength_id"){
                        setQuestion(questionJson[i].object_value);
                        document.getElementById('ans').innerHTML = '<input name="employee_strength_id" type ="text" id="answer" placeholder="No of employees" required/><br>'
                    }else if(metadata[i+2]=="domain_id"){
                        domains = postJson(api[6],raw[3]);
                        meta.push(domains); 
                        company_type = postJson(api[8],raw[5]);
                        meta.push(company_type);
                        company_size = postJson(api[7],raw[4]);
                        meta.push(company_size);
                        console.log("Setting "+metadata[i+2]);
                        console.log(i+" "+meta[i-1])
                        setQuestion(questionJson[i].object_value);
                        setMetaId(metadata[i+2]);
                        clearOptions();
                        setNValues(meta[i]);
                    }else if(metadata[i+2]=="geo_level_2"){
                        let json = getJson(api[12]+'/'+initial_metadata['country_id']+'/'+initial_metadata['geo_level_1']);
                        console.log(json);
                        meta.push(json);
                        console.log("Setting "+metadata[i+2]);
                        console.log(i+" "+meta[i-1])
                        setQuestion(questionJson[i].object_value);
                        setMetaId(metadata[i+2]);
                        clearOptions();
                        setGeValues(meta[i]);
                    }
                    else{
                        console.log("Setting "+metadata[i+2]);
                        console.log(i+" "+meta[i-1])
                        setQuestion(questionJson[i].object_value);
                        setMetaId(metadata[i+2]);
                        clearOptions();
                        setNValues(meta[i]);
                    }
                }
                i++;
            } 
        }
    }
    function postROPC(api,json) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", api, false);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlhttp.send(JSON.stringify(json));
        var jsonObject = JSON.parse(xmlhttp.responseText);
        return jsonObject;
    }
    function gixt(){
        console.log('inside gixt');
        let URL = 'https://login.microsoftonline.com/f73264f6-5797-4035-9dbd-5803190f1a70/oauth2/v2.0/token';
        var details = {
            'client_id': '0990b18a-4ad0-44ef-a842-1d0b7083cc79',
            'scope': 'user.read openid profile offline_access',
            'client_secret': '8Mi8Q~z8e-BEdpLVJiEzSJr0EfFrr3OFn9F~HcMs',
            'username':'johnson.j@archimedis.io',
            'password':'prkstr@9112',
            'grant_type':'password'
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(postROPC(URL,formBody));
    }
    
    return  <div id="RegistrationFormContainer"><div id="inner"><h1 id="header">Please Register</h1>
    
    <br></br>
    <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={()=>closeModal()}>&times;</span>
          <p id="pop">Some text in the Modal..</p>
        </div>
    </div> 
    <div id = "questionObject">
    <label id= "question">Select Your Country</label><br></br>
    <br></br><div id="ans">
    <select id="answer" name="country_id" required>
        <option value="">--Select--</option>
    {
        getAndChange(api[0])
    }
    </select> 
    <p id="log"></p></div>
    </div>
    <button id="reset" class="button-3" onClick={()=>reset()} >Reset</button>&emsp;
    <button id="submit" class="button-3" onClick={()=>submit()}>Final Submit</button>
    <button id="next" class="button-3" onClick={()=>next()}>Next</button>
    <button onclick={()=>gixt()}>Check</button>
    </div>
    </div>;
}
export default RegistrationForm;
