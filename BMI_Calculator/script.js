
const form = document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

   

  const height =   parseInt(document.querySelector('#height').value)
  const  weight = parseInt(document.querySelector('#weight').value)
  const  result = document.querySelector('#bmi-result')


console.log(result);

result.innerText = 'hello';

    if(height === '' || height < 0  || isNaN(height)){
        result.innerHTML=`Please give a valid height ${height}`;
    }
    if(weight === '' || weight < 0  || isNaN(weight)){
        result.innerHTML=`Please give a valid weghit ${weight}`;
    }
    else{
         const bmi = (weight / ((height * height) / 10000)).toFixed(2);

         result.innerText = bmi
    }
})
