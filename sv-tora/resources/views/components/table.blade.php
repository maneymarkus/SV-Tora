@php

    if (!isset($id)) {
        $id = App\Helper\GeneralHelper::uniqueRandomIdentifier();
    }

    if (!isset($entity)) {
        $entity = "Eintrag";
    }

    $actions = $actions === "true";

    $filter = $filter === "true";

    $editable = $editable === "true";

    $deletable = $deletable === "true";

    $selectable = $selectable === "true";

@endphp

@isset($heading)
    <h2 class="table-heading">{{ $heading }}</h2>
@endif

@if($actions)
    <div data-table="{{ $id }}" class="table-actions clearfix">
        <x-primary-button class="add-entity" text="{{ $entity }} hinzufügen" icon-name="add" href="{{ $addEntityUrl }}"></x-primary-button>
        <x-primary-button class="print" text="Drucken" icon-name="print"></x-primary-button>
    </div>
@endif

@if($filter)
    <div data-table="{{ $id }}" class="filter-container clearfix">
        <p>Filter:</p>
        <div class="chosen-filters">
        </div>
        <a class="secondary-button add-filter">
            <span class="text">
                <i class="material-icons">filter_list</i>Filter hinzufügen
            </span>
        </a>
    </div>
@endif

@if(\Illuminate\Support\Facades\Auth::user() && \Illuminate\Support\Facades\Auth::user()->smartphone_optimized_tables)
    <table {{ $attributes->merge(["class" => "table smartphone-optimized"]) }} id="{{ $id }}" data-select-limit="{{ $selectLimit ?? null }}">
@else
    <table {{ $attributes->merge(["class" => "table"]) }} id="{{ $id }}" data-select-limit="{{ $selectLimit ?? null }}">
@endif
    <thead>
        <tr>
            @if($selectable)
                <th>
                    <span class="column-heading no-sort">
                        <label class="checkbox-input-container select-all" style="width: 100%; height: 100%;">
                            <input type="checkbox" />
                            <span class="checkmark" style="top: 50%; left: 50%; transform: translateY(-50%); font-size: 1.25em"></span>
                        </label>
                    </span>
                </th>
            @endif
            @foreach($columns as $column)
                <th>
                    @if($column["sortable"] == true)
                        <a class="sort">
                            <span class="column-heading">{{ $column["heading"] }}</span>
                            <span class="icon">
                                <i class="material-icons">expand_less</i>
                                <i class="material-icons">expand_more</i>
                            </span>
                        </a>
                    @else
                        <span class="column-heading no-sort">{{ $column["heading"] }}</span>
                    @endif
                </th>
            @endforeach
            @if($editable || $deletable)
                <th></th>
            @endif
        </tr>
    </thead>
    <tbody>
        @foreach($rows as $row)
            <tr>
                @if($selectable)
                    <td>
                        <label class="checkbox-input-container select-row">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                    </td>
                @endif
                @foreach($row["data"] as $cell)
                    <td data-column="{{ $columns[$loop->index]["heading"] }}">{!! $cell !!}</td>
                @endforeach
                @if($editable || $deletable)
                    <td class="row-actions" data-column="Aktionen">
                        @if($editable)
                            @php
                                $editUrl = $row["editUrl"]
                            @endphp
                            <x-primary-button href="{{ $editUrl }}" class="edit" icon-name="create" text="Bearbeiten"></x-primary-button>
                        @endif
                        @if($deletable)
                            @php
                                $deleteUrl = $row["deleteUrl"]
                            @endphp
                            <x-primary-button href="{{ $deleteUrl }}" class="delete warning" icon-name="delete" text="Löschen"></x-primary-button>
                        @endif
                    </td>
                @endif
            </tr>
        @endforeach
    </tbody>
</table>
