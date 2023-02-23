function pageChenge(){
  const page = {
    querySelectorAll: document.querySelectorAll(".top > button"),
    addEvent:function(i,target){
      console.log(i)
      target.parentNode.parentNode.className= "page"+(i+1);
    }
  }
  for(let i =0;i<page.querySelectorAll.length;i++){
    console.log("page"+page.querySelectorAll.length);
    page.querySelectorAll[i].addEventListener("click",function(){
      page.addEvent(i,page.querySelectorAll[i])
    })
  }
}
pageChenge();

function addRemove(){
  const addBtn = document.querySelectorAll(".add>button");
  const removeBtn = document.querySelectorAll(".remove>button");
  const ul = document.querySelector("ul");
  let numbar = 0;
  blockSelect = null;
  
  // <li>作成ボタン
  for(let i=0;i<addBtn.length;i++){
    addBtn[i].addEventListener("click",function(){
      const crLi = document.createElement("li");
      crLi.textContent = `${numbar++}`;
      crLi.draggable = true;
      crLi.addEventListener("click",function(){
        const selc = document.querySelectorAll(".select");
        if(this.className !== ""){
          this.className = "";
          return;
        }
        if(selc.length !== 0)   selc[0].className = "";
        this.className = "select";
      })
      crLi.addEventListener("dragstart",function(event){
        blockSelect = event.target;
      })
      ul.appendChild(crLi);
      const selct = document.querySelector(".select");
      switch(i){
        case 0: 
          ul.insertBefore(crLi,ul.firstChild);
          break;
        case 1:
          ul.insertBefore(crLi,selct);
          break;
        case 2:
          ul.insertBefore(crLi,selct.nextElementSibling);
          break;
      }
    })
  }
  // <li>削除ボタン
  for(let i= 0;i<removeBtn.length;i++){
    removeBtn[i].addEventListener("click",function(){
      const selc = document.querySelector(".select");
      switch(i){
        case 0:
          ul.firstChild.remove();
          break;
        case 1:
          selc.remove();  
          break;
        default:
          ul.lastChild.remove();
      }
    })
  }
}
addRemove();

function lineMove(){
  const drag = document.querySelector(".line-move");
  const move = document.querySelector(".line-move span");
  let lineselect = null;
  drag.addEventListener("dragstart",function(event){
    lineselect = true;
    sa = event.clientX-event.target.offsetLeft;
  })
  drag.addEventListener("dragover",function(event){

    event.preventDefault();    
  })
  drag.addEventListener("drop",function(event){
    event.preventDefault();
    if(lineselect){
      if(event.clientX-sa < 0 || event.clientX-sa > this.scrollWidth)  return;
      if(lineselect ){
        move.style.left = event.clientX-sa+ "px";
        
      }
      lineselect = false;
    }    
  })
}
lineMove();

function blockMove(){
  const blockBox = document.querySelectorAll(".block-move>ul");
  const block = document.querySelectorAll(".block-move>ul>li");
  console.log(blockBox.length);
  for(let i=0;i<blockBox.length;i++){
  
    blockBox[i].addEventListener("dragstart",function(event){
      blockSelect = event.target;
    }) 
    blockBox[i].addEventListener("dragover",function(event){
      event.preventDefault();
    }) 
    blockBox[i].addEventListener("drop",function(event){
      event.preventDefault();
      if(blockSelect !== null){
        blockSelect.remove();
        this.appendChild(blockSelect);
        blockSelect =null;
      }
    })
  }
}
blockMove();

function mousePosition(){
  const mousePosition = document.querySelector(".mouse-move")
  mousePosition.addEventListener("mousemove",function(e){
  
    this.firstElementChild.textContent = `clientX${e.clientX}: clientY${e.clientY}`;
  })
}
mousePosition();

