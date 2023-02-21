const peel = {
  space : document.querySelector("li"),
  root : document.documentElement.style,
  action :function(){
    this.space.addEventListener("mousemove",this.mouseMove());
  },
  mouseMove:function(bThis){
    return function(event){
      // console.log(`X:${this.clientWidth-event.offsetX} Y:${event.offsetY}`),
      strY = event.offsetY; 
      strX = this.clientWidth-event.offsetX;
      rad  = Math.acos((strY*strY-strX*strX)/(strX*strX+strY*strY))/Math.PI*180;
      
      document.documentElement.style.setProperty('--top', `${strY}px`);
      document.documentElement.style.setProperty('--left', `${strX}px`);
      document.documentElement.style.setProperty('--rad', `${rad}deg`);
    }
  }
}
peel.action();