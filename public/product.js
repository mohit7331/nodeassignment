$(()=>{

    function refreshlist(){
        $.get('/product',(data)=>{

            $('#productlist').empty()

            for(let pro of data)
            {
                $('#productlist').append(
                    `<li> ${pro.Name} : price ${pro.Price}
                    <button onclick="$.ajax({
                    url : '/product/${pro.id}',
                    type: 'DELETE',
                    success: function(result) {
                    console.log(result.success)
                    if(result.success){
                    location.reload(true)
                    }
                    }
                    }) ">Delete</button></li>`
                )
            }

        })
    }


 
        $.get('/vendors',(data)=>{
            console.log(data)
            let vendorname=document.getElementById('vendorname');
            for(let ven of data)
            {
                let option = document.createElement('option')
                option.text = ven.Name;
                option.value= ven.id
                vendorname.append(option)
            }
        })

    refreshlist()
    
function check(inp)
{
if(inp ==='')
return false;
else
return true;
} 


    $('#addproduct').click(()=>{
        if(check($('#productname').val()))
        {
            $.post(
            '/product',
            {
                name: $('#productname').val(),
                price: $('#productprice').val()
            },
            (data)=>{
                if(data.success){
                    refreshlist()
                }
                else{
                    alert('dang! some error occurred')
                }
            }
        )
        }
        else{
            alert("dang! no input")
        }
    })
})