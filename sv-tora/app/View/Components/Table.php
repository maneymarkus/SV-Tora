<?php

namespace App\View\Components;

use Illuminate\View\Component;
use phpDocumentor\Reflection\Types\Boolean;

class Table extends Component
{

    /**
     * 2-dimensional array containing all the different columns and their configuration
     * The first array should contain the configuration of each column
     * The second array should have two values:
     * "heading": string | determines the column heading
     * "sortable": boolean | determines if the table should be sortable by this particular column
     * @var array
     */
    public array $columns;

    /**
     * 2-dimensional array containing all the values of the table
     * The first array should contain all the rows
     * The second array should contain all the values for the cells in this row
     * @var array
     */
    public array $rows;

    /**
     * Determines if this table should have a preceding container allowing to add entities
     * @var string|bool
     */
    public string|bool $actions;

    /**
     * Determines if this table should have a preceding container allowing to filter the table
     * @var string|bool
     */
    public string|bool $filter;

    /**
     * Determines if table rows should be editable for the user
     * @var string|bool
     */
    public string|bool $editable;

    /**
     * Determines if table rows should deletable for the user
     * @var string|bool
     */
    public string|bool $deletable;

    /**
     * Determines if table rows should be able to be selected (inserts another column at the front of the table with checkboxes)
     * @var string|bool
     */
    public string|bool $selectable;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($columns, $rows, $actions, $filter, $editable, $deletable, $selectable)
    {
        $this->columns = $columns;
        $this->rows = $rows;
        $this->actions = $actions;
        $this->filter = $filter;
        $this->editable = $editable;
        $this->deletable = $deletable;
        $this->selectable = $selectable;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.table');
    }
}
