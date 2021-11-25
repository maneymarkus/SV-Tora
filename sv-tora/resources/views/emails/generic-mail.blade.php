@component("mail::message")
Hallo,<br />
<br />
das SV Tora Berlin e.V. Team hat folgende Nachricht für Sie:<br />

@component("mail::panel")
{{ $content }}
@endcomponent

Mit sportlichen Grüßen,<br />
{{ config("mail.from.name") }}

@endcomponent

