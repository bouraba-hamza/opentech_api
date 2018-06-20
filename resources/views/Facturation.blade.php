@extends('layout')

@section('title', 'Contrat')

@section('import')
    @parent



    <link rel="stylesheet" href="/css/form.css" />
    <link rel="stylesheet" href="/css/select.css" />
    <script  src="/js/contract.js"></script>

    <script  src="/js/select.js"></script>
    <script  src="/js/alert.js"></script>

    <link rel="stylesheet" href="/css/alerte.css"/>



    <style>
        #search_input
        {
            width: 17%;
            margin-left: 4%;
        }

        #Detail*:hover { background:red; }
    </style>
@endsection


@section('sidebar')
    @parent

@endsection

@section('content')
    <div class="body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="pull-left">Contrats</h3>
                    <div class="pull-right col-md-6 col-sm-6 col-xs-12 col-lg-6" style="text-align: right;">
                    <a class="btn btn-primary pull-right menu-btn" id="refresh" onclick="location.reload();" ><span class="glyphicon glyphicon-refresh " ></span></a>
                        <a  id="addContractModal" data-toggle="modal" data-target="#addContratModal" class="btn btn-primary menu-btn "><span class="	glyphicon glyphicon-plus"></span> </a>
                        <a  id="Rechercher" class="btn btn-primary menu-btn "><span class="	glyphicon glyphicon-search"></span> </a>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix">
                            <div class="row" id="status" alt="1">
                                <form id="search_form" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group col-md-3">
                                            <input id="mat" type="text" class="form-control" name="matricule_searsh" placeholder="N°facture" value="">
                                        </div>
                                        <div class="form-group col-md-3">
                                            <select id="customer" name="costumer_search" data-live-search="true" class="selectpicker" style="">
                                                <option class="bs-title-option" value="">Veuillez selectionner un client</option>
                                                    @foreach($ClientHasfacture as $Clien)
                                                        <option value="{{ $Clien->id }}">{{ $Clien->name }}</option>
                                                        @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pull-right" style="text-align: right; margin-right: 30px;">
                                            <button id="recheche" type="button" class="btn btn-primary"><i class="fa fa fa-search" aria-hidden="true"></i> RECHERCHER</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="panel-body">
                            <table class="table table-bordered" id="contratTable">
                                <thead>
                                <tr style="color: #2a4f7d;">
                                    <th class="text-center" style="width: 12%" >N°Facature</th>
                                    <th class="text-center" style="width: 9%">DATE DE Facture</th>
                                    <th class="text-center" style="width: 0%">NOM</th>
                                    <th class="text-center" style="width: 0%">Status</th>
                                    <th class="text-center" style="width: 0%">MONTANT</th>
                                    <th class="text-center" style="width:17%">ACTIONS</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($facturations as $c)

                                        <td class="text-center"  >{{$c ->id}}</td>

                                        <td class="text-center" >{{$c->facturation_date}}</td>
                                        <td class="text-center" >{{$c->name}}</td>
                                        <td class="text-center" >{{ $c->status}}</td>
                                        <td class="text-center" >{{$c->montant}}</td>
                                        <td class="text-center" >

                                            <a class="btn btn-danger" onclick="disablefacture({{$c->id}})"  >
                                                <span class="glyphicon glyphicon-trash edit trash " ></span>
                                            </a>
                                            <a class="btn btn-info" onclick="window.open('/facture/showdetails/{{$c->id}}','_self')" >
                                                <span class="glyphicon glyphicon-info-sign "></span>
                                            </a>
                                            <a class=" btn btn-primary" data-toggle="modal" data-target="#editContratModal" id="edit_abonnement" onclick="editFactureDialog({{$c->id}})">
                                                <span class="glyphicon glyphicon-pencil edit edit_pencil "></span>
                                            </a>
                                            <a class="btn btn-success " data-toggle="modal" data-target="#RenContrat" onclick="renewal({{ $c->id }})">
                                                <span class="glyphicon glyphicon-ok"  ></span>
                                            </a>
                                            <a onclick="window.open('/pdf/facture/{{$c ->id}}')" class="btn btn-danger" style=" ">
                                                <span class="fa fa-file-pdf-o"></span>
                                            </a>
                                        </td>





                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                            <div class="modal fade" id="addContratModal" tabindex="-1" role="dialog" aria-labelledby="addContratModalTitle" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h5 class="modal-title" id="addContratModalTitle">Ajouter une Facture</h5>
                                        </div>
                                        <div class="modal-body">
                                            <form id="contrat" method="POST"  class="form-horizontal" >
                                                <input type="hidden" id="ContratToken"   name="_token" value="{{ csrf_token() }}">

                                                <div>
                                                    <label class="col-md-4 control-label">Date de facture : </label>
                                                    <div class="col-md-6">
                                                    <input type="date" class="form-control" id="dated" name="dated" value="{{date('Y-m-d')}}">
                                                    </div>
                                                </div>

                                            </form>

                                            <form id="vehicles" method="POST">
                                                <input type="hidden" id="GammeToken"   name="_token" value="{{ csrf_token() }}">
                                                <div >

                                                    <div class="form-group" style="    width: 25%;    margin-bottom: -6%;">
                                                        <input type="Text" value="Avancé"  id="Advanced"disabled class="form-control">
                                                    </div>

                                                    <div class="form-group" style="    width: 25%;margin-left: 49%;margin-top: -49px;">

                                                        <input type="text" id="defaultAdvanced"  class="form-control"  placeholder="Defaut" >

                                                    </div>
                                                    <div class="form-group" style="    width: 20%; margin-left: 73%;   margin-top: -49px">
                                                        <input type="text"  class="form-control" id="priceVehiclesAdvanced"  placeholder="Prix" >

                                                    </div>

                                                </div>
                                                <div  style="margin-bottom: 11%;">

                                                    <div class="form-group" style="    width: 25%;    margin-bottom: -6%;">
                                                        <input type="Text" value="simple" id="Simple" disabled class="form-control">

                                                    </div>

                                                    <div class="form-group" style="    width: 25%;    margin-left: 25%;">
                                                        <input type="number" min="0" step="1"  class="form-control" id="nbVehiclesSimple"  value="0" placeholder="Nombre des vehicules" >

                                                    </div>
                                                    <div class="form-group" style="    width: 25%;margin-left: 49%;margin-top: -49px;">

                                                        <input type="text" id="defaultSimple" class="form-control"  placeholder="Defaut" >
                                                    </div>
                                                    <div class="form-group" style="    width: 20%; margin-left: 73%;   margin-top: -49px">
                                                        <input type="text"  class="form-control" id="priceVehiclesSimple"  placeholder="Prix" >

                                                    </div>

                                                </div>

                                                <center><button class="btn btn-info" type="button" id="AddDetailGamme" >Enregistrer</button></center>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection