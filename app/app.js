const express = require('express')
const app = express()
const port = 3000

const nAdivinar = [1,2,3,4];
var picas=0, fijas=0;
var msjE='';

function validar(num){

	if(esNumerico(num)){
		return repetidos(num);
	}else{
		msjE='Solo se aceptan valores numericos';
		return false;
	}
}

function esNumerico(num){
	for (var i = 0; i < num.length; i++) {
		if (num.indexOf(' ')==1){
			return false;
		}
		if(isNaN(num[i])){
			return false;
		}
	}
	return true;
}

function repetidos(num) {
	var arr=[];
	
	for (var i = 0; i <num.length; i++) {
		arr.push(num[i]);
            for (var j = 0; j < arr.length; j++)
            {
                if(arr[j]==num[i] && j!=i){
                    msjE='El numero no puede tener digitos repetidos';
					return false;
                }
            }
            
	}
	console.log(arr.length+" - "+num);
	if(arr.length!=4){

		msjE='El numero debe tener 4 digitos';
		return false;
	}
	return true;
}

function picas_fijas(digitado){

	for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4;j++){
            if(digitado[i]==nAdivinar[j]){
                if (i==j){
                    fijas=fijas+1; 
                }else{
                    picas=picas+1;                      
                }
            }
        }     
    }        
}

app.get('/', (req, res) => {
  const numU=req.query.numero;
  //var valido=validar(numU);
  if(validar(numU)){
  	picas_fijas(numU);
  	if(fijas==4){
  		res.send("Felicidades has acertado!");
  	}else{
  		res.send('Tienes '+picas+' pica(s) y '+fijas+' fija(s).');
  	}
  }else{
  	res.send(msjE);
  }
  
  picas=0;
  fijas=0;
})

app.post('/', (req, res) => {
  const numU=req.query.numero;
 if(validar(numU)){
  	picas_fijas(numU);
  	if(fijas==4){
  		res.send("Felicidades has acertado!");
  	}else{
  		res.send('Tienes '+picas+' pica(s) y '+fijas+' fija(s).');
  	}
  }else{
  	res.send(msjE);
  }
  
  picas=0;
  fijas=0;
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

