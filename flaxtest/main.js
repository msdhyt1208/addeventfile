function turncard(){
  const back = document.querySelector(".back");
  const corner = document.querySelector(".corner");
  const ol = document.querySelector("ol");
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
        if(text != null ) text.remove();
      
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
      
        timer = setInterval(open(false,(back.scrollWidth/150),0),1);
      }
    },
    drop:function(){
      return function(event){
        this.style.backgroundColor = records[target].text;
        event.preventDefault();
      }
    },
    dragover: function(){
      return function(event){
        event.preventDefault();
      }
    },
    dragstart:function (length){
      return function(){
        target = length-1;
      }
    }
  }
  function open(half,X,width){
    return function(){
      const backSt = back.style;
      const sqareSt = back.firstElementChild.style;
      const cornerSt = corner.style;
  
      cornerSt.borderTop  = `solid ${color.text} ${width}px`;
      cornerSt.borderLeft = `solid ${color.text2} ${width}px`;
      if(width == 0 && !half){
        backSt.backgroundColor = color.text;
        sqareSt.display = `block`;
        sqareSt.top = `0px`;
        sqareSt.right = `0px`;
      } 
      else if(width >= back.scrollWidth && !half){
        half = true;
        sqareSt.backgroundColor = color.text2;
      }
      else if(width <= 0 && half){
        sqareSt.display = `none`;
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
  back.addEventListener("click",    motion.click())
  back.addEventListener("drop",     motion.drop());
  back.addEventListener("dragover", motion.dragover());
}
turncard();