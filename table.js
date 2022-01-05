// var password;

// var pass1="adil";
// var pass2="awesome";
// var pass3="chergui";
document.getElementById('imageGood').style.display = "none";



// password=prompt('Please enter your password ""dont try adil""');

// if (password==pass1 || password==pass2 || password==pass3)

//   alert('Password Correct! Click OK to enter!');

// else
//    {
    
//     window.location="https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png";
//     }

const form = document.getElementById('form');
const titlet = document.getElementById('titlet');
const author = document.getElementById('author');
const email = document.getElementById('email');
const price = document.getElementById('price');
const date = document.getElementById('date');
const lang = document.getElementById('lang');
var table = document.getElementById("table");
var type=document.getElementsByClassName("type");
var tbody = document.querySelector('tbody');
var message = document.getElementById("message");

var max_length = 30;

let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let numbrs = /^[0-9]+((\.[0-9]{2})|())$/;
form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
  
});

var list = []

class Ouvrage{
    constructor(titlet, email, author, date, price, lang, type) {
        this.titlet = titlet;
        this.email = email;
        this.author = author;
        this.date = date;
        this.price = price;
        this.lang = lang;
        this.type = type;
    }

    detailsOuvrage(){
        return "L'ouvrage "+this.titlet+" est un " + this.type+" en langue " + this.lang +
        ", écrit par "+this.author+" et publié le 'date de publication "+". Le prix de "+this.titlet+" est de "+this.price
    }
}


   //LOCALSTORGE

   var saveLocal = JSON.parse(localStorage.getItem("anysavelocal"))
   if(saveLocal!=null){
       for (let i = 0; i < saveLocal.length; i++) {
        var ovrage = new Ouvrage(saveLocal[i].titlet,saveLocal[i].email,saveLocal[i].author,saveLocal[i].date,saveLocal[i].price,saveLocal[i].lang,saveLocal[i].type);
        list.push(ovrage)
        trie()
       }
   }

   function setall() {
    for(x=0; x<list.length;x++){

        var row = tbody.insertRow(-1);
        row.insertCell(0).innerHTML = list[x].titlet;
        row.insertCell(1).innerHTML = list[x].email;
        row.insertCell(2).innerHTML = list[x].author;
        row.insertCell(3).innerHTML = list[x].date;
        row.insertCell(4).innerHTML = list[x].price;
        row.insertCell(5).innerHTML = list[x].lang;
        row.insertCell(6).innerHTML = list[x].type;
        row.insertCell(7).innerHTML = '<input type="submit" value="Edit"  class="edit" onClick="onEdit(this)">'+ '<button class="delete"  onClick="onDelete(this)">Delete</button>'
    
}}
trie()
setall()

      //LOCALSTORGE

//Retrieve the data
function readFormData(){
    var formData = {};
    formData["titlet"] = document.getElementById("titlet").value;

    return formData;
}



function checkInputs() {
	// trim to remove the whitespaces
	const titletValue = titlet.value.trim();
	const authorValue = author.value.trim();
	const priceValue = price.value.trim();
	const dateValue = date.value.trim();
    const emailValue = email.value.trim();
    

    var letters = /^[a-z\s]*$/i;
    var error_situation = false;

	if(titletValue === '') {
		setErrorFor(titlet, '*title cannot be blank');
        error_situation++

    }
     else {
		setSuccessFor(titlet);
	}
    if(emailValue === '') {
		setErrorFor(email, '*email cannot be blank');
        error_situation++

    }
   else if (!emailValue.match(regexEmail)) {
        setErrorFor(email, '*it not email');
        error_situation++
	} 
    else{
        setSuccessFor(email);
    }
    if (titlet.value.length>max_length) {
        setErrorFor(titlet, '*title must be lest 30');
        error_situation++
    }
    if (!titletValue.match(letters)) {
        setErrorFor(titlet, '*letters only');
        error_situation++
	}
    if(priceValue === '') {
		setErrorFor(price, '*price cannot be blank');
        error_situation++
      
	} else if (!priceValue.match(numbrs)){
        setErrorFor(price, '*it not number');
        error_situation++
    }
    
    else {
		setSuccessFor(price);
	}
    
	
	if(authorValue === '') {
		setErrorFor(author, '*author cannot be blank');
        error_situation++
        
	} else {
		setSuccessFor(author);
	}

    if (author.value.length>max_length) {
        setErrorFor(author, '*title must be lest 30');
    }
	
	
	
    if(dateValue === '') {
        setErrorFor(date, '*date cannot be blank');
        error_situation++
	} else {
        setSuccessFor(date);
	}
    
    if(lang.value == ""){
        error_situation++
        lang.parentElement.className = 'form-control error'
        setErrorFor(lang, '*Language cannot be blank');
    } else {
        setSuccessFor(lang);
	}
   

    
    var getSelectedValue = document.querySelector('input[name="season"]:checked');

            if(getSelectedValue != null) {
               
                document.getElementById("radiobtn").innerHTML =  " season is selected";
                radiobtn.style.color = '#2ecc71'
            }
            else {
          document.getElementById("radiobtn").innerHTML = "*You have not selected any season";
          radiobtn.style.color = '#e74c3c'
          error_situation++
            }
//////////////////////////////////////////////////////////////////////////////

        if(!error_situation){
            var CellType="";

            for(j=0;j<type.length;j++)
            {
                if(type[j].checked)
                {
                    CellType=type[j].value;
                } 
            }
            var mylist = new Ouvrage(titlet.value,  email.value, author.value,date.value, price.value, lang.options[lang.selectedIndex].value,CellType );
            message.innerHTML = mylist.det
            list.push(mylist)
            trie()
            localStorage.setItem("anysavelocal",JSON.stringify(list))
            message.innerHTML = mylist.detailsOuvrage()
            document.getElementById('imageGood').style.display = "block";
            message.classList.add('diplay');
            tbody.innerHTML = "";
           
            
            // for(x=0; x<list.length;x++){
                setall()
            // var row = tbody.insertRow(-1);
            // row.insertCell(0).innerHTML = list[x].titlet;
            // row.insertCell(1).innerHTML = list[x].email;
            // row.insertCell(2).innerHTML = list[x].author;
            // row.insertCell(3).innerHTML = list[x].date;
            // row.insertCell(4).innerHTML = list[x].price;
            // row.insertCell(5).innerHTML = list[x].lang;
            // row.insertCell(6).innerHTML = list[x].type;
           
            // row.insertCell(7).innerHTML = '<input type="submit" value="Edit"  class="edit" onClick="onEdit(this)">'+ '<button class="delete"  onClick="onDelete(this)">Delete</button>'
            resetForm()

        
        }
        trie()
    }
    trie()
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
    error_situation = false;
    
}



