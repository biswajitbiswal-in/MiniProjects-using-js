const randomColor = function(){
    const hex = "0123456789ABCDEF"
    let color = '#'
    for(let i =0;i<6;i++){
       color += hex[Math.floor(Math.random()*16)]
    }
    return color
}

let interValId;
const startChanginColor = function(){
 if(!interValId){
    interValId =  setInterval(changeBgColor,200)
 }
   function changeBgColor(){
    document.body.style.backgroundColor = randomColor() 
   }
    
}


const stopChanginColor = function(){
    clearInterval(interValId);
    interValId = null
  
}



document.querySelector('#bt1').addEventListener('click',startChanginColor)
document.querySelector('#bt2').addEventListener('click',stopChanginColor)

