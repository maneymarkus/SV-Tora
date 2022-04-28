<?php

namespace Tests\Unit;

use App\Helper\FightingSystems\ConsolationTree;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }

    public function testConsolationTree()
    {
        for ($i = 2; $i < 32; $i++) {
            $consolationTree = new ConsolationTree($i);
            echo "Total Fighters: " . $consolationTree->totalNumberFighters . "\n";
            echo "Initial Fighters: " . $consolationTree->numberInitialFighters . "\n";
            echo "Additional Fighters: " . $consolationTree->numberAdditionalFighters . "\n";
            echo "Levels: " . $consolationTree->numberLevels . "\n";
            echo "Pre Fights: " . $consolationTree->numberPreFights . "\n";
            echo "\n\n\n";
        }

        $this->assertTrue(true);
    }

}
