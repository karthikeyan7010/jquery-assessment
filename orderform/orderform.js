$(document).ready(function() {
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
    // Add Button----------------------------------------------->>>>>
    $("#add").click(function() {
        count = count + 1;
        rows.push(count);
        var head = $('#table-head');
        var div = "<div id='order-row-" + count + "' class='row'>";
        var row = $('#fields').html();
        row = row.replace(/1/g, count);
        row = row
        div = div + row;
        div = div + '</div>'
        head.append(div);

    })

    // Reset Button --------------------------------------->>>>>>
    $('#clear').click(function() {
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
        if (rows.length < 5) {
            alert("Add Five colum");
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
                sor.sort();
                console.log(sor);
                $("#sor").text(sor)
                return;
            }
            sorting(sor);

            //Finding minimum And Maxmium------------------------------------------------------------>>>>>>

            function large(lar) {

                minValue = Math.min(...lar);
                maxValue = Math.max(...lar);
                console.log("min==" + minValue);
                console.log("max==" + maxValue);
                $("#lar").html("Minimum=" + minValue + "<br>" + "Maxmium=" + maxValue)
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
                    } else {
                        console.log(odd[i] + " is odd");
                        arr1.push(odd[i]);
                    };
                }

                $("#even").html("EvenNumber=" + arr + "<br>" + "OddNumber=" + arr1)

            }
            oddeven(odd)

            //Find vowels in given text ------------------------------------------------------------------------>>>>

            function countVowels(vow) {
                var arr1 = [];
                var name = "";
                // console.log(vow.length);
                // console.log(vow);
                var sent = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
                for (let i = 0; i < vow.length; i++) {
                    let counts = 0;
                    name = vow[i];
                    // console.log(name);

                    for (let j = 0; j < name.length; j++) {
                        if (sent.includes(name[j])) {
                            arr1.push(name[j]);
                        }
                    }
                    $("#vow").text(arr1)

                }
            }
            countVowels(vow);

        }
            table.css('display', 'block')


           $("#vow-id1").keypress(function (event) {
        var keyCode = event.which;
        if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) {
            return false;
        }
        return true;
    });


    })
})