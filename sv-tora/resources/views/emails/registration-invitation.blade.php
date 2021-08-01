@component("mail::message")
Hallo,<br />
Sie wurden eingeladen, im SV Tora Berlin e.V. Wettkampf Management System teilzunehmen. Dies ermöglicht Ihnen, Kämpfer und andere Personen zu Wettkämpfen, die vom SV Tora Berlin e.V. veranstaltet werden, selbstständig anzumelden.<br />
Klicken Sie hier, um sich zu registrieren:

@component("mail::button", ["url" => $url])
Hier Registrieren
@endcomponent

{{-- TODO: Change greeting --}}
Sport frei,<br />
{{ config("mail.from.name") }}

@endcomponent

