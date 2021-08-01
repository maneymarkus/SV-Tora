<?php

namespace Database\Factories;

use App\Models\Club;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            "username" => $this->faker->unique()->userName,
            'password' => Hash::make($this->faker->password),
            'remember_token' => Str::random(10),
            "role_id" => (rand(0, 99) > 85) ? 1 : 2,
            "club_id" => Club::all()->random(),
        ];
    }
}
