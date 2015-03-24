/**
 * Created by baptiste on 2015-03-23.
 */
function deleteItem(itemId) {
    var url = 'http://localhost:1337/delete/'+itemId;
    console.log('url:', url);
    $.ajax({
        url: url,
        success: function(data) {
            console.log('success : ', data);
        },
        fail: function(data) {
            console.log('fail : ', data);
        }
    });
}