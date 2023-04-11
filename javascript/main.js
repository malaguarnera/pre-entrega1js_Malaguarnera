function convertir(){
    let valore = parseInt(document.getElementById("valor").value);
    let resultado = 0;
    let dolar = 388;
    let euro = 233;
    if (document.getElementById("uno")) {
        resultado = valore / dolar;
        alert("el cambio de pesos argentinos a dolares es : $"+ resultado);
        
    }
        else if(document.getElementById("dos")){
            resultado = valore / euro;
            alert("el cambio de pesos argentinos a euros es : $"+ resultado);
        }
            else{
                alert("completa todos los campos");
            }
}

convertir()