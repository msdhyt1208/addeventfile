const sqare = document.querySelector(".sqare");

const corner = document.querySelector(".corner");
sqare.addEventListener("click",function(){
  half = false;
  console.dir(corner);
  X = sqare.scrollWidth/500;
  max=sqare.scrollWidth;
  width = 0;
  color ={
    nambar :{
    red:rand(),
    blue:rand(),
    green:rand()
    },
    text: function(){return`rgb(${color.nambar.red}, ${color.nambar.green}, ${color.nambar.blue})`},
    text2: function(){return`rgb(${color.nambar.red+30}, ${color.nambar.green+30}, ${color.nambar.blue+30})`}
  }
  console.dir(color.text);
  timer = setInterval(function(){
    if(!half){
      width = width+X; 
      corner.style.borderTop = `solid ${color.text()} ${width}px`;
      corner.style.borderLeft = `solid ${color.text2()} ${width}px`;
      sqare.parentNode.style.backgroundColor = color.text();
      console.dir(corner.style.borderTop);
    }
    if(width >= max){
      half = true;
    }
    if(half){
      width = width-X; 
      sqare.style.top = `${500-width}px`;
      sqare.style.right = `${500-width}px`;
      sqare.style.backgroundColor = `${color.text2()}`;
      corner.style.borderLeft = `solid  ${color.text2()} ${width}px`;
      corner.style.borderTop = `solid   ${color.text()}  ${width}px`;
    }
    if(width <= 0 && half){
      sqare.style.top = `0px`;
      sqare.style.right = `0px`;
      sqare.style.backgroundColor = color.text();
      clearInterval(timer);
    }
  },1)
})
function rand(){
  return Math.floor(Math.random(1)*255);
}
// const color = {
//   red: 0,
//   blue:0,
//   green:0
// }
// console.log(color);
// const record = [{...color}];
// const div = document.querySelector(`div`);
// div.addEventListener(`click`,click());
// function click(){
//   return function(){
//     console.log(color)
//     color.red = rand();
//     color.green = rand();
//     color.blue = rand();
//     this.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`
//     record.push({...color})
//     console.log(record);
//   }
// }
// function rand(){
//   return Math.floor(Math.random(1)*255);
// }
