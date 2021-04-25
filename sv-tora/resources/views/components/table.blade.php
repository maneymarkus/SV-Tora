@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

    if (!isset($entity)) {
        $entity = "Eintrag";
    }

    if ($actions == "true") {
        $actions = true;
    } else {
        $actions = false;
    }

    if ($filter == "true") {
        $filter = true;
    } else {
        $filter = false;
    }

    if ($editable == "true") {
        $editable = true;
    } else {
        $editable = false;
    }

    if ($deletable == "true") {
        $deletable = true;
    } else {
        $deletable = false;
    }

    if ($selectable == "true") {
        $selectable = true;
    } else {
        $selectable = false;
    }

@endphp

@isset($heading)
    <h2 class="table-heading">{{ $heading }}</h2>
@endif

@if($actions)
    <div data-table="{{ $id }}" class="table-actions clearfix">
        <x-primary-button class="add-entity" text="{{ $entity }} hinzufügen" icon-name="add"></x-primary-button>
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

<table {{ $attributes->merge(["class" => "table space-after"]) }} id="{{ $id }}">
    <thead>
        <tr>
            @if($selectable)
                <th>
                    <span class="column-heading no-sort">Auswählen</span>
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
                @foreach($row as $cell)
                    <td data-column="{{ $columns[$loop->index]["heading"] }}">{{ $cell }}</td>
                @endforeach
                @if($editable || $deletable)
                    <td class="row-actions" data-column="Aktionen">
                        @if($editable)
                            <x-primary-button class="edit" icon-name="create" text="Bearbeiten"></x-primary-button>
                        @endif
                        @if($deletable)
                            <x-primary-button class="delete warning" icon-name="delete" text="Löschen"></x-primary-button>
                        @endif
                    </td>
                @endif
            </tr>
        @endforeach
    </tbody>
</table>
