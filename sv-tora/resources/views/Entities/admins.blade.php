@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

@endphp

@extends("layouts.layout", ["title" => "Administratoren"])

@push("styles")
    <!-- Specific style -->
    <link rel="stylesheet" href="{{ asset("css/sites/administration.css") }}" type="text/css" />
@endpush

@section("content")

    <main>

        <h1>Administratoren</h1>
        <div data-admin-table="{{ $id }}" class="table-actions clearfix">
            <x-primary-button class="add-admin add-entity" text="Admin hinzufügen" icon-name="person_add"></x-primary-button>
        </div>
        <div class="oversize-container">
            <table id="{{ $id }}" class="admin-table space-after">
                <thead>
                <tr>
                    <th class="not-visible">
                    </th>
                    <th>
                        Vereine hinzufügen
                        <!-- TODO: insert tooltip for each right/privilege to explain it better -->
                    </th>
                    <th>
                        Recht2
                    </th>
                    <th>
                        Recht3
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div class="pic-container">
                            <img src="{{ asset("../images/placeholder.png") }}" />
                        </div>
                        <span class="admin">Marcus Popopov</span>
                    </td>
                    <td data-privilege="Verein hinzufügen" class="privilege">
                        <i class="material-icons">close</i>
                    </td>
                    <td data-privilege="Recht2" class="privilege privileged">
                        <i class="material-icons">done</i>
                    </td>
                    <td data-privilege="Recht3" class="privilege">
                        <i class="material-icons">close</i>
                    </td>
                    <td>
                        <x-primary-button class="edit" text="Bearbeiten" icon-name="create"></x-primary-button>
                        <x-primary-button class="delete warning" text="Löschen" icon-name="delete"></x-primary-button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="pic-container">
                            <img src="{{ asset("../images/placeholder.png") }}" />
                        </div>
                        <span class="admin">Der Markus</span>
                    </td>
                    <td data-privilege="Verein hinzufügen" class="privilege privileged">
                        <i class="material-icons">done</i>
                    </td>
                    <td data-privilege="Recht2" class="privilege privileged">
                        <i class="material-icons">done</i>
                    </td>
                    <td data-privilege="Recht3" class="privilege privileged">
                        <i class="material-icons">done</i>
                    </td>
                    <td>
                        <x-primary-button class="edit" text="Bearbeiten" icon-name="create"></x-primary-button>
                        <x-primary-button class="delete warning" text="Löschen" icon-name="delete"></x-primary-button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="pic-container">
                            <img src="{{ asset("../images/placeholder.png") }}" />
                        </div>
                        <span class="admin">Flori auch noch</span>
                    </td>
                    <td data-privilege="Verein hinzufügen" class="privilege privileged">
                        <i class="material-icons">done</i>
                    </td>
                    <td data-privilege="Recht2" class="privilege">
                        <i class="material-icons">close</i>
                    </td>
                    <td data-privilege="Recht3" class="privilege">
                        <i class="material-icons">close</i>
                    </td>
                    <td>
                        <x-primary-button class="edit" text="Bearbeiten" icon-name="create"></x-primary-button>
                        <x-primary-button class="delete warning" text="Löschen" icon-name="delete"></x-primary-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </main>

@endsection