// スクロール
scroll={
  scrollBox : document.querySelector(".scroll>ul"),
  li :        document.querySelectorAll(".scroll li"),
  scrollStart : 150,
  action:function(){
    this[`scrollWidth`] = this.scrollBox.scrollWidth;
    this[`scrollEnd`] = this.scrollWidth + this.scrollStart;
    this.addbox();
    this.scrollBox.scrollLeft =  this.scrollWidth-10;
    this.scrollBox.addEventListener("wheel", this.wheel());
    this.scrollBox.addEventListener("scroll", this.scroll(this));
    this.scroll();
  },
  addbox: function() {
    console.log(this.li.length);
    for(let i = 0;i<10;i++){
      const crLi = document.createElement("li");
      console.log(this.li.length);
      crLi.textContent = this.li[i].textContent;
      crLi.cloneNode(this.li[i]);
      this.li[i].parentElement.appendChild(crLi);
    }
  },
  wheel : function(){
    return function(e){
      this.scrollLeft += e.wheelDelta/3 ;
      e.preventDefault();
    }
  },
  
  scroll:function(th){
    return function(event){
      console.log(`${this.scrollLeft}::${th.scrollWidth}::${th.scrollEnd}`);
      if     (this.scrollLeft <= th.scrollStart)
          this.scrollLeft += th.scrollWidth;
      if    (this.scrollLeft > th.scrollEnd)
          this.scrollLeft -= th.scrollWidth;      
      event.preventDefault();
    }
  }
}
scroll.action();

function mausedrow(){
  const drowErea = document.querySelector(".draw");
  drowSlect = false;
  drowErea.addEventListener("click",function(event){
    crSq = document.createElement("div");
    crSq.style.top = event.clientY+"px";
    crSq.style.left = event.clientX+"px";
    drowErea.appendChild(crSq);
    console.dir(crSq)
  })
  drowErea.addEventListener("dragstart",function(event){

    drowSlect = true;
    console.log("sdfghjk");
  })
  drowErea.addEventListener("dragover",function(event){
    setInterval(function(){
      if(drowSlect){
        crSq = document.createElement("div");
        crSq.style.top = event.clientY+"px";
        crSq.style.left = event.clientX+"px";
        drowErea.appendChild(crSq);
      }
    },1)
    event.preventDefault();
  })
  drowErea.addEventListener("drop",function(event){

    drowSlect = false;
    event.preventDefault();
  })
}
mausedrow();

const peel = {
  root : document.documentElement.style,
  action :function(){
    const space = document.querySelector(".peel>div");
    const btn = document.querySelectorAll(".peel li");
    for(i=0;i<btn.length;i++){
      btn[i].addEventListener("click",this.click(i,space));   
    }
    space.addEventListener("mousemove",this.mouseMove());

  },
  dragover:function(){ 
    return function(event){
       console.log("over"); 
       event.preventDefault();
    }
  },
  click:  function(i,space){
    return function(){
      switch(i){
        case 0:space.className= `tr`; break;
        case 1:space.className=`br`; break;
        case 2:space.className=`bl`; break;
        default:space.className=`tl`; break;
      }
    }
  },
  mouseMove:function(){
    return function(event){
      // console.log(`X:${this.clientWidth-event.offsetX} Y:${event.offsetY}`),
      event.preventDefault();
      strY = event.offsetY; 
      strX = event.offsetX;
      if(this.className=="tr"||this.className=="br")
        strX = this.clientWidth - event.offsetX;  
      if(this.className=="bl"||this.className=="br")
        strY = this.clientHeight - event.offsetY;
 
      rad  = Math.acos((-strY*strY+strX*strX)/(strX*strX+strY*strY));
      if(this.className=="tr"||this.className=="bl")
        rad  = Math.acos((strY*strY-strX*strX)/(strX*strX+strY*strY));
      
      X = strX/Math.sin(rad);
      Y = strY/Math.sin(rad);
      if(Y >= this.clientWidth|| X>= this.clientHeight)return;
      kakudo = rad/Math.PI*180;
      document.documentElement.style.setProperty('--top', `${X}px`);
      document.documentElement.style.setProperty('--left', `${Y}px`);
      document.documentElement.style.setProperty('--rad', `${kakudo}deg`);
    }
  }

  }
