<?php

namespace App\Console;

use App\Models\Category;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $tournament = Tournament::latest()->first();
            if ($tournament !== null && $tournament->active) {
                if ($tournament->status === 0 && Carbon::today() >= Carbon::parse($tournament->enrollment_start)) {
                    $tournament->status = 1;
                }
                if (Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
                    if ($tournament->status === 1) {
                        $tournament->status = 2;
                    }
                    $zeroCategories = Category::all()->reject(function ($category) {
                        return $category->fighters->count() > 0;
                    });
                    foreach ($zeroCategories as $category) {
                        $category->delete();
                    }
                }
                if ($tournament->status === 2 && Carbon::today() >= Carbon::parse($tournament->date)) {
                    $tournament->status = 3;
                }
                if ($tournament->status === 3 && Carbon::today() > Carbon::parse($tournament->date)) {
                    $tournament->status = 4;
                }
            }
        })->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
