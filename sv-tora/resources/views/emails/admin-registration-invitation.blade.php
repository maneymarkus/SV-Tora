@component("mail::message")
Hallo,<br />
du wurdest eingeladen, als Admin beim SV Tora Berlin e.V. mitzuwirken.<br />
Bitte klicke hier, um dich zu registrieren:

@component("mail::button", ["url" => $url])
Hier Registrieren
@endcomponent

<br>
<br>
Mit sportlichen Grüßen,<br />
{{ config("mail.from.name") }}

@endcomponent

