@component("mail::message")
Hallo,<br />
<br />

@component("mail::panel")
{{ $content }}
@endcomponent

Direkt zum Wettkampf Dashboard:
@component("mail::button", ["url" => url("/tournament/dashboard")])
Wettkampf Dashboard
@endcomponent

Sollten Sie noch nicht im SV Tora Wettkampf Managament System angemeldet sein, dann fragen Sie bitte eine Einladung unter [{{ config("contact.email") }}](mailto:{{ config("contact.email") }}) an.

<br>
<br>
Mit sportlichen Grüßen,<br />
{{ config("mail.from.name") }}

@endcomponent

