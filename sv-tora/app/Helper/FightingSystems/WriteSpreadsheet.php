<?php

namespace App\Helper\FightingSystems;

use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;

class WriteSpreadsheet
{

    /**
     * Writes a given $tree to a new spreadsheet
     *
     * @param array $tree Should be a 2-dimensional array of shape: [$columns][$fightsOfColumn]
     * @param bool $isFinal Determines if the tree is final (has a final winner) or actually has 4 winners
     * @param bool $isConsolation Determines if the tree is a consolation tree
     * @param bool $doubleKo Determines if this fighting tree is part of a double ko fighting system
     * @return Spreadsheet
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function writeTree(array $tree, bool $isFinal = true, bool $isConsolation = false, bool $doubleKo = false): Spreadsheet
    {
        $spreadsheet = new Spreadsheet();

        // heading
        $heading = "Kampfbaum";
        if ($isConsolation) {
            $heading = "Trostrunde";
        }
        $spreadsheet->getActiveSheet()->setCellValue("A1", $heading);
        $spreadsheet->getActiveSheet()->getStyle("A1")->getFont()->setSize(15);
        $spreadsheet->getActiveSheet()->getStyle("A1")->getFont()->setBold(true);

        $row = 5;
        $printColumns = count($tree);
        if (!$isFinal) {
            if ($isConsolation) {
                $printColumns -= 1;
            }
            if (!$isConsolation && $doubleKo) {
                $printColumns -= 1;
            }
            if (!$isConsolation && !$doubleKo) {
                $printColumns -= 2;
            }
        }
        // iterate over columns of (fighting) tree
        for ($c = 0; $c < $printColumns; $c++) {
            $spreadsheet->getActiveSheet()->getColumnDimensionByColumn($c + 1)->setWidth(25);

            // increase $row by space between fights
            $row = 3 + floor(self::calculateFightHeight($c) / 2);
            if ($c === 0) {
                $row += self::calculateOffsetOfPrefights($tree);
            }

            // iterate over fights of this particular column (with index) $c
            foreach ($tree[$c] as $fight) {
                self::writeFightOfTree($spreadsheet, $c + 1, $row, $fight);

                // increase $row by height of fight
                $row += self::calculateFightHeight($c);

                // increase $row by space between fights
                $row += self::calculateFightHeight($c) - 2;
            }
        }

        if ($isFinal) {
            // add last string for winner
            $spreadsheet->getActiveSheet()->getColumnDimensionByColumn($c + 1)->setWidth(25);
            $spreadsheet->getActiveSheet()->getCellByColumnAndRow($c + 1, 3 + floor(self::calculateFightHeight($c) / 2))->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        } else {
            $spreadsheet->getActiveSheet()->getColumnDimensionByColumn($c + 1)->setWidth(25);
            if ($isConsolation) {
                $row = 3 + floor(self::calculateFightHeight($c) / 2);
                for ($i = 1; $i <= 2; $i++) {
                    $spreadsheet->getActiveSheet()->getCellByColumnAndRow($c + 1, $row)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
                    // increase $row by height of fight
                    $row += self::calculateFightHeight($c - 1);

                    // increase $row by space between fights
                    $row += self::calculateFightHeight($c - 1) - 2;
                }
            }
            if (!$isConsolation && $doubleKo) {
                $row = 3 + floor(self::calculateFightHeight($c) / 2);
                for ($i = 1; $i <= 2; $i++) {
                    $spreadsheet->getActiveSheet()->getCellByColumnAndRow($c + 1, $row)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
                    // increase $row by height of fight
                    $row += self::calculateFightHeight($c - 1);

                    // increase $row by space between fights
                    $row += self::calculateFightHeight($c - 1) - 2;
                }
            }
            if (!$isConsolation && !$doubleKo) {
                $row = 3 + floor(self::calculateFightHeight($c) / 2);
                for ($i = 1; $i <= 4; $i++) {
                    $spreadsheet->getActiveSheet()->getCellByColumnAndRow($c + 1, $row)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
                    // increase $row by height of fight
                    $row += self::calculateFightHeight($c - 1);

                    // increase $row by space between fights
                    $row += self::calculateFightHeight($c - 1) - 2;
                }
            }
        }

        return $spreadsheet;
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function writeFightOfTree(Spreadsheet $spreadsheet, int $column, int $row, Fight $fight) {
        $activeSheet = $spreadsheet->getActiveSheet();

        // write first fighter
        $activeSheet->getCellByColumnAndRow($column, $row)->setValue($fight->fighter1?->person->fullName());
        $activeSheet->getCellByColumnAndRow($column, $row)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);

        $fightHeightInCells = self::calculateFightHeight($column - 1);

        // write second fighter
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->setValue($fight->fighter2?->person->fullName());
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);

        // write fight number
        $fightNumberCellOffset = floor($fightHeightInCells / 2);
        $activeSheet->getCellByColumnAndRow($column, $row + $fightNumberCellOffset)->setValue($fight->fightNumber);

        //style borders
        for ($c = $row + 1; $c < $row + $fightHeightInCells; $c++) {
            $activeSheet->getCellByColumnAndRow($column, $c)->getStyle()->getBorders()->getRight()->setBorderStyle(Border::BORDER_THIN);
        }
    }

    private static function calculateFightHeight(int $columnIndex): int
    {
        // column index determines height of fight
        $fightHeightInCells = $columnIndex + 1;
        $fightHeightInCells = pow(2, $fightHeightInCells);
        // every fight height in a spreadsheet tree is odd
        $fightHeightInCells += 1;
        return $fightHeightInCells;
    }

    private static function calculateOffsetOfPrefights(array $tree) {
        $exponent = count($tree) - 1;
        if (count($tree[0]) % pow(2, $exponent) === 0) {
            return 0;
        }

        $numberMissingFights = pow(2, $exponent) - count($tree[0]);
        $offset = self::calculateFightHeight(0) * $numberMissingFights;
        $offset += (self::calculateFightHeight(0) - 2) * $numberMissingFights;
        return $offset;
    }

}
