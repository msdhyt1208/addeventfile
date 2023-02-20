const youso = document.querySelectorAll(".detail");
const footer = document.querySelector("footer");

const query ={
  element:[
    "body",
    "main",
    "ul",
    "li",
    "div",
    "p",
    "span"
  ],
  selecter:[]
}


for(let i = 0;i<query.element.length;i++){
  query.selecter[i] = document.querySelector(query.element[i]);
  const crBtn = document.createElement("button");
  crBtn.textContent = query.element[i];
  crBtn.addEventListener("click",function(){
    const target = query.selecter[i];
      youso[0].textContent = target.parentElement.localName;
      youso[1].textContent = target.localName;
      youso[2].textContent = target.children[0].localName;
      youso[3].textContent = target.children.length;
  })
  footer.appendChild(crBtn);
}