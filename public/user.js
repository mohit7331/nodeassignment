$(()=>{


    
function check(inp)
{
if(inp ==='')
return false;
else
return true;
} 


    $('#adduser').click(()=>{
        if(check($('#username').val()))
        {
            $.post(
            '/user',
            {
                name: $('#username').val(),
                
            },
            (data)=>{
                console.log(data)
                $.get('/product', (data)=>{
                    $('#prolist').empty()
                    for(let pro of data){
                        $('#prolist').append(
                            `<li> ${pro.Name} : price ${pro.Price}
                            <button id=${pro.id} onclick="add2cart(${data.id},${pro.id})">Add2cart</button>`
                        )
                    }

                })
            }
        )
        }
        else{
            alert("dang! no input")
        }
    })



    //----------------------


    function add2cart(userid,proid){
        $.post('/additem',{
            uid:userid,
            pid:proid
        },(data)=>{
            
        })
    }
})