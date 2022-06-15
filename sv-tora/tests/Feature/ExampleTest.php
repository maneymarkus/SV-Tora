<?php

namespace Tests\Feature;

use App\Helper\Categories;
use App\Helper\FightingSystems\DoubleKOSystem;
use App\Helper\FightingSystems\FightingTree;
use App\Http\Controllers\FightingSystemController;
use App\Models\Category;
use App\Models\Fighter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        // root of the application is directly redirected to login route (as this should be the root)
        $response->assertStatus(302);
    }

}
