$(document).ready(function(){
    ////
    ////Recherche multicriteres
    ////
    $('#recheche').click(function(){


        var critiere = {};

        var matricule = $('#mat').val();
        var client = $('#customer').val();
        var debut_contrat = $('#debut_contrat').val();
        var fin_contrat = $('#fin_contrat').val();
        var typeClient = $('#typeClient').val();

        critiere = {};
        var status = $("#status").attr('alt');




        if (matricule != "" && matricule != null)
            critiere['matricule'] = matricule;

        if (client != "" && client != '0')
            critiere['id_customer'] = client;

        if (debut_contrat != "" && debut_contrat != null)
            critiere['debut_contrat'] = debut_contrat;

        if (fin_contrat != "" && fin_contrat != null)
            critiere['fin_contrat'] = fin_contrat;

        if (typeClient != "" && typeClient != '0')
            critiere['typeClient'] = typeClient;

                critiere['status'] = status;



        $.get("/contrat/search/",
            critiere
            ,

            function (data, status) {

                $('tbody *').remove();
                $('tbody').prepend(data);


            });


    });
    ////
    ////Afficher le model d'ajouter
    ////
    $("#addContractModal").click(function()
    {
        var today = new Date();
        $("#client").val("0");
        $("#dated").val(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDay());
        $("#defaultAdvanced").val("");
        $("#defaultSimple").val("");
        $("#nbVehiclesAdvanced").val("");
        $("#nbVehiclesSimple").val("");
        $("#priceVehiclesAdvanced").val("");
        $("#priceVehiclesSimple").val("");
        $("#NbVehicles").text("");


    });
    ////
    ////Refresh sur tous les boutons
    ////
  /*  $('#refresh,#AddDetail,#BtnAlertCancelC,#AddDetailGamme,#btnCancel,#CancelContract,#ModfiyContract').click(function(){


           var status = $("#status").attr('alt');

        $.get("/contrat/refresh/"+status,{},function(data,status){

            $('tbody *').remove();
            $('tbody').prepend(data);
        });
    });
*/

    $("#AddRenGammeCC").click(function(){

        var id_detail=$('#id_detail').val();
        var nbVehiclesSimple = $('#nbVehiclesSimpleR').val();
        var nbVehiclesAdvanced = $('#nbVehiclesAdvancedR').val();
        var date = $('#datedR').val();
        var priceVehiclesSimple =  $('#priceVehiclesSimpleR').val();
        var priceVehiclesAdvanced =  $('#priceVehiclesAdvancedR').val();
        var defaultSimple = $("#defaultSimpleR").val();
        var defaultAdvanced = $("#defaultAdvancedR").val();

        /*   $('#NewVehicles option').each(function () {

              $('#NewVehicles option').attr('selected','true');

          });*/




        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/renewal/',
            type: 'POST',
            data: {
                id_detail: id_detail,
                nbVehiclesSimpleR: nbVehiclesSimple,
                nbVehiclesAdvancedR : nbVehiclesAdvanced,
                defaultSimpleR : defaultSimple,
                defaultAdvancedR : defaultAdvanced,
                priceVehiclesSimpleR : priceVehiclesSimple,
                priceVehiclesAdvancedR : priceVehiclesAdvanced,
                datedR :date,
                _token: $('#GammeToken').attr('value')
            },

            success: function (data, status) {


                var NewVehicles=[];
                $('#NewVehicles option').each(function(){
                    NewVehicles.push($(this).val());

                });

                var id_detail=$('#id_detail').val();

               // document.getElementById('add_dialog_ren').close();
                location.reload();


                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '/renewal/vehicles/',
                    type: 'POST',
                    data: {
                        NewVehicles: NewVehicles,
                        id_detail:id_detail,
                        _token: $('#GammeToken').attr('value')}

                    ,
                    success: function (data, status) {


                    }});
                //   }



            }});
    });

    ////
    //// Menu
    ////
    $('.submenu-toggle').click(function () {
        $(this).parent().children('ul.submenu').toggle(200);
    });
    ////
    //// Afficher le form de recherche
    ////
    $('#Rechercher').click(function () {
        if ($('#search_form').css('display')=='block')
            $('#search_form').css('display','none');
        else $('#search_form').css('display','block');
    });
    ////
    ////Ajouter un contrat
    ////
    $("#AddDetailGamme").click(function(){
        var typeAbonnement = $('#typeAbonnement').val();
        var nbVehiclesSimple = $('#nbVehiclesSimple').val();
        var nbVehiclesAvance = $('#nbVehiclesAdvanced').val();
        var date = $('#dated').val();
        var priceVehiclesSimple =  $('#priceVehiclesSimple').val();
        var priceVehiclesAvance =  $('#priceVehiclesAdvanced').val();
        var defaultSimple = $("#defaultSimple").val();
        var defaultAvance = $("#defaultAdvanced").val();

        var client = $('#client').val();

        if(nbVehiclesAvance!='' && nbVehiclesSimple!='' && date!='' && priceVehiclesAvance!='' && priceVehiclesSimple!='' && defaultAvance!='' && defaultSimple!='')
        {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '/contrat/addcontrat',
                type: 'POST',
                data: {
                    client: client,
                    nbVehiclesSimple: nbVehiclesSimple,
                    nbVehiclesAvance : nbVehiclesAvance,
                    defaultSimple : defaultSimple,
                    defaultAvance : defaultAvance,
                    priceVehiclesSimple : priceVehiclesSimple,
                    priceVehiclesAvance : priceVehiclesAvance,
                    dated :date,
                    _token: $('#ContratToken').attr('value')
                },

                success: function (data, status) {

                    location.reload();

                }
            });
        }
        else
            alert('Merci de renseigner tous les champs !! ');






    });

    ////
    ////Prix de type simple (model d'ajouter)
    ////

    $("#client").change(function () {

        var client = $("#client").val();
        $.get("/contrat/price/" + client, {}, function (data, status) {
            $("#defaultAdvanced").val(data.priceAvance);
            $("#defaultSimple").val(data.priceSimple);
            $("#NbVehicles").text(data.nbVehicles);
            $("#NbVehicles").attr('alt',data.nbVehicles);

        });
    });

    ////
    ////Prix de type avancé (model d'ajouter)
    ////
    $('#nbVehiclesAdvanced,#defaultAdvanced,#client option').change(function () {
        var defaultAvance = $("#defaultAdvanced").val();
        var nbVAd = $("#nbVehiclesAdvanced").val();
        var baseVehicles =  $("#NbVehicles").text();




        var result = defaultAvance * nbVAd;



        $("#priceVehiclesAdvanced").val(result);

    });

    ////
    ////Prix de type simple (model d'ajouter)
    ////

    $('#nbVehiclesSimple,#defaultSimple').change(function () {
        var defaultSimple = $("#defaultSimple").val();
        var nbVS = $("#nbVehiclesSimple").val();




        var result = defaultSimple * nbVS;

        $("#priceVehiclesSimple").val(result);


    });

    ////
    ////Prix de type avancé (model de modifier)
    ////

    $('#ModifynbVehiclesAdvanced,#ModifyDefaultAdvanced').change(function () {
        var defaultAvance = $("#ModifyDefaultAdvanced").val();
        var nbVAd = $("#ModifynbVehiclesAdvanced").val();


        var result = defaultAvance * nbVAd;

        $("#ModifyPriceAdvanced").val(result);

    });

    ////
    //// Prix de type simple (model de modifier)
    ////

    $('#ModifynbVehiclesSimple,#ModifydefaultSimple').change(function () {

        var defaultSimple = $("#ModifyDefaultSimple").val();
        var nbVS = $("#ModifynbVehiclesSimple").val();

        var result = defaultSimple * nbVS;


        $("#ModifyPriceSimple").val(result);


    });

    ////
    //// Modifier un contrat
    ////

    $("#ModfiyContract").click(function(){
        var nbvehiclesSimple = $("#ModifynbVehiclesSimple").val();
        var nbvehiclesAvance = $("#ModifynbVehiclesAdvanced").val();

        var priceAvance = $("#ModifyPriceAdvanced").val();
        var priceSimple = $("#ModifyPriceSimple").val();

        var defaultAvance = $("#ModifyDefaultAdvanced").val();
        var defaultSimple = $("#ModifyDefaultSimple").val();

        var datedModify = $("#datedModify").val();




        var client = $("#clientMaj").val();



        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/contract/Modify',
            data : {
                client : client,
                nbAvance : nbvehiclesAvance,
                nbSimple : nbvehiclesSimple,
                priceAvance : priceAvance,
                priceSimple : priceSimple,
                defaultAvance : defaultAvance,
                defaultSimple : defaultSimple,
                date :datedModify,
                _token : $("#ContratToken").attr('value')
            },
            type: 'POST',

            success: function (data, status) {
               ;
                var status = $("#status").attr('alt');

                location.reload();
                document.getElementById('edit_dialog').close()
            }

        });

    });


  //  $(function () {
    //    $('#debut_contrat').datetimepicker();
    //});



});
////
////Functions
////
////
////Afficher model de modifier
////

