// Open & Close the Cart Section
const cartIcon= document.querySelector("#cart-icon");
const cart=document.querySelector(".cart");
const closeCart=document.querySelector("#cart-close");
cartIcon.addEventListener('click',()=>{
    cart.classList.add("active");
});
closeCart.addEventListener("click",() =>{
    cart.classList.remove("active");
});
// This start when the document is ready
if(document.readyState == "loading" ){
    document.addEventListener('DOMContentLoaded',start);
}else{
    start();
};

function start(){ 
    addEvents();
}
function update(){
    addEvents();
    updateTotal();
}
function addEvents(){
    // Removing items From the  Cart List 
    cartRemove =document.querySelectorAll('.cart-remove');
    // console.log(cartRemove);
    cartRemove.forEach(btn => {
        btn.addEventListener("click",removeCartItem)
    });
    // Changing Item Quantity
    let cartQuantity_inputs =document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input =>{
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // Adding item to cart 
    let addCart_btns=document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click",addCartItem);
    });

    // Buy Button Function
    // const buy_btn=document.querySelector(".btn-buy");
    // buy_btn.addEventListener("click", handle_buyOrder);

   

 
}

function addCartItem(){
    let product= this.parentElement;
    let title =product.querySelector(".product-title").innerHTML;
    let price =product.querySelector(".product-price").innerHTML;
    let imgSrc =product.querySelector(".product-img").src;
    console.log(title,price,imgSrc);
    
    let newToAdd ={
        title,
        price,
        imgSrc,
    };

    // Handling items that exists already-trying to make it not to duplicate itself
    // if (itemsAdded.find((el) => el.title ==newToAdd.title)){
    //     alert("This Item already exist!!");
    //     return;
    // }else{
    //     itemsAdded.push(newToAdd);
    //  }

    // Adding Product  to cart
    let cartBoxElement=CartBoxComponent(title,price,imgSrc);
    let newNode= document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}
function removeCartItem(){
   this.parentElement.remove(); 
  itemsAdded =itemsAdded.filter(el=> el.title != this.parentElement.querySelector('.cart-product-title').innerHTML)
   update();
}
function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value =1;
    }
    // this is to ensure the qty value select is positive value
    this.value =Math.floor(this.value); 
    update();
}

function handle_buyOrder(){
    if(itemsAdded.length <=0){
        alert("There is No Order to Place Yet! \nPlease Make an Order First.");
        return;
    }

    // Confirmation Order
    // const cartContent =cart.querySelector(".cart-content");
    // cartContent.innerHTML ='';
    // alert("Your Order is placed Successfully :)");
    // update();
}

// Updating and Re-rendering
function updateTotal(){
    let cartBoxes=document.querySelectorAll('.cart-box'); 
    const totalElement= cart.querySelector('.total-price');
    let total=0;
    cartBoxes.forEach(cartBox=>{
        let priceElement=cartBox.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("$"," "));
        let quantity =cartBox.querySelector(".cart-quantity").value;
        total += price*quantity;
    } );

    // this is to ensure that it keeps two digits after the decimal point
    total =total.toFixed(2);
    totalElement.innerHTML ="$" +total;
}

//  HTML COMPONENTS
function CartBoxComponent(title , price,imgSrc){
    return `
    <div class="cart-box">
        <img src= ${imgSrc} alt="" class="cart-img" />
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity"> 
        </div>
        <!-- Removing Cart -->
        <i class='bx bxs-trash cart-remove'></i>
    </div>`;
}
                   