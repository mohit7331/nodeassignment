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

                })
            }
        )
        }
        else{
            alert("dang! no input")
        }
    })
})