const boton_submit = document.querySelector(".button");
boton_submit.onclick = (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
  
  const pnombre = document.getElementById("pnombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("contraseña").value;
  const cpass = document.getElementById("ccontraseña").value;

  // Almacenar en el storage
  localStorage.setItem('nombre', pnombre);
  localStorage.setItem('apellido', apellido);
  localStorage.setItem('email', email);
  localStorage.setItem('pass', pass);
  localStorage.setItem('cpass', cpass);

  if (pnombre === "" && apellido === "" && email === "" && pass === "" && cpass === "") {
    swal("Opps..!", "Todos los campos deben ser rellenados!", "error");
  } else {
    if (pass !== cpass) {
      swal("Opps..!", "Las Contraseñas deben ser iguales!", "error");
    } else {
      swal("Bien!", "Registro Exitoso!", "success");
    }
  }
};

const login = document.querySelector('.button_login');
login.onclick = (e) =>{
  e.preventDefault();

  const direccionEmail = document.getElementById("email").value;
  const passWord = document.getElementById("contraseña").value;

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("contraseña");


  if(direccionEmail == ""&&passWord == ""){
    swal("Opps..!", "Todos los campos deben ser rellenados!", "error");
  } else{
      if(direccionEmail == email && passWord == password){
        swal("Bien!", "Ingreso Exitoso!", "success");
      }else{
        swal("Opps..!", "Uno de los campos no es correcto!", "error");
      }
  }
}
