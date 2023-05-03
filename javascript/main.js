



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

function login() {
    const username = prompt("Ingrese su usuario:");
    const password = prompt("Ingrese su contraseña:");
  
    const user = {
      username: username,
      password: password
    };
  
    console.log(user);
  }


//variable que mantenga el estado del carrito
var carritoVisible = false;

//todos los elementos de la pagina deben cargar para continuar
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //primero agregar funcionalidad
    var botonesEliminarItem = document.getElementsByClassName('btn_eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
    //boton sumar
    var botonesSumarCantidad = document.getElementsByClassName('sumar_cantidad');
    for( var i=0;i< botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad [i];
        button.addEventListener('click',sumarCantidad);
    }
    //boton restar
    var botonesRestarCantidad = document.getElementsByClassName('restar_cantidad');
    for( var i=0;i< botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad [i];
        button.addEventListener('click',restarCantidad);
    }

    //agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton_item');
    for(var i=0;i< botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click',agregarAlCarritoClicked);
    }

    //boton pagar
    document.getElementsByClassName('btn_pagar')[0].addEventListener('click',pagarClicked);

}
//eliminacion del item

function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //actualizar el precio cuando se haga la eliminacion
    actualizarTotalCarrito();

    ocultarCarrito();
}

//actualiza el total
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito_item');
    var total = 0;


    //recorremos cada elemento del carrito para la actualizacion
    for(var i=0;i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito_item_precio')[0];
        
        //quitar signo peso  punto
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito_item_cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total +(precio * cantidad);
    }
    total = Math.round(total *100)/100;
    document.getElementsByClassName('carrito_precio_total')[0].innerText = '$' + total.toLocaleString("es")+ ',00';
}
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito_items')[0];
    if(carritoItems.childElementCount=0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRigth = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false ;


        var items = document.getElementsByClassName('contenedor_items')
    }
}
 
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito_item_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito_item_cantidad')[0].value = cantidadActual;
    //actualizamos

    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito_item_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //control para que no sea menor que 1
if(cantidadActual>=1){
    selector.getElementsByClassName('carrito_item_cantidad')[0].value = cantidadActual;
    //actualizamos

    actualizarTotalCarrito();
}
}
function agregarAlCarritoClicked(event ){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo_item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio_item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img_item')[0].src;
    console.log(imagenSrc);


    //funcion que agrege los elementos al carrito.
    agregarItemAlCarrito(titulo,precio,imagenSrc);

    //hacer visible al carrito cuando se agrega
    hacerVisibleAlCarrito();
}

function agregarItemAlCarrito(titulo,precio,imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito_items')[0];


    //checkeo de doble producto
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito_items_titulo');
    for(var i=0;i< nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El elemento ya esta en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    
    <div class="carrito_item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito_item_detalles">
            <span class="carrito_item_titulo">${titulo}</span>
            <div class="selector_cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito_item_cantidad" disabled>
                <i class="fa-solid fa-plus sumar_cantidad"></i>
            </div>
            <span class="carrito_item_precio">${precio}</span>
        </div>
        <span class="btn_eliminar">
            <i class="fa-solid fa-trash "></i>
        </span>
    </div>
    
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //eliminar un item nuevo 
    item.getElementsByClassName('btn_eliminar')[0].addEventListener('click',eliminarItemCarrito);

    //sumar sobre el nuevo item

    var botonesSumarCantidad = item.getElementsByClassName('sumar_cantidad')[0];
    botonesSumarCantidad.addEventListener('click',sumarCantidad);

       //restar sobre el nuevo item

       var botonesRestarCantidad = item.getElementsByClassName('restar_cantidad')[0];
       botonesRestarCantidad.addEventListener('click', restarCantidad);
}
function pagarClicked(event){
    alert("gracias por su compra");

    var carritoItems = Document.getElementsByClassName('carrito_items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
function hacerVisibleAlCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRigth = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor_items')[0];
    items.style.width = '60%';
}