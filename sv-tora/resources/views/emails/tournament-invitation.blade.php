@component("mail::message")
Hallo,<br>
@component("mail::panel")
{{ $content }}
@endcomponent
Sollten Sie noch nicht im SV Tora Wettkampf Managament System angemeldet sein, dann fragen Sie bitte eine Einladung unter [{{ config("contact.email") }}](mailto:{{ config("contact.email") }}) an.
<br>
<br>
Direkt zum Wettkampf Dashboard:
@component("mail::button", ["url" => url("/tournaments/" . $tournament->id)])
Wettkampf Dashboard
@endcomponent
Mit sportlichen Grüßen,<br>
{{ config("mail.from.name") }}

@endcomponent

