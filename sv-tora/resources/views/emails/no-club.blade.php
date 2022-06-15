@component("mail::message")
Hey Admins,<br />
User "{{ $username }}" ist aktuell keinem Verein zugeordnet.
Bitte behebt das Problem, indem ihr diesen User einem Verein zuordnet oder den User löscht.
Der User hat angegeben, dass er dem Verein "{{ $preferredClub }}" zugeordnet werden möchte.
<br />
<br />
Der Button führt euch zu der Übersichtsseite der User, wo ihr das Problem beheben könnt.

@component("mail::button", ["url" => $url])
User zu Verein hinzufügen
@endcomponent

Viel Erfolg.

@endcomponent

