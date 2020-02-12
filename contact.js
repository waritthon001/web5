let firebaseConfig = {
    apiKey: "AIzaSyDLwV2W7YlQHep7rzNiIPk-_aixvwrX5a4",
    authDomain: "localhost",
    projectId: "tenshiro-cac08",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();


const firstname = document.querySelector('#fname');
const lastname = document.querySelector('#lname');
const male = document.querySelector('#male').value;
const female = document.querySelector('#female'.value);
const email = document.querySelector('#email');
const massage = document.querySelector('#massage');
const submit = document.querySelector('#submit');
const deleted = document.querySelector('#delete');


$('#submit').click((e) => {
    e.preventDefault();
    if (validate()) {
        db.collection("users").add({
                firstname: $('#fname').val(),
                lastname: $('#lname').val(),
                gender : $("input[name='gender']:checked").val(),
                email: $('#email').val(),
                massage: $('#massage').val(),

            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                $('#fname').val(' ')
                $('#lname').val(' ')
                $("input[name='gender']:checked").val(' ')
                $('male').val(' ')
                $('female').val(' ')
                $('#email').val(' ')
                $('#massage').val(' ')
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }


    // }

});

$('#delete').click(() => {
    document.getElementById("myform").reset();
});


db.collection("users").onSnapshot(doc => {

    let table = $('tbody')[0]
    $("tbody tr").remove();
    let m = 0;
    let fe = 0;

    doc.forEach(item => {
        // data.push(item.data());

        let row = table.insertRow(-1)
        let firstcell = row.insertCell(0)
        let secondcell = row.insertCell(1)
        let thirdcell = row.insertCell(2)
        let fourthcell = row.insertCell(3)
        let fifthcell = row.insertCell(4)
        firstcell.textContent = item.data().firstname
        secondcell.textContent = item.data().lastname
        thirdcell.textContent = item.data().gender
        fourthcell.textContent = item.data().email
        fifthcell.textContent = item.data().massage

        console.log(item.data().gender);
        if (item.data().gender == 'male') m++;
        else if (item.data().gender == 'female') fe++;
        // console.log(m);
        // console.log(fe);
    })
    let sum = m + fe;
    // console.log(sum);

    if (sum == 0) {
        $('#smale').text('0%');
        $('#sfemale').text('0%');
    } else {
        $('#smale').text((m / sum * 100).toFixed(2) + '%');
        $('#sfemale').text((fe / sum * 100).toFixed(2) + '%');
    }

})


let validate = () => {
    console.log('VALIDATE!!!');
    let fname = document.myform.fname.value;
    let lname = document.myform.lname.value;
    // let emails = document.myform.emails.value;
    let emails = document.querySelector('#email').value;
    if (fname === '') {
        alert('Please input your name!!');
        document.myform.fname.focus();
        return false;
    }
    if (lname === '') {
        alert('Please input your name!!');
        document.myform.lname.focus();
        return false;
    }
    // if (male === ''&&female==='') {
    //     alert('Please input your Gender!');
       
    //     return false;
    // }
    if (emails =='') {
        alert('Please input your email!!');
        // document.querySelector('#email').focus();
        return false;
    }


    return true;
}

