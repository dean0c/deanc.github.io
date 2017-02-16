var products;
var colourfile;
var page = 0;

function nextpage(){
  page = page + 1;
  changepage();
}

function changepage(){
  switch(page) {
    case 0:
        // select category
        document.getElementById("dproductcat").hidden = false;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
      break;
    case 1:
        // select product group
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = false; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
        break;
    case 2:
        // select variant
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = false;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
        break;
    case 3:
        // select colour
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = false;
        document.getElementById("dquantity").hidden = true;     
        break;
    case 4:
        // select quantity
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = false;     
        break;
    case 5:
        // enter description
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
        break;
     default:
        break;
  }
}

function addproduct() {
  alert('confirm pressed');
}

function selectcolour() {
 };

function selectproduct() {
  selectedproduct = document.getElementById('product').selectedOptions;
  item = selectedproduct[0].value;
  checkVariants = products[item].getElementsByTagName("variants")[0];
  colourfile = products[item].getElementsByTagName("colours")[0].textContent
  
  if (checkVariants) {
    variants = checkVariants.getElementsByTagName('variant')
    select = document.getElementById('variant');
    for (var i = 0; i < variants.length; i++) {  
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+variants[i].getElementsByTagName("code")[0].textContent+">"+variants[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);  
    }
    nextpage();
  } else {
      updatecolour();
  }    
}

function updatecolour() {
  if (colourfile) {
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");  
    }
    xhttp.open("GET", "./colours/" +  colourfile.toLowerCase() + ".xml", false);
    xhttp.send(null);
    xmlDoc = xhttp.responseXML; 
    debugger;
      select = document.getElementById('colour');    
      colours = xmlDoc.getElementsByTagName("colours")[0].getElementsByTagName("colour")
      for (var i = 0; i < colours.length; i++) {        
        var opt = document.createElement('option');
        opt.value = colours[i].getElementsByTagName("code")[0].textContent;
        opt.innerHTML = "<option value="+opt.value+">"+colours[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);
        nextpage();
      } //end of for loop    
  } else {
    page = page +2;
    changepage();
  }
}

function selectvariant() {
  selvar = document.getElementById("variant").value;
  updatecolour();
}

function selectcategory() {
 colourfile = "";
 selcat =  document.getElementById("category").value;
  if (selcat) {
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {    // IE 5/6
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", "./products/" +  selcat.toLowerCase() + ".xml", false);
    xhttp.send(null);
    //xhttp.onreadystatechange = function(){
    //if (xhttp.status == "200") 
      xmlDoc = xhttp.responseXML; 
      select = document.getElementById('product');
      products = xmlDoc.getElementsByTagName("products")[0].getElementsByTagName("product")
      for (var i = 0; i < products.length; i++) {        
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+i+">"+products[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);
      } //end of for loop
    //} //end of onstate change disabled
    nextpage();
    }   //end of if selcart
  }     //end of function 
