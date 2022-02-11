var list=[];
flag = -1;

$(document).ready(function(){
    $('#add_product').click(function(){
        console.log("clicked"); 
        var p_sku= $('#product_sku').val();
        var p_nam= $('#product_name').val();
        var p_price=$('#product_price').val();
        var p_quan=$('#product_quantity').val();
        if (checkValues(p_sku, p_nam, p_price, p_quan) && idValidate(p_sku, list)){
            var product = {};
            if (flag == -1){
                product.p_sku=p_sku;
                product.p_nam=p_nam;
                product.p_price=p_price;
                product.p_quan=p_quan;
        
                list.push(product);
                
                console.log(list)
                display(); 
                $('.success').css('display', 'block');
                $('.error').css('display', 'none');
            }
            
        }
        else{
            $('.error').css('display', 'block');
            $('.success').css('display', 'none');
        }

        
    }) ;
    $('#update_product').click(function(){
        console.log("clicked"); 

       var p_sku= $('#product_sku').val();
       var p_nam= $('#product_name').val();
       var p_price=$('#product_price').val();
       var p_quan=$('#product_quantity').val();

       var product = {};

       product.p_sku=p_sku;
       product.p_nam=p_nam;
       product.p_price=p_price;
       product.p_quan=p_quan;

       updateProduct(product);
       display(); 
   }) ;
});
$('#product_list').on('click','.edit',function(){
    var pid=$(this).data('pid');
    var product= editProduct(pid);
    console.log('obj =='+product)
    $('#product_sku').val(product.p_sku);
    $('#product_name').val(product.p_nam);
    $('#product_price').val(product.p_price);
    $('#product_quantity').val(product.p_quan);

    $('.frmbtn').toggle();  //for switching button from add_p to Update
    
    // console.log("clicked on edit="+pid);
});
$('#product_list').on('click','.delete',function(){
    var pid=$(this).data('pid');
    
    for(i=0;i<list.length;i++){
        if(pid==list[i].p_sku){
            pid.splice(i,1);
            display();
        }
    }
    // console.log("clicked on delete="+pid);
});
function editProduct(pid){
    for (i=0;i<list.length;i++){
        if(pid=list[i].p_sku){
            return list[i];
        }
    }
}

function updateProduct(pproduct){
    for (i=0;i<list.length;i++){
        if(pproduct.p_sku==list[i].p_sku){
        list[i]=pproduct;}
}}

function display(){
    var html=""
    html+="<table>\
            <tr>\
            <th>Product SKU</th> <th>Product Name</th> <th>Product Price</th> <th>Product Quantity</th><th>Action</th>\
            </tr>"
    
    for (var i=0; i<list.length;i++){
        html+= "<tr>\
                <td>"+list[i].p_sku+"</td>\
                <td>"+list[i].p_nam+"</td>\
                <td>"+list[i].p_price+"</td>\
                <td>"+list[i].p_quan+"</td>\
                <td>\
                <a href='#' class='edit' data-pid='"+list[i].p_sku+"'>Edit</a>\
                <a href='#' class='delete'  data-pid='"+list[i].p_sku+"'>Delete</a>\
                </td>\
            </tr>";
    }
    html+="</table>";
    $('#table').html(html);
}

function checkValues(p_sku, p_name, p_price, p_qty){
    if (p_sku == "" || isNaN(p_sku)){
        $('#product_sku').css('border', 'red 3px solid');
        return false;
    }
    else if(p_name == "" ){
        $('#product_name').css('border', 'red 3px solid');
        return false;
    }
    else if(p_price == "" || isNaN(p_price)){
        $('#product_price').css('border', 'red 3px solid');
        return false;
    }
    else if(p_qty == "" || isNaN(p_qty)){
        $('#product_quantity').css('border', 'red 3px solid');
        return false;
    }
    else{
        return true;
    }
}

function idValidate(p_sku, products){
    for (var i = 0; i<products.length; i++){
        if (p_sku == products[i].sku){
            return false;
        }
    }
    return true;
}