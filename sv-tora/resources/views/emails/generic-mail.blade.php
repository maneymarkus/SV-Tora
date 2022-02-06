@component("mail::message")
Hallo,<br />
<br />
das SV Tora Berlin e.V. Team hat folgende Nachricht für Sie:<br />

@component("mail::panel")
{{ $content }}
@endcomponent

@if($includeButton)
Direkt zum Dashboard:
@component("mail::button", ["url" => $buttonUrl])
Dashboard
@endcomponent
@endif


Mit sportlichen Grüßen,<br />
{{ config("mail.from.name") }}

@endcomponent

