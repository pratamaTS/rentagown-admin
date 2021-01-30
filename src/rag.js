 /*SELECT 2*/
$(function () {
  //Initialize Select2 Elements
  $('.select2').select2()

  //Initialize Select2 Elements
  $('.select2bs4').select2({
    theme: 'bootstrap4'
  })
});

 //Gijgo DATE PICKER
 $(function () {
  var today, datepicker;
  today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  $('#si_date_id').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd-mm-yyyy',
      minDate: today
  });

  $('#so_date_id').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd-mm-yyyy',
      minDate: today
  });

  $('#rent_date_id').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd-mm-yyyy',
      minDate: today
  });

  $('#promo_start_id').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd-mm-yyyy',
      minDate: today
  });

  $('#promo_end_id').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd-mm-yyyy',
      minDate: today
  });
});


/*DATA TABLE*/
$(function () {
  $("#example1").DataTable({
    "responsive": true,
    "autoWidth": false,
  });
  $('#example2').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "responsive": true,
  });
});

// /*SHOW UPLOADED IMAGE*/
// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#imageResult')
//                 .attr('src', e.target.result);
//         };
//         reader.readAsDataURL(input.files[0]);
//     }
// }

// $(function () {
//     $('#upload').on('change', function () {
//         readURL(input);
//     });
// });

// /*SHOW UPLOADED IMAGE NAME*/
// var input = document.getElementById( 'upload' );
// var infoArea = document.getElementById( 'upload-label' );

// input.addEventListener( 'change', showFileName );
// function showFileName( event ) {
//   var input = event.srcElement;
//   var fileName = input.files[0].name;
//   infoArea.textContent = 'File name: ' + fileName;
// }

$(function () {
  var url = window.location;
  console.log('url', url.href);
  $('ul.nav-sidebar a').filter(function() {
    return this.href == url.href;
  }).addClass('active');

  $('ul.nav-treeview a').filter(function() {
    return this.href == url.href;
  }).parentsUntil(".nav-sidebar > .nav-treeview").addClass('menu-open').prev('a').addClass('active');
});
