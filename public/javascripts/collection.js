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


$(document).ready(function() {


    if (window.location.pathname === '/') {
        fetch('api/v1/Thesis?limit=3').then(function (res) {
            res.json().then(function (entries) {
                console.log('entries', entries);
                var tbody = document.getElementById('thesis-index');
                entries.forEach(function (entries) {
                    tbody.insertAdjacentHTML('beforeend', '<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries.added + '</span><h3><a href="/collection/' + entries._id + '">' + entries.thesis + '</a></h3><p>' + entries.sentence + '</p></div></div>');

                });
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
