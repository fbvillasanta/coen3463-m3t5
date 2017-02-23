/**
 * Created by TEST on 2/6/2017.
 */
$('#searchbtn').on('click', function(e){
  e.preventDefault();
  var inputbox = document.getElementById("searchbox").value;
  inputbox = $.trim(inputbox);
  console.log(inputbox);
  if(inputbox != ""){
    fetch('api/v1/Thesis?query={"thesis":"~('+inputbox+')"}').then(function (res) {
        res.json().then(function (entries) {
            console.log('entries', entries);
            var tbody = document.getElementById('thesis-body');
            if(entries.length > 0){
              $('#thesis-body').html('');
              entries.forEach(function(entries){
                tbody.insertAdjacentHTML('beforeend','<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries.added + '</span><h3><a href="/collection/' + entries._id + '">' + entries.thesis + '</a></h3><p>' + entries.sentence + '</p></div></div>');
              });
            } else {
              alert('No thesis entry matches your search.');
            }
        })
    });
  } else {
    fetch('api/v1/Thesis?sort=_id').then(function(res) {
        res.json().then(function(entries) {
            console.log('entries', entries);
            var tbody = document.getElementById('thesis-body');
            $('#thesis-body').html('');
            entries.forEach(function(entries) {
                tbody.insertAdjacentHTML('beforeend', '<div class="col-md-3 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">'+entries.added+'</span><h3><a href="/collection/' + entries._id + '">'+entries.thesis+'</a></h3><p>'+entries.sentence+'</p></div></div>' );

            });
        })
    });
  }
});

$('#deleteItem').on('click', function(e){
    e.preventDefault();
    var href = document.getElementById('deleteItem').getAttribute('href');
    console.log(href);
    $.ajax({
      url: href,
      type:'DELETE'
    }).done(function(res){
      alert(res.message);
    }).fail(function(res){
      alert(res.message);
    });
});


$(document).ready(function() {


    if (window.location.pathname === '/') {
        fetch('api/v1/Thesis?sort=-_id').then(function (res) {
            res.json().then(function (entries) {
                console.log('entries', entries);
                console.log(entries[0].thesis);
                var tbody = document.getElementById('thesis-index');
                tbody.insertAdjacentHTML('beforeend', '<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries[0].added + '</span><h3><a href="/collection/' + entries[0]._id + '">' + entries[0].thesis + '</a></h3><p>' + entries[0].sentence + '</p></div></div>');
                tbody.insertAdjacentHTML('beforeend', '<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries[1].added + '</span><h3><a href="/collection/' + entries[1]._id + '">' + entries[1].thesis + '</a></h3><p>' + entries[1].sentence + '</p></div></div>');
                tbody.insertAdjacentHTML('beforeend', '<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries[2].added + '</span><h3><a href="/collection/' + entries[2]._id + '">' + entries[2].thesis + '</a></h3><p>' + entries[2].sentence + '</p></div></div>');
            })
        });
    }

    if (window.location.pathname === '/collection') {
        fetch('api/v1/Thesis?sort=_id').then(function(res) {
            res.json().then(function(entries) {
                console.log('entries', entries);
                var tbody = document.getElementById('thesis-body');
                entries.forEach(function(entries) {
                    tbody.insertAdjacentHTML('beforeend', '<div class="col-md-3 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">'+entries.added+'</span><h3><a href="/collection/' + entries._id + '">'+entries.thesis+'</a></h3><p>'+entries.sentence+'</p></div></div>' );

                });
            })
        });


        fetch('api/v1/Thesis/count').then(function(res) {
            res.json().then(function(count) {
                $('#collectiontitle').html("Total: <span><u>" + count.count+ "</u></span>  entries");
            });

        });

    }



});
