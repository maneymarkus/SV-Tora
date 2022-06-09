@if(!$tournament->active)
    <p class="error"><strong>Warnung:</strong> Dieser Wettkampf ist schon abgeschlossen. Du kannst als Admin zwar noch Änderungen vornehmen, aber solltest dir diese genau überlegen, da du damit die Historie verfälschen könntest.</p>
@endif
@if(\Carbon\Carbon::today() <= \Carbon\Carbon::parse($tournament->enrollment_end))
    <p class="error"><strong>Hinweis:</strong> Der Anmeldezeitraum ist noch nicht geschlossen und demnach können noch Veränderungen durch externe Personen vorgenommen werden. Änderungen, die du jetzt durchführst, sind möglicherweise noch nicht final.</p>
@endif
