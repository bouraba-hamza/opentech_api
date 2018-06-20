$(document).ready(function(){


    ////
    //// Calcul de prix (model ajouter)
    ////

    $("#types,#AddingDate").change(function () {

        var date = $("#AddingDate").val();
        var imei = $("#vehicules").val();
        var types = $("#types").val();





        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/contrat/detail/price/calcul',

            type: 'POST',
            data: {
                AddingDate : date,
                types: types,
                vehicules :imei,
                _token: $('#VehicleToken').attr('value')
            },

            success: function (data, status) {
                $("#priceVehicles").val(data);
            }

        });


    });
    ////
    //// Calcul de prix ( model modifier)
    ////
    $("#typesEdit,#AddingDateEdit").change(function () {

        var date = $("#AddingDateEdit").val();
        var imei = $("#imeiId").val();
        var types = $("#typesEdit").val();
        var idContrat = $(".body").attr('alt');






        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/contrat//detail/price/calculEdit',

            type: 'POST',
            data: {
                AddingDateEdit : date,
                typesEdit: types,
                imeiId :imei,
                _token: $('#EditVehicleToken').attr('value')
            },

            success: function (data, status) {
                console.log(data);
                $("#priceVehiclesEdit").val(data);
            }

        });


    });

    ////
    //// Afficher model ajouter
    ////

    $("#AddDetailModal").click(function(){



        $("#vehicules").val("");
        $("#AddingDate").val();
        $("#types").val("0");
        $("#priceVehicles").val("");



    });

    ////
    //// refresh
    ////

    $("#refreshDetail,#editVehicleBtn,#CancelEditModel,#addVehicleBtn2").click(function(){

      //  location.reload();

    });
    ////
    //// Modifier un vehicule
    ////
    $("#editVehicleBtn").click(function(){
        var date = $("#AddingDateEdit").val();
        var imei = $("#imeiId").val();
        var price=$('#priceVehiclesEdit').val();
        var type = $("#typesEdit").val();




        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/contract/detail/Modify',
            data : {
                AddingDateEdit : date,
                imeiId : imei,
                typesEdit : type,
                priceVehiclesEdit : price,
                _token : $("#EditVehicleToken").attr('value')
            },
            type: 'POST',

            success: function (data, status) {
                var id = $('.body').attr('alt');

                location.reload();
                document.getElementById('edit_dialog').close();
            }

        });

    });

    ////
    //// Recherche multicritere
    ////

    $("#ContratInfosearch").click(function(){
        var model = $("#model").val();
        var marque = $("#marque").val();
        var type_abonnement = $("#type_abonnement").val();
        var imei = $("#imei").val();
        var date = $("#dateAjout").val();
        var idContract = $(".body").attr('alt');

        critiere = {};

        critiere['idContract'] = idContract;

        if (imei != "" &&  imei != null)
            critiere['imei'] = imei;

        if (type_abonnement != "" && type_abonnement != '0')
            critiere['type_abonnement'] = type_abonnement;

        if (marque != "" && marque != null)
            critiere['marque'] = marque;

        if (model != "" && model != null)
            critiere['model'] = model;

        if (dateAjout != "" && dateAjout != null)
            critiere['dateAjout'] = date;

        console.log(critiere);

        $.get("/detail/search/",critiere,function(data, status){

            console.log(data);
            $('#tableBody *').remove();
            $('#tableBody').prepend(data);
        });


        $("#model").val('');
        $("#marque").val('');
        $("#type_abonnement").val("0");
        $("#imei").val('');
        $("#dateAjout").val();


    });
});
    ////
    //// Afficher model modifier
    ////

    function editDetail(id) {





        $.get("/details/info/" + id, {}, function (data, status) {

            var detail = data["detail"];


            $("#imeiId").val(detail.imei);
            $("#AddingDateEdit").val(detail.AddingDate);
            $("#typesEdit").val(detail.id_subscribe);
            $("#priceVehiclesEdit").val(detail.price);
        })

    }

    ////
    //// Ajouter un vehicule
    ////

    function AddVeihcles(idDetail) {
        if($("#vehicules").val()!= '' && $("#types").val()!='' && $("#priceVehicles").val()!='' && $('#AddingDate').val()!='')
        {
            var idType=$('#types').val();

            $.get("/contrat/detail/verifyType/"+idDetail+"/"+idType,{},function (data,status) {
                if(data==0)
                {
                    alert("Merci de changer le type");
                }
                else {


                    var imei = $("#vehicules").val();
                    var typeSubscribe=$("#types").val();
                    var price=$("#priceVehicles").val();
                    var date=$('#AddingDate').val();
                    var  inputs = [ 'vehicles','types','priceVehicles','addingDate'];
                    for(var j = 0;j<inputs.length;j++)
                    {


                        if ($('#Err' + inputs[j]).length) {


                            $('#Err' + inputs[j]).remove();

                        }





                    }


                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: 'http://127.0.0.1:8000/contract/addVehicule/',
                        type: 'POST',
                        data: {
                            vehicules: imei,
                            types: typeSubscribe,
                            priceVehicles: price,
                            AddingDate:date,
                            _token : $('#VehicleToken').attr('value')
                        },
                        success: function (data, status) {
                            var id = $('.body').attr('alt');
                            var  inputs = [ 'vehicles','types','priceVehicles','addingDate' ];
                            console.log(data.dated);
                            for(var j = 0;j<inputs.length;j++)
                            {


                                if ($('#Err' + inputs[j]).length) {


                                    $('#Err' + inputs[j]).remove();

                                }


                                location.reload();




                            }



                        },
                        error: function (jqXhr) {
                            if (jqXhr.status === 422) {
                                var errors = jqXhr.responseJSON;

                                console.log(errors);

                                var l = 0;
                                $.each(errors.message, function (key, value) {
                                    // errorsHtml += '<li>' + value[0] + '</li>'; //showing only the first error.

                                    if ($('#Err' + key).length) {
                                        //$('#Err' + key).html(value);

                                        $('#Err' + key).text(value);
                                    }
                                    else {
                                        $("#" + key).parent().append("<small id='Err" + key + "' class='text-danger'> " + value + "</small>");
                                        l++;

                                    }
                                });


                                // $( '#form-errors' ).html( errorsHtml );

                            }
                        }

                    })



                }
            })
        }
        else
            alert('Merci de renseigner tous les champs !! ');
    }
    ////
    ////Modifier un vehicule
    ////
