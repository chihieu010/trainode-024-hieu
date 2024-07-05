
const deleteItem = (id) =>{
    // $.get( "http://localhost:3000/admin/item/delete/", id );
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
              $.ajax({
        type: "get",
        url: `http://localhost:3000/admin/item/delete/${id}`,
        dataType: "json",
        success: function (data) {
            const {success} = data
            if (success) {
                window.location.reload()
            }
        }
    });
        }
      });

}
const changeStatus = (prefixAdmin, id, status) => {
    
    let newStatus = status === 'active' ? 'inactive' : 'active';
    const link = `http://localhost:3000/admin/${prefixAdmin}/changeStatus/${id}/${status}`;
    console.log(link);
    $.ajax({
        type: "get",
        url: link,
        dataType: "json",
        success: function () {
            let color = newStatus === 'active' ? 'success' : 'danger';
            let icon = newStatus === 'active' ? 'fa-check' : 'fa-times';
            xhtml = `<a href="javascript:changeStatus('${prefixAdmin}','${id}','${newStatus}')" class="rounded-circle btn btn-sm btn-${color}"><i class="fas ${icon}"></i></a>`
            $(`#status-${id}`).html(xhtml);
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500

});
        }
    });
}


$('.ordering').change(function (e) { 
    e.preventDefault();
    let id = $(this).data('id');
    let refix = $(this).data('refix');
    let ordering = $(this).val();
    const link = `http://localhost:3000/admin/${prefixAdmin}/changeOrdering/${id}/${ordering}`
    console.log(link);
$.get(link,
    function (data) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500    
    },
 "json"
);
});
})

   
