<?php

namespace App\Helper\FightingSystems;

use App\Models\Category;
use Illuminate\Http\Request;

interface FightingSystem
{


    function __construct(Category $category);

    /**
     * Initializes the fighting system for a given category (e.g. calculates the lineup)
     *
     * @return mixed
     */
    function initialize();

    /**
     * Builds the fighting system in HTML and returns it
     *
     * @return mixed
     */
    function build();

    /**
     * Initializes the editing of the (initial) configuration (e.g. change the lineup of the fighters)
     *
     * @return mixed
     */
    function editConfig();

    /**
     * Updates the (initial) configuration according to the $request
     *
     * @param Request $request
     * @return mixed
     */
    function updateConfig(Request $request);

    /**
     * Generates a printable PDF
     *
     * @return mixed
     */
    function print();

    /**
     * Serialize the FightingSystem into an array (to store it into a JSON column in the database)
     *
     * @return mixed
     */
    function serialize();

    /**
     * Deserialize (/create) the FightingSystem from an array (from the JSON column of the database)
     *
     * @return mixed
     */
    function deserialize();
}
