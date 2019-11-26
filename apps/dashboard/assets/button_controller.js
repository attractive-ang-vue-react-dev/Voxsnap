function button_control(){
	var x = document.getElementById("range_holder");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}

var setter = setInterval(function(){
	var elem = document.getElementById("custom_button")
	if(elem !== null){
		elem.addEventListener("click", button_control)
		clearInterval(setter);
	}
}, 100)