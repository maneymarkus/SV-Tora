@component("mail::message")
Hallo,<br />
<br />
das SV Tora Berlin e.V. Team hat folgende Nachricht für Sie:<br />

@component("mail::panel")
{{ $content }}
@endcomponent

@if($includeButton)
<br>
Direkt zum Dashboard:
@component("mail::button", ["url" => $buttonUrl])
Dashboard
@endcomponent
@endif


<br />
<br />
Mit sportlichen Grüßen,<br />
{{ config("mail.from.name") }}

@endcomponent

