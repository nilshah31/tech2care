function printBarCode(pName,oName,oDate,order_id,mrn){
  $("#patient_name").text(pName);
  $("#order_name").text(oName);
  $("#order_date").text(oDate);
  $("#patient_mrn").text(mrn);
  $("#order_id").val(order_id);
  $("#barcode").barcode(
    mrn,
    "std25",
    { showHRI: true, barWidth: 2, barHeight: 100   }
  );
  $( "#dialog-confirm" ).dialog({
    resizable: false,
    height: "auto",
    width: 450,
    modal: true,
    buttons: {
      "Yes": function() {
        printDiv('barcode');
        $('#sample_collection_form').submit();
      },
      "No": function() {
        $('#sample_collection_form').submit();
      }
    }
  });
}
function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}