peel.action();

//       else{
//         sqareSt.top = `${500-width}px`;
//         sqareSt.right = `${500-width}px`;
//         width = width-X; 
//       }
  
//     }
//   }
//   back.addEventListener("click",    motion.click())
//   back.addEventListener("drop",     motion.drop());
//   back.addEventListener("dragover", motion.dragover());
// }
// turncard();

// setInterval(function(){wheel(scrollBox,1,-50)},100)

// function turncard(){
//   const back = document.querySelector(".back");
//   const corner = document.querySelector(".corner");
//   const ol = document.querySelector("ol");
//   let target = null;
//   color ={};
//   records = [];
//   function rand(){
//     return Math.floor(Math.random()*255);
//   }
  
//   motion={
//     click:function(){
//       return function(){
//         const text = document.querySelector(".text");
//         if(text != null ) text.remove();
      
//         color={
//           nambar:{
//             red:rand(),
//             blue:rand(),
//             green:rand()
//           }
//         }
//         color.text = `rgb(${color.nambar.red}, ${color.nambar.green}, ${color.nambar.blue})`;
//         color.text2= `rgb(${color.nambar.red+30}, ${color.nambar.green+30}, ${color.nambar.blue+30})`;
//         records.push({...color});
      
//         const crLi = document.createElement("li");
//           crLi.draggable = true;
//           crLi.textContent = color.text;
//           crLi.style.backgroundColor = color.text;
//           crLi.addEventListener("dragstart",motion.dragstart(records.length));
//           ol.appendChild(crLi);
      
//         timer = setInterval(open(false,(back.scrollWidth/150),0),1);
//       }
//     },
//     drop:function(){
//       return function(event){
//         this.style.backgroundColor = records[target].text;
//         event.preventDefault();
//       }
//     },
//     dragover: function(){
//       return function(event){
//         event.preventDefault();
//       }
//     },
//     dragstart:function (length){
//       return function(){
//         target = length-1;
//       }
//     }
//   }
//   function open(half,X,width){
//     return function(){
//       const backSt = back.style;
//       const sqareSt = back.firstElementChild.style;
//       const cornerSt = corner.style;
  
//       cornerSt.borderTop  = `solid ${color.text} ${width}px`;
//       cornerSt.borderLeft = `solid ${color.text2} ${width}px`;
//       if(width == 0 && !half){
//         backSt.backgroundColor = color.text;
//         sqareSt.display = `block`;
//         sqareSt.top = `0px`;
//         sqareSt.right = `0px`;
//       } 
//       else if(width >= back.scrollWidth && !half){
//         half = true;
//         sqareSt.backgroundColor = color.text2;
//       }
//       else if(width <= 0 && half){
//         sqareSt.display = `none`;
//         clearInterval(timer);
//         return;
//       }
//       if(!half){
//         width = width+X; 
//       }
  
//       else{
//         sqareSt.top = `${500-width}px`;
//         sqareSt.right = `${500-width}px`;
//         width = width-X; 
//       }
  
//     }
//   }
//   back.addEventListener("click",    motion.click())
//   back.addEventListener("drop",     motion.drop());
//   back.addEventListener("dragover", motion.dragover());
// }
// turncard();


addEventListener('abort',       function(event) { console.log(`about`)});
addEventListener('ended',       function()      { console.log(`ended`)});
addEventListener('addtrack',    function(event) { console.log(`addtrack`)});
addEventListener('change',      function(event) { console.log(`change`)});
addEventListener('messageerror',function(event) { console.log(`messageerror`)});
addEventListener('message"',    function(event) { console.log(`message"`)});
