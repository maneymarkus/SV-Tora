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
     * @param bool $isConsolation
     * @param bool $hasPreFights states whether this tree has pre fights or not (only relevant for consolation tree as it is trivial for regular tree)
     * @return Spreadsheet
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function writeTree(array $tree, string $heading = null, float $prefightOffset = null, bool $isConsolation = false, bool $hasPreFights = false): Spreadsheet
    {
        $spreadsheet = new Spreadsheet();

        self::setHeading($spreadsheet, $heading);

        if ($prefightOffset === null) {
            $prefightOffset = self::calculateOffsetOfPrefights($tree, $isConsolation, $hasPreFights);
        }

        $fightHeightExponent = 0;
        // leave some margin for the heading
        $topMargin = 3;
        $lastFightHeightInCells = 2;

        // iterate over columns of (fighting) tree
        for ($c = 0; $c < count($tree); $c++) {

            // calculate fight height
            $fightHeightExponent += 1;
            if ($isConsolation) {
                if ($c === 0) {
                    $fightHeightExponent += 1;
                }
                if ($c > 1) {
                    if (count($tree[$c - 1]) === count($tree[$c])) {
                        $fightHeightExponent -= 1;
                    }
                }
            }
            $fightHeightInCells = pow(2, $fightHeightExponent) + 1;

            $spreadsheet->getActiveSheet()->getColumnDimensionByColumn($c + 1)->setWidth(20);

            // add top margin to align tree
            if (!$isConsolation) {
                $add = pow(2, $c + 1) - pow(2, $c);
            } else {
                $add = $lastFightHeightInCells;
            }
            $topMargin += floor($add / 2);

            $row = $topMargin;
            if ($c === 0) {
                $row += $prefightOffset;
            }

            // iterate over fights of this particular column (with index) $c
            foreach ($tree[$c] as $fight) {
                self::writeFightOfTree($spreadsheet, $c + 1, $row, $fight, $fightHeightInCells);

                // increase $row by height of fight
                $row += $fightHeightInCells;

                // increase $row by space between fights
                $row += $fightHeightInCells - 2;

                if ($c === 0 && $isConsolation && isset($tree[$c + 1]) && count($tree[$c]) === count($tree[$c + 1]) && !$hasPreFights) {
                    $row += $fightHeightInCells * 2 - 2;
                }
            }

            $lastFightHeightInCells = $fightHeightInCells;
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
    public static function writeFightOfTree(Spreadsheet $spreadsheet, int $column, int $row, Fight $fight, int $fightHeightInCells) {
        self::writeFight($spreadsheet, $column, $row, $fight, $fightHeightInCells);
    }

    public static function writeFight(Spreadsheet $spreadsheet, int $column, int $row, Fight $fight, int $fightHeightInCells) {
        $activeSheet = $spreadsheet->getActiveSheet();
        $activeSheet->getColumnDimensionByColumn($column)->setWidth(20);

        // write first fighter
        $activeSheet->getCellByColumnAndRow($column, $row)->setValue($fight->fighter1?->person->fullName());
        $activeSheet->getCellByColumnAndRow($column, $row)->getStyle()->getFont()->setSize(9);
        $activeSheet->getCellByColumnAndRow($column, $row)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        if ($fight->fighter1Description !== null) {
            // add comment
            $activeSheet->getCellByColumnAndRow($column, $row + 1)->setValue($fight->fighter1Description);
            $activeSheet->getCellByColumnAndRow($column, $row + 1)->getStyle()->getFont()->setSize(7);
            $activeSheet->getCellByColumnAndRow($column, $row + 1)->getStyle()->getFont()->setItalic(true);
        }

        // write second fighter
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->setValue($fight->fighter2?->person->fullName());
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->getStyle()->getFont()->setSize(9);
        $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells - 1)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        if ($fight->fighter2Description !== null) {
            // add comment
            $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells)->setValue($fight->fighter2Description);
            $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells)->getStyle()->getFont()->setSize(7);
            $activeSheet->getCellByColumnAndRow($column, $row + $fightHeightInCells)->getStyle()->getFont()->setItalic(true);
        }

        // write fight number
        $fightNumberCellOffset = floor($fightHeightInCells / 2);
        $activeSheet->getCellByColumnAndRow($column, $row + $fightNumberCellOffset)->getStyle()->getFont()->setSize(9);
        $activeSheet->getCellByColumnAndRow($column, $row + $fightNumberCellOffset)->setValue($fight->fightNumber);

        //style borders
        for ($c = $row + 1; $c < $row + $fightHeightInCells; $c++) {
            $activeSheet->getCellByColumnAndRow($column, $c)->getStyle()->getBorders()->getRight()->setBorderStyle(Border::BORDER_THIN);
        }

        // set border for winner
        $activeSheet->getCellByColumnAndRow($column + 1, $row + $fightNumberCellOffset)->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        $activeSheet->getColumnDimensionByColumn($column + 1)->setWidth(20);
    }

    public static function calculateOffsetOfPrefights(array $tree, bool $isConsolation = false, bool $hasPreFights = false) {
        $offset = 0;
        if (!$isConsolation) {
            $exponent = count($tree) - 1;
            if (count($tree[0]) % pow(2, $exponent) === 0) {
                return 0;
            }
            $numberMissingFights = pow(2, $exponent) - count($tree[0]);
            $offset = 3 * $numberMissingFights;
            $offset += 1 * $numberMissingFights;
        } else {
            if (!$hasPreFights) {
                return 0;
            }

            $maxNumberFightsOnLevel = count($tree[1]) * 2;
            $numberMissingFights = $maxNumberFightsOnLevel - count($tree[0]);
            $offset = 5 * $numberMissingFights;
            $offset += 3 * $numberMissingFights;
        }
        return $offset;
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public static function saveSpreadsheet(Spreadsheet $spreadsheet, string $savePath) {
        $spreadsheet->getActiveSheet()->getPageSetup()->setOrientation(PageSetup::ORIENTATION_LANDSCAPE);
        $spreadsheet->getActiveSheet()->getPageSetup()->setPaperSize(PageSetup::PAPERSIZE_A4);
        $spreadsheet->getActiveSheet()->getPageSetup()->setFitToPage(true);
        $highestColumn = $spreadsheet->getActiveSheet()->getHighestColumn();
        $highestRow = $spreadsheet->getActiveSheet()->getHighestRow();
        $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:" . $highestColumn . $highestRow);
        $writer = IOFactory::createWriter($spreadsheet, "Mpdf");
        $writer->save($savePath);
    }

}
