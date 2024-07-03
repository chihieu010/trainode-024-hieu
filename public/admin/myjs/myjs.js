
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

   
