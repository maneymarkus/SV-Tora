@component("mail::message")
Hey Admins,<br />
User "{{ $username }}" ist aktuell keinem Verein zugeordnet.
Bitte behebt das Problem, indem ihr ihn einem Verein zuordnet oder den User löscht.
Er selbst möchte dem Verein "{{ $preferredClub }}" zugeordnet werden.
<br />
<br />
Der Button führt euch zu der Übersichtsseite der User, wo ihr das Problem beheben könnt.

@component("mail::button", ["url" => $url])
User zu Verein hinzufügen
@endcomponent

Viel Erfolg.

@endcomponent

