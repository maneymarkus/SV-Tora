<?php

namespace App\Http\Controllers;

use App\Helper\PersonTypes;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RefereeController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Person::class, 'person');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return app(PersonController::class)->index(PersonTypes::REFEREE, "/entities/referees/", "/entities/referees/", "/entities/referees/", "Kampfrichter", "Kampfrichter");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return app(PersonController::class)->create();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return app(PersonController::class)->store($request, PersonTypes::REFEREE);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function edit(Person $person)
    {
        return app(PersonController::class)->edit($person);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Person $person)
    {
        return app(PersonController::class)->update($request, $person);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person)
    {
        return app(PersonController::class)->destroy($person);
    }
}
