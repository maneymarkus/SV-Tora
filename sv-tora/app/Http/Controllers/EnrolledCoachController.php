<?php

namespace App\Http\Controllers;

use App\Helper\PersonTypes;
use App\Models\EnrolledPerson;
use App\Models\Tournament;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EnrolledCoachController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Tournament $tournament)
    {
        return app(EnrolledPersonController::class)
            ->index($tournament, PersonTypes::COACH, url("/tournaments/" . $tournament->id . "/enrolled/coaches/add"), url("/tournaments/" . $tournament->id . "/enrolled/coaches/"), url("/entities/coaches/"), "Coaches", "Coach");
    }

    public function print(Tournament $tournament) {
        return app(EnrolledPersonController::class)->print($tournament, PersonTypes::COACH, "Coaches");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Tournament $tournament)
    {
        $enrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/coaches");
        return app(EnrolledPersonController::class)->add($tournament, PersonTypes::COACH, $enrollUrl, url("/entities/coaches/"), "Coaches", "Coach");
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
        return app(EnrolledPersonController::class)->enroll($request, $tournament, PersonTypes::COACH);
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
        return app(EnrolledPersonController::class)->destroy($tournament, $enrolledPerson);
    }
}
