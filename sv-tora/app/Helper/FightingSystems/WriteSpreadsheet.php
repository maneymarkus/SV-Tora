<?php

namespace App\Helper\FightingSystems;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Dompdf;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Tcpdf;

class WriteSpreadsheet
{

    /**
     * Writes a given $tree to a new spreadsheet
     *
     * @param array $tree Should be a 2-dimensional array of shape: [$columns][$fightsOfColumn]
     * @param string|null $heading The heading of this particular spreadsheet tree
     * @param float|null $prefightOffset possibly already calculated prefight offset
     * @return Spreadsheet
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function writeTree(array $tree, string $heading = null, float $prefightOffset = null): Spreadsheet
    {
        $spreadsheet = new Spreadsheet();

        self::setHeading($spreadsheet, $heading);

        $row = 5;
        if ($prefightOffset === null) {
            $prefightOffset = self::calculateOffsetOfPrefights($tree);
        }
        // iterate over columns of (fighting) tree
        for ($c = 0; $c < count($tree); $c++) {
            $spreadsheet->getActiveSheet()->getColumnDimensionByColumn($c + 1)->setWidth(25);

            // increase $row by space between fights
            $row = 3 + floor(self::calculateFightHeight($c) / 2);
            if ($c === 0) {
                $row += $prefightOffset;
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

        return $spreadsheet;
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function setHeading(Spreadsheet $spreadsheet, string $heading) {
        $spreadsheet->getActiveSheet()->setCellValue("A1", $heading);
        $spreadsheet->getActiveSheet()->mergeCells("A1:B1");
        $spreadsheet->getActiveSheet()->getStyle("A1")->getFont()->setSize(15);
        $spreadsheet->getActiveSheet()->getStyle("A1")->getFont()->setBold(true);
        $spreadsheet->getActiveSheet()->getStyle('A1')->getAlignment()->setWrapText(false);
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function writeFightOfTree(Spreadsheet $spreadsheet, int $column, int $row, Fight $fight) {
        $fightHeightInCells = self::calculateFightHeight($column - 1);
        self::writeFight($spreadsheet, $column, $row, $fight, $fightHeightInCells);
    }

    public static function writeFight(Spreadsheet $spreadsheet, int $column, int $row, Fight $fight, int $fightHeightInCells, string $commentFirstFighter = null, string $commentSecondFighter = null) {
        $activeSheet = $spreadsheet->getActiveSheet();
        $activeSheet->getColumnDimensionByColumn($column)->setWidth(25);

        // write first fighter
        $activeSheet->getCellByColumnAndRow($column, $row)->setValue($fight->fighter1?->person->fullName());
        $activeSheet->getCellByColumnAndRow($column, $row)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        if ($commentFirstFighter !== null) {
            // add comment
            $activeSheet->getCellByColumnAndRow($column, $row + 1)->setValue($commentFirstFighter);
            $activeSheet->getCellByColumnAndRow($column, $row + 1)->getStyle()->getFont()->setSize(8);
            $activeSheet->getCellByColumnAndRow($column, $row + 1)->getStyle()->getFont()->setItalic(true);
        }

        // write second fighter
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->setValue($fight->fighter2?->person->fullName());
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        if ($commentSecondFighter !== null) {
            // add comment
            $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells)->setValue($commentSecondFighter);
            $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells)->getStyle()->getFont()->setSize(8);
            $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells)->getStyle()->getFont()->setItalic(true);
        }

        // write fight number
        $fightNumberCellOffset = floor($fightHeightInCells / 2);
        $activeSheet->getCellByColumnAndRow($column, $row + $fightNumberCellOffset)->setValue($fight->fightNumber);

        //style borders
        for ($c = $row + 1; $c < $row + $fightHeightInCells; $c++) {
            $activeSheet->getCellByColumnAndRow($column, $c)->getStyle()->getBorders()->getRight()->setBorderStyle(Border::BORDER_THIN);
        }

        // set border for winner
        $activeSheet->getCellByColumnAndRow($column + 1, $row + $fightNumberCellOffset)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        $activeSheet->getColumnDimensionByColumn($column + 1)->setWidth(25);
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

    public static function calculateOffsetOfPrefights(array $tree) {
        $exponent = count($tree) - 1;
        if (count($tree[0]) % pow(2, $exponent) === 0) {
            return 0;
        }

        $numberMissingFights = pow(2, $exponent) - count($tree[0]);
        $offset = self::calculateFightHeight(0) * $numberMissingFights;
        $offset += (self::calculateFightHeight(0) - 2) * $numberMissingFights;
        return $offset;
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function saveSpreadsheet(Spreadsheet $spreadsheet, string $savePath) {
        $spreadsheet->getActiveSheet()->getPageSetup()->setOrientation(PageSetup::ORIENTATION_LANDSCAPE);
        $spreadsheet->getActiveSheet()->getPageSetup()->setPaperSize(PageSetup::PAPERSIZE_A4);
        $spreadsheet->getActiveSheet()->getPageSetup()->setFitToPage(true);
        $writer = IOFactory::createWriter($spreadsheet, "Mpdf");
        $writer->save($savePath);
    }

}
