let btnAjax = document.querySelector('.btnAjax')

btnAjax.addEventListener('click', e =>{
    let title = document.querySelector('.title').value;
    let content = document.querySelector('.content').value;
    let param = {
        'title':title,
        'content':content,
    }
    $.ajax({
        url: '/collection/test2',
        type: 'POST',
        headers:{
            'X-CSRFTOKEN' : '{{ csrf_token }}'
        },
        data: JSON.stringify(param),
        success:function(data){
            console.log(data);
        },
        error: function(){
            alert('안돼~')
        }
    });
});