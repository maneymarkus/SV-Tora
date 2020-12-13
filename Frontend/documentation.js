/***************************************************************************************

    This project has been written by Markus Städler, markus.staedler@weberlin-design.de, weberlin-design.de


    DOCUMENTATION:

 ************************************************************************************
    GENERAL CONCEPT:

    The whole code was designed and written in an object-oriented manner.
    All different semantic parts have been separated and encapsulated into different Modules which offer required global functions in APIs to keep the global scope clean and manage a clear structure
    All of the Modules are encapsulated inside a function, which gets executed after the DOM has been fully created.
    Beware of the order the different Modules were included, as Modules which offer required functions need to be included before the dependant Modules. See Dependencies Section for further information.





 ************************************************************************************
    TABLE OF CONTENTS:
    1. Module
    2. MaterialInputsModule
    3. LoaderModule
    4. NotificationModule
    5. MessagesModule
    6. HeaderModule
    7. NavModule
    8. AccordionModule
    9. CarouselModule
    10. FormModule
    11. ModalModule
    12. TablesModule
    13. FightMapModule


 ************************************************************************************
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





 *****************************************************************************************/