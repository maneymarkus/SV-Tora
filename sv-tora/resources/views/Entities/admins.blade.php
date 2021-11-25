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

    <div class="permissions" style="display: none;">
        @foreach(\App\Helper\Permissions::PERMISSIONS as $permission => $description)
            <div class="permission">
                <span class="name">{{ $permission }}</span>
                <span class="description">{{ $description }}</span>
            </div>
        @endforeach
    </div>

    <main>

        <a class="link" href="{{ url("entities/people") }}">zurück</a>
        <h1>Administratoren</h1>
        @can("has-permission", \App\Helper\Permissions::INVITE_ADMINS)
            <div data-admin-table="{{ $id }}" class="table-actions clearfix">
                <x-primary-button class="add-admin" text="Admin hinzufügen" icon-name="person_add"></x-primary-button>
            </div>
        @endcan
        <div class="oversize-container">
            <table id="{{ $id }}" class="admin-table space-after">
                <thead>
                <tr>
                    <th class="not-visible">
                    </th>
                    @foreach($permissions as $permission)
                        <th>
                            {{ $permission->name }}
                            <x-tooltip class=""></x-tooltip>
                        </th>
                    @endforeach
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($admins as $admin)
                    <tr>
                        <td>
                            <span class="admin">{{ $admin->name }}</span>
                        </td>
                        @foreach($permissions as $permission)
                            @if($admin->permissions->contains($permission))
                                <td data-privilege="{{ $permission->name }}" class="privilege privileged">
                                    <i class="material-icons">done</i>
                                </td>
                            @else
                                <td data-privilege="{{ $permission->name }}" class="privilege">
                                    <i class="material-icons">close</i>
                                </td>
                            @endif
                        @endforeach
                        <td>
                            @can("has-permission", \App\Helper\Permissions::UPDATE_ADMIN_PERMISSIONS)
                                @php
                                    $editUrl = url("/entities/admins/" . $admin->id . "/permissions");
                                @endphp
                                <x-primary-button class="edit" text="Bearbeiten" icon-name="create" href="{{ $editUrl }}"></x-primary-button>
                            @endcan
                            @can("has-permission", \App\Helper\Permissions::DELETE_ADMINS)
                                    @php
                                        $deleteUrl = url("/entities/admins/" . $admin->id);
                                    @endphp
                                <x-primary-button class="delete warning" text="Löschen" icon-name="delete" href="{{ $deleteUrl }}"></x-primary-button>
                            @endcan
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </main>

@endsection
