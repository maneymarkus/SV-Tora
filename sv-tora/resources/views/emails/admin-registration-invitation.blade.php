@component("mail::message")
Hallo,<br />
du wurdest eingeladen, als Admin beim SV Tora Berlin e.V. als Admin mitzuwirken.<br />
Bitte klicke hier, um dich zu registrieren:

@component("mail::button", ["url" => $url])
Hier Registrieren
@endcomponent

{{-- TODO: Change greeting --}}
Sport frei,<br />
{{ config("mail.from.name") }}

@endcomponent

