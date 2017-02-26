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

$('#addItem').on('click', function(e){
    e.preventDefault();
    var href = document.getElementById('addThesisForm').getAttribute('action');
    var thesis = document.querySelector('[name="thesis"]').value;
    var subtitle = document.querySelector('[name="subtitle"]').value;
    var member1 = document.querySelector('[name="member1"]').value;
    var member2 = document.querySelector('[name="member2"]').value;
    var member3 = document.querySelector('[name="member3"]').value;
    var member4 = document.querySelector('[name="member4"]').value;
    var member5 = document.querySelector('[name="member5"]').value;
    var adviser1 = document.querySelector('[name="adviser1"]').value;
    var adviser2 = document.querySelector('[name="adviser2"]').value;
    var sentence = document.querySelector('[name="sentence"]').value;
    var description = document.querySelector('[name="description"]').value;
    var image = document.querySelector('[name="image"]').value;
    var youtube = document.querySelector('[name="youtube"]').value;
    var data = {
      "thesis": thesis,
      "subtitle": subtitle,
      "member1": member1,
      "member2": member2,
      "member3": member3,
      "member4": member4,
      "member5": member5,
      "adviser1": adviser1,
      "adviser2": adviser2,
      "sentence": sentence,
      "description": description,
      "image": image,
      "youtube": youtube
    };
    console.log(data);
    $.ajax({
      url: href,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function(){
      console.log('something goes here');
      $('#addAlertBox').html("<div class='col-md-offset-3 col-md-6 animate-box'><div class='alert alert-success'><i class='icon-check' style='font-size:15px; text-align:center'></i><strong>Request for adding entry sent! Waiting for approval.</strong></div></div>");
    }).fail(function(res){
      console.log('error message goes here');
      $('#addAlertBox').html("<div class='col-md-offset-3 col-md-6 animate-box'><div class='alert alert-danger'><i class='icon-check' style='font-size:15px'></i><strong>Error sending request to add entry! "+res.message+"</strong></div></div>");
    })
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
