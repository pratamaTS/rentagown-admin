$(function () {

  /* Chart.js Charts */
  // Sales graph chart
  var salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesGraphChartData = {
    labels  : ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    datasets: [
      {
        label               : 'Total Gown Rent',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
        spanGaps : true,
        borderColor         : '#c9a474',
        pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#c9a474',
        pointBackgroundColor: '#c9a474',
        data                : [2666, 2778, 4912, 3767, 6810, 5670, 4820, 15073, 10687, 8432]
      }
    ]
  }

  var salesGraphChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks : {
          fontColor: '#c9a474',
        },
        gridLines : {
          display : false,
          color: '#c9a474',
          drawBorder: false,
        }
      }],
      yAxes: [{
        ticks : {
          stepSize: 5000,
          fontColor: '#c9a474',
        },
        gridLines : {
          display : true,
          color: '#dedede',
          drawBorder: false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesGraphChart = new Chart(salesGraphChartCanvas, { 
      type: 'line', 
      data: salesGraphChartData, 
      options: salesGraphChartOptions
    }
  )
  });

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