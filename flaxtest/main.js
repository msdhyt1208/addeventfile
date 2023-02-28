function turncard(){
  const back = document.querySelector(".back");
  const corner = document.querySelector(".corner");
  const ol = document.querySelector(".record>ol");
  let target = null;
  color ={};
  records = [];
  function rand(){
    return Math.floor(Math.random()*255);
  }
  motion={
    click:function(){
      return function(){
        const text = document.querySelector(".text");
        color={
          nambar:{
            red:rand(),
            blue:rand(),
            green:rand()
          }
        }
        color.text = `rgb(${color.nambar.red}, ${color.nambar.green}, ${color.nambar.blue})`;
        color.text2= `rgb(${color.nambar.red+30}, ${color.nambar.green+30}, ${color.nambar.blue+30})`;
        records.push({...color});
        const crLi = document.createElement("li");
          crLi.draggable = true;
          crLi.textContent = color.text;
          crLi.style.backgroundColor = color.text;
          crLi.addEventListener("dragstart",motion.dragstart(records.length));
          ol.appendChild(crLi);
          timer = setInterval(open(false,(back.scrollWidth/150),0),0);
      }
    },
    drop:function(){
      return function(event){
        this.style.backgroundColor = records[target].text;
        console.dir(event.target)
        this.textContent = records[target].text;
        event.preventDefault();
      }
    },
    dragover: function(){
      return function(event){
        event.preventDefault();
      }
    },
    dragstart:function (length){
      return function(event){
        // event.preventDefault();
        target = length-1;
      }
    }
  }
  function open(half,X,width){
    return function(){
      const backSt = back.style;
      const sqareSt = back.firstElementChild.style;
      const cornerSt = corner.style;
      const text = document.querySelector(".back .text");
      cornerSt.borderTop  = `solid ${color.text} ${width}px`;
      cornerSt.borderLeft = `solid ${color.text2} ${width}px`;
      if(width == 0 && !half){
        backSt.backgroundColor = color.text;
        sqareSt.top = `0px`;
        sqareSt.right = `0px`;
      } 
      else if(width >= back.scrollWidth && !half){
        half = true;
        sqareSt.backgroundColor = color.text2;
        text.textContent = "";
      }
      else if(width <= 0 && half){
        sqareSt.top = `0px`;
        sqareSt.right = `0px`;
        sqareSt.backgroundColor = color.text;
        text.textContent = color.text;
        clearInterval(timer);
        return;
      }
      if(!half){
        width = width+X; 
      }
      else{
        sqareSt.top = `${500-width}px`;
        sqareSt.right = `${500-width}px`;
        width = width-X; 
      }
    }
  }
  back.firstElementChild.addEventListener("click",    motion.click())
  back.firstElementChild.addEventListener("drop",     motion.drop());
  back.firstElementChild.addEventListener("dragover", motion.dragover());
}
turncard();








let history =[];
let i=0;
const colordiv = document.querySelector(".sqare .text");
const sqareColor = document.querySelector(".sqare");
const colorChert = document.querySelector(".colorChert>ul");

while(i<3){
  for(let j=0;j<256;j++){
    crColorLi = document.createElement("li");
    let colorText= [];
    switch(i){
      case 0:   colorText = [`rgb(${255-j},   ${j},     ${0})`];
          break;
      case 1:   colorText = [`rgb(${0},       ${255-j}, ${j})`];
          break;
      default:  colorText = [`rgb(${j},       ${0},     ${255-j})`];
    }
    crColorLi.style.backgroundColor = colorText;
    history.push(...colorText);
    crColorLi.No = history.length;
    crColorLi.draggable =true;
    colorChert.appendChild(crColorLi);
  }
  
  i++;
}
console.dir(history)
colorChert.addEventListener("click",function(event){
  addEvent(event);
})
colorChert.addEventListener("touchmove",function(event){
  event.preventDefault();
  addEvent(event.touches[0])
})


colorChert.addEventListener("dragover",function(event){
  event.preventDefault();
  addEvent(event);
})
function addEvent(event){
  const colorSelect = document.elementFromPoint(event.clientX,event.clientY);
  colorText = history[colorSelect.No];
  
  sqareColor.style.backgroundColor = colorText;
  colordiv.textContent = colorText;

}
