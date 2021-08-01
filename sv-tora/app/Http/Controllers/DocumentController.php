<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Mail\GenericMail;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $documents = Document::all();
        return view("documents", ["documents" => $documents]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file = $request->file("document");
        $documents = Document::all();
        if ($file === null) {
            return view("documents", ["documents" => $documents])->with(["error" => "Bitte lade ein existierendes Dokument hoch."]);
        }
        $fileName = $request->file("document")->getClientOriginalName();
        if (Document::where("name", "=", $fileName)->first() !== null) {
            return view("documents", ["documents" => $documents])->with(["error" => "Ein Dokument mit dem Namne \"" .$fileName . "\" existiert schon!"]);
        }
        $fileExt = $request->file("document")->getClientOriginalExtension();
        $path = $request->file("document")->store("/public/documents");
        $newDocument = Document::create([
            "name" => $fileName,
            "path" => $path,
            "ext" => $fileExt,
        ]);
        return $this->index();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Document $document)
    {

        if ($document === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieses Dokument existiert nicht.");
        }

        $document->name = $request->input("name");
        $document->save();

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Dokument \"" . $document->name . "\" wurde erfolgreich umbenannt!");
    }

    public function download(Document $document) {
        return Storage::download($document->path, $document->name);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy(Document $document)
    {
        if ($document === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieses Dokument existiert nicht.");
        }
        $documentName = $document->name;
        Storage::delete($document->path);
        $document->delete();

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Dokument \"" . $documentName . "\" wurde erfolgreich gelöscht.");
    }
}
