$(()=>{

    function refreshlist(){
        $.get('/vendors',(data)=>{

            $('#vendorlist').empty()

            for(let ven of data)
            {
                $('#vendorlist').append(
                    `<li> ${ven.Name} 
                    <button onclick="$.ajax({
                    url : '/vendors/${ven.id}',
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


    refreshlist()
    
function check(inp)
{
if(inp ==='')
return false;
else
return true;
} 
 

    $('#addvendor').click(()=>{
        if(check($('#vendorname').val()))
        {
            $.post(
            '/vendors',
            {
                name: $('#vendorname').val()
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