function AddVeihcles(idDetail) {
    if($("#vehicules").val()!= '' && $("#types").val()!='' && $("#priceVehicles").val()!='' && $('#AddingDate').val()!='')
    {
        var idType=$('#types').val();

        $.get("/contrat/detail/verifyType/"+idDetail+"/"+idType,{},function (data,status) {
            if(data==0)
            {
                alert("Merci de changer le type");
            }
            else {


                var imei = $("#vehicules").val();
                var typeSubscribe=$("#types").val();
                var price=$("#priceVehicles").val();
                var date=$('#AddingDate').val();
                var  inputs = [ 'vehicles','types','priceVehicles','addingDate'];
                for(var j = 0;j<inputs.length;j++)
                {


                    if ($('#Err' + inputs[j]).length) {


                        $('#Err' + inputs[j]).remove();

                    }





                }


                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: 'http://127.0.0.1:8000/contract/addVehicule/',
                    type: 'POST',
                    data: {
                        vehicules: imei,
                        types: typeSubscribe,
                        priceVehicles: price,
                        AddingDate:date,
                        _token : $('#VehicleToken').attr('value')
                    },
                    success: function (data, status) {
                        var id = $('.body').attr('alt');
                        var  inputs = [ 'vehicles','types','priceVehicles','addingDate' ];
                        console.log(data.dated);
                        for(var j = 0;j<inputs.length;j++)
                        {


                            if ($('#Err' + inputs[j]).length) {


                                $('#Err' + inputs[j]).remove();

                            }


                            location.reload();




                        }



                    },
                    error: function (jqXhr) {
                        if (jqXhr.status === 422) {
                            var errors = jqXhr.responseJSON;

                            console.log(errors);

                            var l = 0;
                            $.each(errors.message, function (key, value) {
                                // errorsHtml += '<li>' + value[0] + '</li>'; //showing only the first error.

                                if ($('#Err' + key).length) {
                                    //$('#Err' + key).html(value);

                                    $('#Err' + key).text(value);
                                }
                                else {
                                    $("#" + key).parent().append("<small id='Err" + key + "' class='text-danger'> " + value + "</small>");
                                    l++;

                                }
                            });


                            // $( '#form-errors' ).html( errorsHtml );

                        }
                    }

                })



            }
        })
    }
    else
        alert('Merci de renseigner tous les champs !! ');
}

    ////
    //// Supprimer un vehicule
    ////

function disableDetail(idDet,idCon)
{

    var result=confirm('Voulez-vous vraiment supprimer ce vehicule ?');
    if(result==true)
    {
        $.get("/detail/delete/"+idDet,{},function(data, status){


            $("#Detail"+idDet).remove();
            location.reload();

        });
    }

}