
const deleteItem = (id) =>{
    console.log(id);
    $.get( "http://localhost:3000/admin/item/delete/", id );
}
