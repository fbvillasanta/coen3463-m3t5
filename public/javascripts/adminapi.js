// $('#deleteAdd').on('click', function(e){
//   e.preventDefault();

//   var val = $(this).parents('td').attr('id');
//   var $thisInput = $(this);
//   $.ajax({
//       url:'/admin/add/'+val,
//       type:'delete'
//     }).done(function(){
//       $thisInput.parents('tr').remove();
//     });

// });

$(document).ready(function() {

    if (window.location.pathname === '/admin') {
        fetch('api/v1/User?query={"type":"user"}').then(function(res) {
            res.json().then(function(entries) {
                console.log('entries', entries);
                var tbody = document.getElementById('table-body-users');
                $('#table-body-users').html('');
                if(entries.length > 0){
                  //tbody.insertAdjacentHTML('beforeend', '<table id="example1" class="table table-bordered table-stripes"><thead><tr><td>Username</td><td>Last Name</td><td>First Name</td><td>Email</td></tr></thead><tbody>');
                  entries.forEach(function(entries) {
                      tbody.insertAdjacentHTML('beforeend', '<tr><td>'+entries.username+'</td><td>'+entries.lastname+'</td><td>'+entries.firstname+'</td><td>'+entries.email+'</td></tr>' );
                  });
                  //tbody.insertAdjacentHTML('beforeend', '</tbody><tfoot><tr><td>Username</td><td>Last Name</td><td>First Name</td><td>Email</td></tr></tfoot></table>');
                } else {
                  tbody.insertAdjacentHTML('beforeend', '<tr class="odd"><td valign="top" colspan="3" class="dataTables_empty">No data available in table</td></tr>' );
                }    
            })
        });

        fetch('api/v1/User?query={"type":"admin"}').then(function(res) {
            res.json().then(function(entries) {
                console.log('entries', entries);
                var tbody = document.getElementById('table-body-admins');
                $('#table-body-admins').html('');
                entries.forEach(function(entries) {
                    tbody.insertAdjacentHTML('beforeend', '<tr><td>'+entries.username+'</td><td>'+entries.lastname+'</td><td>'+entries.firstname+'</td><td>'+entries.email+'</td></tr>' );
                });
            })
        });
    }

    if (window.location.pathname === '/admin/add') {
        fetch('api/v1/Request?query={"type":"add"}').then(function(res) {
            res.json().then(function(entries) {
                console.log('entries', entries);
                var tbody = document.getElementById('table-body-add');
                $('#table-body-add').html('');
                if(entries.length > 0){
                  entries.forEach(function(entries) {
                      tbody.insertAdjacentHTML('beforeend', '<tr><td>'+entries.username+'</td><td><ul><li><b>Title:</b> '+entries.details.thesis+'</li>');
                      // if(entries.details.subtitle !== ""){
                      //   tbody.insertAdjacentHTML('beforeend', '<li><b>Subtitle:</b> '+entries.details.subtitle+'</li>');
                      // }
                      // tbody.insertAdjacentHTML('beforeend', '<li><b>Description:</b> '+entries.details.description+'</li><li><b>Researchers:</b> ');
                      // for(i=0; i<5; i++){
                      //   if(entries.details.members[i] !== ""){
                      //     tbody.insertAdjacentHTML('beforeend', '<i>'+entries.details.members[i]+'</i> | ');
                      //   }
                      // }
                      // tbody.insertAdjacentHTML('beforeend', '</li><li><b>Advisers:</b> ');
                      // for(i=0; i<2; i++){
                      //   tbody.insertAdjacentHTML('beforeend', '<i>'+entries.details.advisers[i]+'</i> | ');
                      // }
                      // tbody.insertAdjacentHTML('beforeend', '</li><li><b>Image link:</b> '+entries.details.image+'</li>');
                      // if(entries.details.youtube !== ""){
                      //   tbody.insertAdjacentHTML('beforeend', '<li><b>Youtube link:</b> '+entries.details.youtube+'</li>');
                      // }
                      //tbody.insertAdjacentHTML('beforeend', '</td><td id="'+entries._id+'"><form method="post" action="/admin/add/'+entries._id+'"><button type="submit" value="accept" name="btn" id="approveAdd" class="btn btn-success btn-flat">Approve</button><button type="submit" value="DELETE" name="_method" id="deleteAdd" class="btn btn-danger btn-danger">Delete</button></form></td></tr>');

                  });
                } else {
                  tbody.insertAdjacentHTML('beforeend', '<tr class="odd"><td valign="top" colspan="3" class="dataTables_empty">No data available in table</td></tr>' );
                }    
            })
        });
    }

});

