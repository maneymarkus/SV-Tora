This project has been written by Markus Städler, markus.staedler@weberlin-design.de, weberlin-design.de


This folder imitates the structure of the backend but wants to enable easy frontend development.

Stylesheets, Fonts, JavaScripts and images are found in the respective folders.

The HTML files are separated in individual folders




JAVASCRIPT

The whole code was designed and written in an object-oriented manner.
All different semantic parts have been separated and encapsulated into different Modules which offer required global functions in APIs to keep the global scope clean and manage a clear structure
All of the Modules are encapsulated inside a function, which gets executed after the DOM has been fully created.
Beware of the order the different Modules were included, as Modules which offer required functions need to be included before the dependant Modules. See Dependencies Section for further information.

TABLE OF CONTENTS:
1. Modules
   1.1 GeneralModule
   1.2. MaterialInputsModule
   1.3 LoaderModule
   1.4 NotificationModule
   1.5 MessagesModule
   1.6 HeaderModule
   1.7 NavModule
   1.8 AccordionModule
   1.9 CarouselModule
   1.10 FormModule
   1.11 ModalModule
   1.12 TablesModule
   1.13 FightMapModule
2. Dependencies

DEPENDENCIES:
Usage: ModuleName: Depends on RequiredModuleName

    Module: None
    MaterialInputsModule: Depends on Module
    LoaderModule: None
    NotificationModule: Depends on Module
    MessageModule: Depends on Module
    HeaderModule: None
    NavModule: None
    AccordionModule: None
    CarouselModule: None
    FormModule: None
    ModalModule: None
    TablesModule: Depends on Module, ModalModule
    FightMapModule: None