function editContratDialog(id) {

    $.get("/contrat/update/" + id, {}, function (data, status) {


        var contracts = data["contracts"];
        var date = contracts.start_contract;
        var customer = data["customer"];
        var priceAdvanced = contracts.defaultAvance * contracts.nbAvance;
        var priceSimple = contracts.defaultSimple * contracts.nbSimple;

        $("#datedModify").val(contracts.start_contract);
        $('#edit_dialog #dated').val(date);
        $('#ModifynbVehiclesAdvanced').val(contracts.nbAvance);
        $('#ModifyPriceAdvanced').val(priceAdvanced);
        $('#ModifynbVehiclesSimple').val(contracts.nbSimple);
        $("#ModifyPriceSimple").val(priceSimple);
        $("#ModifyDefaultAdvanced").val(contracts.defaultAvance);
        $("#ModifyDefaultSimple").val(contracts.defaultSimple);
        $("#ModifyNbVehicles").text(contracts.nbVehicles);






        $('#clientMaj option').remove();
        $('#clientMaj').append($('<option id="added"  value="' + customer.id + '">' + customer.name + '</option>'));



    })

}
////
////Desactiver un contrat
////
function disableContract(id)
{
    var result=confirm('Voulez-vous vraiment supprimer ce contrat');
    if(result==true)
    {
        $.get("/contrat/delete/"+id,{},function(data, status){


            $("#Contrat"+id).remove();
            var status = $("#status").attr('alt');

            location.reload();
        });
    }
}
