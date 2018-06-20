<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class FacturationController extends Controller
{


    public function index()
    {

        $hasFacture = DB::table('customers')
            ->whereIn('customers.id',function($q){
                $q->select('facturation.id_customer')->where('etat','=','1')->from('facturation');
            })
            ->select('customers.id', 'customers.name')->get();
        $c = DB::table('facturation')
            ->join('detail_facturation','facturation.id','detail_facturation.id_facture')
            ->join('customers', 'customers.id', '=', 'facturation.id_customer')
            ->select('facturation.*','customers.*','detail_facturation.*')->orderBy('facturation.facturation_date','desc')
            ->get();
        return view('Facturation', ['facturations' => $c,'ClientHasfacture'=>$hasFacture]);
    }
}
