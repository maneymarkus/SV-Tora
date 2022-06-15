<?php

namespace App\Http\Controllers;

use App\Helper\PersonTypes;
use App\Models\EnrolledPerson;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EnrolledDeskSupporterController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Tournament $tournament)
    {
        return app(EnrolledPersonController::class)
            ->index($tournament, PersonTypes::DESK_SUPPORTER, url("/tournaments/" . $tournament->id . "/enrolled/desk-supporters/add"), url("/tournaments/" . $tournament->id . "/enrolled/desk-supporters/"), url("/entities/desk-supporters/"), "Tischbesetzungen", "Tischbesetzung");
    }

    public function print(Tournament $tournament) {
        return app(EnrolledPersonController::class)->print($tournament, PersonTypes::DESK_SUPPORTER, "Tischbesetzungen");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Tournament $tournament)
    {
        $enrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/desk-supporters");
        return app(EnrolledPersonController::class)->add($tournament, PersonTypes::DESK_SUPPORTER, $enrollUrl, url("/entities/helper/"), "Tischbesetzungen", "Tischbesetzung");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Tournament $tournament
     * @return \Illuminate\Http\Response
     */
    public function enroll(Request $request, Tournament $tournament)
    {
        return app(EnrolledPersonController::class)->enroll($request, $tournament, PersonTypes::DESK_SUPPORTER);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Tournament $tournament
     * @param EnrolledPerson $enrolledPerson
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, EnrolledPerson $enrolledPerson)
    {
        Log::info($enrolledPerson);
        return app(EnrolledPersonController::class)->destroy($tournament, $enrolledPerson);
    }
}
