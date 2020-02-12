function myFunction() {
    let firstname=   document.myForm.fname.value;
    let lastname = document.myForm.lname.value;
    let emails = document.myForm.email.value;
    let phonenum = document.myForm.pnum.value;
     if (firstname == "")                                  
     { 
         alert("You have to enter your Firstname."); 
         document.getElementById("fname").focus(); 
         return false;
     } 
     
     if (lastname == "")                                  
     { 
         alert("You have to enter your Lastname."); 
         document.getElementById("lname").focus(); 
         return false;
     } 
    if(emails =="" )
    {
        alert("You have to enter your Lastname.");
        document.getElementById("email").focus();
        return false;
    }
   
 //    if(validateEmail(email) == false )
 //    {
 //        alert("Invalid email");
 //        document.getElementById("email").focus();
 //        return false;
 //    }
 
    if(phonenum  =="")
    {
        alert("You have to enter your Phone Number");
        document.getElementById("numphone").focus();
        return false;
    }
  validateForm();
 
 }
 
 
 
 function validateEmail(email) {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
 }
 
 
 function validateForm() {
     var radios = document.getElementsByName("gen");
     var formValid = false;
 
     var i = 0;
     while (!formValid && i < radios.length) {
         if (radios[i].checked) formValid = true;
         i++;        
     }
 
     if (!formValid) {
         alert("Please choose your gender");
     return formValid;
     }
     
 }
let  firebaseConfig = {
    apiKey: "AIzaSyAeDUEp6XR6AQ_doHKECf4T9VvqWotiPag",
    authDomain: "phark-5e421.firebaseapp.com",
    databaseURL: "https://phark-5e421.firebaseio.com",
    projectId: "phark-5e421",
    storageBucket: "phark-5e421.appspot.com",
    messagingSenderId: "218400507091",
    appId: "1:218400507091:web:faba5ba2317c891e594026",
    measurementId: "G-RTESDLLV12"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$('#pass').click(() => {

    db.collection("Contact")
    .add({
        Firstname: $('#Firstname').val(),
        Gender: $("[type='radio']:checked").val(),
        Email: $('#Email').val(),
        // Blur_Email: letter,
        Detail: $('#Detail').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#Firstname').val(''),
        $('#Email').val(''),
        $('#Detail').val('')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
})

$('#reset').click(() => {
        $('#Firstname').val(''),
        $('#Email').val(''),
        $('#Detail').val('')
});
    

db.collection('Contact').orderBy("Firstname").onSnapshot(doc =>{
    let table = $('tbody')[0]
    document.querySelectorAll("tbody tr").forEach(item => item.remove())
    var male = 0;
    var female = 0;
    var other = 0;
    doc.forEach(item => {
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let thridCell = row.insertCell(1)
        let forthCell = row.insertCell(2)
        let fifthCell = row.insertCell(3)

        if (item.data().Gender == "Male") {male++;} else if(item.data().Gender == "Female") {female++; } else {other++;}

        let letter = item.data().Email;
        let letter_buff = letter[0];
        for (let index = 1 ; index < letter.length ; index++) {
        if (letter[index] == "@" || letter[index] == ".") {
            letter_buff += letter[index]
        }else{
            letter_buff +=  "x";
        }
        1
        }

        firstCell.textContent = item.data().Firstname
        thridCell.textContent = item.data().Gender
        forthCell.textContent = letter_buff
        fifthCell.textContent = item.data().Detail

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
      
        function drawChart() {
                var data = google.visualization.arrayToDataTable([
                  ['Task', 'All Time'],
                  ['Male',male],
                  ['Female',female],
                  ['Others',other],
                ]);
        
                var options = {
                  title: '',
                  titleTextStyle: {},
                  colors:['#EC02FF','#3055FF','#7EE182'] ,
                  pieHole: 0.5,
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('Piechart'))
                chart.draw(data, options);
              };
                
            })
});


// if (firstname == "")                                  
// { 
//     alert("You have to enter your Firstname."); 
//     document.getElementById("fname").focus(); 
//     return false;
// } 

// if (lastname == "")                                  
// { 
//     alert("You have to enter your Lastname."); 
//     document.getElementById("lname").focus(); 
//     return false;
// } 
// if (male == ""&&female=="")                                  
// { 
//     alert("You have to select your gender."); 
//     document.getElementById("lname").focus(); 
//     return false;
// } 
// if(emails =="" )
// {
//    alert("You have to enter your email.");
//    document.getElementById("email").focus();
//    return false;
// }


//  validation=()=>{
//     if(firstname.value === '' || lastname.value === ''||email.value===''||massage==='') 
//        return false;
//        else return true;

//  }

 function validation(){

    var email = $('#email').val();
    var mailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if($('#message').val() == undefined){
    //     alert('Please write down your message!!');
    //     $('#message').focus();
    //     return false;
    // }
    if(!mailPattern.test(String(email).toLowerCase())){
        alert('Please Check Your Email!!');
        $('#email').focus();
        return false;
    }
    return true;
}
function reset(e){
    e.preventDefault();
    document.getElementById("mainform").reset();
}

// function reset(){
//     document.getElementById("mainform").reset();
// }
// console.log('validation');

// let validate = ()=>{
//     console.log('VALIDATE!!!');

//     let fname = document.myform.fname.value;
//     let lname = document.myform.lname.value;
//     let email = document.myform.email.value;

//     if(fname === ''){
//         alert('Please input your name!!');
//         document.myform.name.focus();
//         return false;
//     }
//     if(lname === ''){
//         alert('Please input your name!!');
//         document.myform.name.focus();
//         return false;
//     }
//     if(email === '' || !validateEmail(email)){
//         alert('Please input your email!!');
//         document.myform.email.focus();
//         return false;
//     }


//     return true;
// }

// let validateEmail = (email) => {
//     atpos = email.indexOf('@');
//     dotpos = email.lastIndexOf('.');

//     if(atpos<1 || (dotpos-atpos)<2){
//         alert('Please enter valid Email!!!');
//         document.myform.email.focus();
//         return false;
//     }

// }
