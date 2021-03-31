<!DOCTYPE html>
<html lang="en">
<head>
  <title>Filter or Search Record with range Slider using jQuery AJAX with PHP Mysql</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
</head>
<body>
<style type="text/css">
  .ui-widget-header{
    background: #6734eb;
  }
  .ui-state-default{
    background: #667561;
  }
  .table th {
    text-align: center;
  } 
</style>
<div class="card text-center" style="padding:20px;">
  <h3>Filter or Search Record with range Slider using jQuery AJAX with PHP Mysql</h3>
</div><br>
  
<div class="container">
  <div class="row">
    <div class="col-md-12 col-sm-12">
        <p>
          <label for="amount">Product Price Filter:</label>
          <span id="amount" style="border:0; color:#00008B; font-weight:bold;"></span>
        </p>
      <div id="slider-range"></div><br>

      <table class="table table-striped" id="tableData">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Product code</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

<script type="text/javascript">
  $(document).ready(function(){

    var v1 = 1000;
    var v2 = 30000;

    $("#slider-range").slider({
      range: true,
      min: 18,
      max: 30,
      values: [v1, v2],
      slide: function(event, ui) {
          $("#amount").html( "Age" + ui.values[ 0 ] + " - Age" + ui.values[ 1 ] );
          v1 = ui.values[ 0 ];
          v2 = ui.values[ 1 ];
          loadRecords(v1, v2);
        }
    });

    $("#amount").html("Age" + $("#slider-range" ).slider( "values", 0 ) + " - Age" + $("#slider-range").slider("values", 1));

    function loadRecords(range1, range2){
      $.ajax({
        url : "action.php",
        type: "POST",
        data : {minAge : range1, maxAge : range2},
        cache:false,
        success:function(result){
          $("#tableData tbody").html(result);
        }
      });
    }
    loadRecords(v1, v2);
  });
</script>
