const sqare = document.querySelector(".sqare");
const corner = document.querySelector(".corner");
const ol = document.querySelector("ol");
let target = null;
color ={};

records = [];
function rand(){
  return Math.floor(Math.random(1)*255);
}
function open(half,X,width){
  return function(){
    if(!half){
      width = width+X; 
      corner.style.borderTop = `solid ${color.text} ${width}px`;
      corner.style.borderLeft = `solid ${color.text2} ${width}px`;
      sqare.parentNode.style.backgroundColor = color.text;
    }
    if(width >= sqare.scrollWidth){
      half = true;
    }
    if(half){
      width = width-X; 
      sqare.style.top = `${500-width}px`;
      sqare.style.right = `${500-width}px`;
      sqare.style.backgroundColor = `${color.text2}`;
      corner.style.borderLeft = `solid  ${color.text2} ${width}px`;
      corner.style.borderTop = `solid   ${color.text}  ${width}px`;
    }
    if(width <= 0 && half){
      sqare.style.top = `0px`;
      sqare.style.right = `0px`;
      sqare.style.backgroundColor = color.text;
      clearInterval(timer);
    }
  }
}
function close(half,X,width){
  return function(){
    if(!half){
      width = width+X; 
      corner.style.borderTop = `solid ${color.text} ${width}px`;
      corner.style.borderLeft = `solid ${color.text2} ${width}px`;
      sqare.parentNode.style.backgroundColor = color.text;
    }
    if(width <= 0){
      half = false;
    }
    if(half){
      width = width-X; 
      sqare.style.top = `${500-width}px`;
      sqare.style.right = `${500-width}px`;
      sqare.style.backgroundColor = `${color.text2}`;
      corner.style.borderLeft = `solid  ${color.text2} ${width}px`;
      corner.style.borderTop = `solid   ${color.text}  ${width}px`;
    }
    if(width >= sqare.scrollWidth && !half){
      sqare.style.top = `0px`;
      sqare.style.right = `0px`;
      sqare.style.backgroundColor = color.text;
      clearInterval(timer);
    }
  }
}
function dragstart(length){
  return function(){
    target = length;
  }
}
sqare.addEventListener("click",function(){
  half = false;
  X = sqare.scrollWidth/150;
  width = 0;
  color.nambar ={
    red:rand(),
    blue:rand(),
    green:rand()
  }
  color.text = `rgb(${color.nambar.red}, ${color.nambar.green}, ${color.nambar.blue})`;
  color.text2= `rgb(${color.nambar.red+30}, ${color.nambar.green+30}, ${color.nambar.blue+30})`;

  const crLi = document.createElement("li");
  crLi.draggable = true;
  crLi.style.backgroundColor = color.text;
  crLi.addEventListener("dragstart",dragstart(records.length));
  ol.appendChild(crLi);
  records.push({...color});
  console.log(color);
  timer = setInterval(open(half,X,width),1);
})
sqare.addEventListener("drop",function(event){
  this.style.backgroundColor = records[target].text;
  event.preventDefault();
})
sqare.addEventListener("dragover",function(event){
  event.preventDefault();
})