function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
    error_situation = true;
    
  
}

function trie(){
    list.sort(function(a,b){
        if(a.titlet.toUpperCase() < b.titlet.toUpperCase())
        {
            return -1;
        }
        });
}
var selectedRow;
//Edit the data
function onEdit(td){
    
    selectedRow = td.parentElement.parentElement;
    document.getElementById('titlet').value = selectedRow.cells[0].innerHTML;
    document.getElementById('email').value = selectedRow.cells[1].innerHTML;
    document.getElementById('author').value = selectedRow.cells[2].innerHTML;
    document.getElementById('date').value = selectedRow.cells[3].innerHTML;
    document.getElementById('price').value = selectedRow.cells[4].innerHTML;
    document.getElementById('lang').value = selectedRow.cells[5].innerHTML;
    // document.getElementById('type').value = selectedRow.cells[6].innerHTML;
    for (var b = 0; b < 3; b++) {
        if (type[b].value == selectedRow.cells[6].innerHTML) {
            type[b].checked = true;
            break;
        }
      
        function messages() {
           
            list[selectedRow.rowIndex-1].titlet = titlet.value;
            list[selectedRow.rowIndex-1].email =  email.value;
            list[selectedRow.rowIndex-1].author =  author.value;
            list[selectedRow.rowIndex-1].date= date.value;
            list[selectedRow.rowIndex-1].price= price.value;
            list[selectedRow.rowIndex-1].lang =  lang.value;
            for (var i = 0; i < 3; i++) {
                if (type[i].checked) {
                    list[selectedRow.rowIndex-1].type = type[i].value;
                    break;
                }
            }
            
        }
    }
   

    // for(j=0;j<type.length;j++)
    // {
    //     if(type[j].checked==true)
    //     {
    //         list[i].Type=type[j].value;
    //     }
    // }
    
   
    document.getElementById('Submit').style.display = "none";
    document.getElementById('Update').style.display = "block";
    localStorage.setItem("anysavelocal",JSON.stringify(list))
    // onUpdate()

}

function onUpdate(td){
    
    list[selectedRow.rowIndex-1].titlet = titlet.value;
    list[selectedRow.rowIndex-1].email =  email.value;
    list[selectedRow.rowIndex-1].author =  author.value;
    list[selectedRow.rowIndex-1].date= date.value;
    list[selectedRow.rowIndex-1].price= price.value;
    list[selectedRow.rowIndex-1].lang =  lang.value;
    for (var i = 0; i < 3; i++) {
        if (type[i].checked) {
            list[selectedRow.rowIndex-1].type = type[i].value;
            break;
        }
    }
    document.getElementById('Update').style.display = "none";
    document.getElementById('Submit').style.display = "block";
    localStorage.setItem("anysavelocal",JSON.stringify(list))
    trie();
    tbody.innerHTML=""
    setall()

}


//Delete the data
function onDelete(B){
  
    if(confirm('Do you want to delete this row?')){
        row = B.parentElement.parentElement.rowIndex-1;
        list.splice(row, 1)
        // document.getElementById('table').deleteRow(row.rowIndex);
        localStorage.setItem("anysavelocal",JSON.stringify(list))
        tbody.innerHTML=""
        setall()
        trie()
    }
  
  
}


//Reset the data
function resetForm(){
    document.getElementById('titlet').value = '';
    document.getElementById('author').value = '';
    document.getElementById('date').value = '';
    document.getElementById('email').value = '';
    document.getElementById('price').value = '';
    document.getElementById('lang').value= '';
    var ele = document.getElementsByName("season");
    for(var i=0;i<ele.length;i++)
       ele[i].checked = false;
}

// window.localStorage.removeItem('anysavelocal');

function printData()
{
//    var divToPrint=document.getElementById("Table");
var divToPrint=document.getElementById("table");
        newWin= window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
}