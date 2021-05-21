$(document).ready(function () {
    var count = 1;
    var rows = [1];
    var displayTable = false;
    var table = $('#table1');
    var tableBody = $("#table-body")
    var tableBody = $('#table-body');
    if (displayTable) {
        table.css('display', 'block');
    } else {
        table.css('display', 'none');
    }

//Block the number in the input box--------------------------------->>>>>>>
      $(function () {
        $(document).on('keydown',".txtNumeric", function(e){ 
            
            console.log(e);

         if (e.shiftKey || e.ctrlKey || e.altKey) {
         e.preventDefault();
        } else {
    var key = e.keyCode;
    if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
e.preventDefault();
}
}
});
});


    
    // Add Button----------------------------------------------->>>>>
    $("#add").click(function () {
        count = count + 1;
        rows.push(count);
        console.log(rows)
        var head = $('#table-head');
        var div = "<div id='order-row-" + count + "' class='row'>";
        var row = $('#fields').html();
        row = row.replace(/1/g, count);
        row = row + '<button type="button" class="del-btn" value="'+ count+'">x</button>';
        div = div + row;
        div = div + '</div>'
        head.append(div);
    })

    $(document).on('click', '.del-btn', function (event) {
        let id = $(event.currentTarget).val();
        var removeDivID = "#order-row-" + id;
        $(removeDivID).remove();
    });

    // Reset Button --------------------------------------->>>>>>
    $('#clear').click(function () {
        for (let i = 0; i < rows.length; i++) {
            $("#order-row-" + rows[i]).remove();
        }
        rows = [1];
        table.css('display', 'none');
        tableBody.html('');
        $('#odd-id1').val('');
        $('#vow-id1').val('');
        $('#sor-id1').val('');
        $("#lar-id1").val('');
    })
    // Submit Button-------------------------->>>>>
    $("#submit").click(function() {

        //Adding More Then Five Rows----------->>>>>
         if ($(".row").length <= 3) {
            alert("Add Five Rows");
            return false
        }
        var odd = [];
        var vow = [];
        var sor = [];
        var lar = [];
        for (let i = 1, j = 0; i <= rows.length; i++, j++) {
            odd[j] = $('#odd-id' + i).val();
            vow[j] = $('#vow-id' + i).val();
            sor[j] = $('#sor-id' + i).val();
            lar[j] = $("#lar-id" + i).val();

          //  Requried Fields--------------------------------------------------->>>>>

            if (odd[j] == "" || vow[j] == "" || sor[j] == "" || lar[j] == "") {
                alert("All input fields are requried")
                return false
                }

            


            //Sorting the array---------------------------------------------------------------->>>>>>>>       
            function sorting(sor) {
           var temp = 0;
         for (var i = 0; i < sor.length; i++)   
         {  
         
            for (var j = i+1; j < sor.length; j++)    
            {     
               if(sor[i] > sor[j]) 
               {    
                
                   temp = sor[i];    
                   sor[i] = sor[j];    
                   sor[j] = temp; 
                    $("#sor").html(sor)  
                   
               }     
            }     
        }    
          
}
sorting(sor);

            //Finding minimum And Maxmium------------------------------------------------------------>>>>>
           function large(lar) {
              var max =lar[0];
              var min =lar[0];
              for (var i=1;i<lar.length;i++)
              {
                if(lar[i]>max)
                    max=lar[i];
              }
             console.log("max=="+max)
             for (var i=1;i<lar.length;i++)
             {
                if(lar[i]<min)
                    min=lar[i];
             }
             console.log("min=="+min)
             $("#lar").html("Minimum=" + min + "<br>" + "Maxmium=" + max)
             }
         
            large(lar);
            // ODD And Even------------------------------------------------------------------------------->>>>
            function oddeven(odd) {
                var arr = [];
                var arr1 = [];
                for (let i = 0; i < odd.length; i++) {
                    if (odd[i] % 2 === 0) {
                        console.log(odd[i] + " is even");
                        arr.push(odd[i]);
                    } 
                    else {
                        console.log(odd[i] + " is odd");
                        arr1.push(odd[i]);
                    }
                    
                }

                $("#even").html("EvenNumber=" + arr + "<br>" + "OddNumber=" + arr1)

            }
            oddeven(odd)

            //Find vowels in given text ------------------------------------------------------------------------>>>>

            function countVowels(vow) {
            var arr1=[];
            var name="";
            var ch= "";
            for(var i=0;i<vow.length;i++)
            {
                name =vow[i];
                if(name !=null)
                for(var j=0;j<name.length;j++)

                {

                    ch=name[j];
                    if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||ch=='A'||ch=='E'||ch=='O'||ch=='U')
                    {
                        arr1.push(ch);
                    }

                }
               
            }
             if(arr1=="")
                {
                    alert("Fill the vowels Block");
                }
            $("#vow").text(arr1);
            }
            countVowels(vow);

        
            table.css('display', 'block')
}
    })
})