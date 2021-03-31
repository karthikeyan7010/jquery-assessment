$(document).ready(function(){

   

    $("#btn-add").click(function(){

        var pro_name = $("#pro-name").val();
        var pro_skew = $("#pro-skew").val();
        var pro_price = $("#pro-price").val();
        var pro_qunty = 0;

        var total = {"pro_name" : pro_name, "pro_skew" : pro_skew, "pro_price" : pro_price, 'pro_qunty' : pro_qunty};

        var aNumber = !!localStorage.getItem('json_data') ? JSON.parse(localStorage.getItem('json_data')) : [];
        aNumber.push(total);
        localStorage.setItem('json_data', JSON.stringify(aNumber));
        
        location.reload(true);
        
        var content = "<tr><td>"+ "<input type='text' value="+ aNumber[i].pro_name +" class='update-name'>" +"</td><td>"+ "<input type='text' value="+aNumber[i].pro_skew+" class='update-skew'>" +"</td><td>" + "<input type='text' value="+aNumber[i].pro_price+" class='update-price'>" +"</td><td><div class='quantity'><button class='minus press'><i class='fas fa-minus'></i></button><input type='text' name='qunty' id='qunty' class='qunty' value="+ aNumber[i].pro_qunty +"><button class='plus press'><i class='fas fa-plus'></i></button></div></td><td><button class='btn btn-danger btn-custom pro-remove' value="+i+">Remove</button><button class='btn btn-secondary btn-custom pro-update'value="+i+">Update</button></td></tr>";

        $(".product-table tbody").append(content);

        $("#pro-name").val("");
        $("#pro-skew").val("");
        $("#pro-price").val("");       

    });

  

    $("#btn-remove").click(function(){
        $(".product-table").find("tr").not(".main-tr").remove();
        localStorage.removeItem("json_data");
    });      

    

    var i = 1;

    $(".cart").click(function(){
        
        var cart = $("#val").text(i++).css("display","block");
        var tot = cart.text();
        var cart_val = localStorage.setItem("cart_value", JSON.stringify(tot));
        var text = localStorage.getItem("cart_value");
        obj = JSON.parse(text);
        $("#val").text(obj).css("display","block");
    });

   

    $(".pro-remove").click(function(){

        var aNumber = !!localStorage.getItem('json_data') ? JSON.parse(localStorage.getItem('json_data')) : [];
        var va = $(this).val();
        aNumber.splice(va, 1);
        localStorage.setItem('json_data', JSON.stringify(aNumber));
        location.reload(true);

    });

    
    $(".pro-update").on("click",function(){

        var update_name = $(this).parents("tr").find(".update-name").val();
        var update_skew = $(this).parents("tr").find(".update-skew").val();
        var update_price = $(this).parents("tr").find(".update-price").val();
        var update_qunty = $(this).parents("tr").find(".qunty").val();

        var total1 = {"pro_name" : update_name, "pro_skew" : update_skew, "pro_price" : update_price, "pro_qunty" : update_qunty};

        var va = $(this).val();

        var aNumber = !!localStorage.getItem('json_data') ? JSON.parse(localStorage.getItem('json_data')) : [];

        aNumber[va] = total1;

        localStorage.setItem('json_data', JSON.stringify(aNumber));
        location.reload(true);

    });


    $(".row").on("click", ".plus", function(){
        var $n = $(this).parent(".quantity").find(".qunty");
        $n.val(Number($n.val())+1 );
    });

    
    $(".row").on("click", ".minus", function(){
        var $n = $(this).parent(".quantity").find(".qunty");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount-1);
        }
    });

    

    $(".row").on("click", ".plus", function(){
        var max = $(this).parent(".quantity1").find(".qunty").attr("max");
        var $n = $(this).parent(".quantity1").find(".qunty");
        var amount = Number($n.val());
        if (amount < max) {
            $n.val(amount+1);
        }
    });



    $(".row").on("click", ".minus", function(){
        var $n = $(this).parent(".quantity1").find(".qunty");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount-1);
        }
    });

   

});



var text = localStorage.getItem("cart_value");
obj = JSON.parse(text);
$("#val").text(obj).css("display","block");


var aNumber = !!localStorage.getItem('json_data') ? JSON.parse(localStorage.getItem('json_data')) : [];

for (var i = 0; i < aNumber.length; i++) {

   

    var content = "<tr><td>"+ "<input type='text' value="+aNumber[i].pro_name+" class='update-name'>" +"</td><td>"+ "<input type='text' value="+aNumber[i].pro_skew+" class='update-skew'>" +"</td><td>" + "<input type='text' value="+aNumber[i].pro_price+" class='update-price'>" +"</td><td><div class='quantity'><button class='minus press'><i class='fas fa-minus'></i></button><input type='text' name='qunty' id='qunty' class='qunty' value="+ aNumber[i].pro_qunty +"><button class='plus press'><i class='fas fa-plus'></i></button></div></td><td><button class='btn btn-danger btn-custom pro-remove' value="+i+">Remove</button><button class='btn btn-secondary btn-custom pro-update'value="+i+">Update</button></td></tr>";
   
    $(".product-table tbody").append(content);


    $("#row").append("<div class='col-6 col-sm-4 col-md-3'><div class='pro-container'><h1 class='pro-title'>"+ aNumber[i].pro_name+"</h1><a href='pdp.html' target='_blank'><img src='pros.jpg' class='pro-img'></a><p class='pro-spec'>"+ aNumber[i].pro_skew +"</p><p class='pro-price'>"+ aNumber[i].pro_price +"</p><div class='quantity1'><button class='minus press'><i class='fas fa-minus'></i></button><input type='text' name='qunty' id='qunty' class='qunty' value='0' max="+ aNumber[i].pro_qunty +"><button class='plus press'><i class='fas fa-plus'></i></button></div><span class='cart'>"+ "Add to Cart" +"</span></div></div>");


}