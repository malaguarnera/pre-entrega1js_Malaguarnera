//variable que mantenga el estado del carrito
let carritoVisible = false;

//todos los elementos de la pagina deben cargar para continuar
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //primero agregar funcionalidad
    let botonesEliminarItem = document.getElementsByClassName('btn_eliminar');
    for(let i=0; i < botonesEliminarItem.length;i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
    //boton sumar
   let botonesSumarCantidad = document.getElementsByClassName('sumar_cantidad');
    for( let i=0;i< botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad [i];
        button.addEventListener('click',sumarCantidad);
    }
    //boton restar
    let botonesRestarCantidad = document.getElementsByClassName('restar_cantidad');
    for( let i=0;i< botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad [i];
        button.addEventListener('click',restarCantidad);
    }

    //agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton_item');
    for(let i=0;i< botonesAgregarAlCarrito.length;i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click',agregarAlCarritoClicked);
    }

    //boton pagar
    document.getElementsByClassName('btn_pagar')[0].addEventListener('click',pagarClicked);

}
//eliminacion del item

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //actualizar el precio cuando se haga la eliminacion
    actualizarTotalCarrito();

    ocultarCarrito();
}

//actualiza el total
function actualizarTotalCarrito(){
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito_item');
    let total = 0;


    //recorremos cada elemento del carrito para la actualizacion
    for(let i=0;i < carritoItems.length;i++){
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito_item_precio')[0];
        
        //quitar signo peso  punto
        let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        let cantidadItem = item.getElementsByClassName('carrito_item_cantidad')[0];
        let cantidad = cantidadItem.value;
        total = total +(precio * cantidad);
    }
    total = Math.round(total *100)/100;
    document.getElementsByClassName('carrito_precio_total')[0].innerText = '$' + total.toLocaleString("es")+ ',00';
}
function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito_items')[0];
    if(carritoItems.childElementCount=0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRigth = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false ;


        let items = document.getElementsByClassName('contenedor_items')
    }
}
 
function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito_item_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito_item_cantidad')[0].value = cantidadActual;
    //actualizamos

    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito_item_cantidad')[0].value;
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
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo_item')[0].innerText;
    console.log(titulo);
    let precio = item.getElementsByClassName('precio_item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img_item')[0].src;
    console.log(imagenSrc);


    //funcion que agrege los elementos al carrito.
    agregarItemAlCarrito(titulo,precio,imagenSrc);

    //hacer visible al carrito cuando se agrega
    hacerVisibleAlCarrito();
}

function agregarItemAlCarrito(titulo,precio,imagenSrc){
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCarrito = document.getElementsByClassName('carrito_items')[0];


    //checkeo de doble producto
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito_items_titulo');
    for(let i=0;i< nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El elemento ya esta en el carrito");
            return;
        }
    }

    let itemCarritoContenido = `
    
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

    let botonesSumarCantidad = item.getElementsByClassName('sumar_cantidad')[0];
    botonesSumarCantidad.addEventListener('click',sumarCantidad);

       //restar sobre el nuevo item

       let botonesRestarCantidad = item.getElementsByClassName('restar_cantidad')[0];
       botonesRestarCantidad.addEventListener('click', restarCantidad);
}
function pagarClicked(event){
    alert("gracias por su compra");

    let carritoItems = Document.getElementsByClassName('carrito_items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
function hacerVisibleAlCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRigth = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor_items')[0];
    items.style.width = '60%';
}