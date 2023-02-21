const peel = {
  space : document.querySelector("li"),
  root : document.documentElement.style,
  action :function(){
    this.space.addEventListener("mousemove",this.mouseMove());
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
  }
}
peel.action();