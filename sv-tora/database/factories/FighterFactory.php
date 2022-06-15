<?php

namespace Database\Factories;

use App\Helper\PersonTypes;
use App\Models\fighter;
use App\Models\Person;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

class FighterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Fighter::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "person_id" => Person::factory()->state(["type" => PersonTypes::FIGHTER]),
            "birthdate" => date("Y-m-d", rand(strtotime("01.01.2000"), strtotime("31.12.2017"))),
            "sex" => config("global.sex")[array_rand(config("global.sex"))],
            "graduation" => config("global.graduations")[array_rand(config("global.graduations"))],
        ];
    }
}
