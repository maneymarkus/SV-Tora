<?php

namespace Database\Factories;

use App\Helper\PersonTypes;
use App\Models\Club;
use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;

class PersonFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Person::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "type" => PersonTypes::PERSONS[rand(1, 3)],
            "first_name" => $this->faker->firstName,
            "last_name" => $this->faker->lastName,
            "club_id" => Club::all()->random(),
        ];
    }
}
