function addElement() {

  var ni = document.getElementById('myDiv');

  var numi = document.getElementById('theValue');

  var num = (document.getElementById('theValue').value -1)+ 2;

  numi.value = num;

  var newdiv = document.createElement('div');

  var divIdName = 'my'+num+'Div';

  newdiv.setAttribute('id',divIdName);
  //set multiple attributes:
  // http://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript

  newdiv.innerHTML = 'Element Number '+num+' has been added! <a href=\'#\' onclick=\'removeElement('+divIdName+')\'>Remove the div "'+divIdName+'"</a>';

  ni.appendChild(newdiv);

}



//REMOVEELEMENT JAVASCRIPT FUNCTION
function removeElement(divNum) {

  var d = document.getElementById('myDiv');

  var olddiv = document.getElementById(divNum);

  d.removeChild(olddiv);

}