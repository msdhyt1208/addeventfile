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
// mausedrow();
const peel = {
  space : document.querySelector(".peel>div"),
  root : document.documentElement.style,
  action :function(){
    this.space.addEventListener("mousemove",this.mouseMove2());
  },
  mouseMove:function(){
    return function(event){
      // console.log(`X:${this.clientWidth-event.offsetX} Y:${event.offsetY}`),
      strY = event.offsetY; 
      strX = this.clientWidth - event.offsetX;
      rad  = Math.acos((strY*strY-strX*strX)/(strX*strX+strY*strY));
      X = strX/Math.sin(rad);
      Y = strY/Math.sin(rad);
      if(Y >= this.clientWidth|| X>= this.clientHeight)return;
      kakudo = 180-rad/Math.PI*180;
      document.documentElement.style.setProperty('--top', `${X}px`);
      document.documentElement.style.setProperty('--left', `${Y}px`);
      document.documentElement.style.setProperty('--rad', `${kakudo}deg`);
    }
  },
  mouseMove2:function(){
    return function(event){
      // console.log(`X:${this.clientWidth-event.offsetX} Y:${event.offsetY}`),
      strY = event.offsetY; 
      strX = event.offsetX;
      rad  = Math.acos((strY*strY-strX*strX)/(strX*strX+strY*strY));
      X = strX/Math.sin(rad);
      Y = strY/Math.sin(rad);
      if(Y >= this.clientWidth|| X>= this.clientHeight)return;
      kakudo = rad/Math.PI*180-180;
      document.documentElement.style.setProperty('--top', `${X}px`);
      document.documentElement.style.setProperty('--left', `${Y}px`);
      document.documentElement.style.setProperty('--rad', `${kakudo}deg`);
    }
  }
}
peel.action();


// setInterval(function(){wheel(scrollBox,1,-50)},100)




addEventListener('abort',       function(event) { console.log(`about`)});
addEventListener('ended',       function()      { console.log(`ended`)});
addEventListener('addtrack',    function(event) { console.log(`addtrack`)});
addEventListener('change',      function(event) { console.log(`change`)});
addEventListener('messageerror',function(event) { console.log(`messageerror`)});
addEventListener('message"',    function(event) { console.log(`message"`)});
