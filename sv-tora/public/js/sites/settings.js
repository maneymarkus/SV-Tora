/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "ModalModule", "SendRequestModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let currentFightTimeSpan = document.querySelector("span.time-for-one-fight");
    let changeFightTimeButton = document.querySelector("a.link.fight-time-in-seconds");

    changeFightTimeButton.addEventListener("click", function () {
        let settingKey = "fight_time_in_seconds";
        let rangeInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.RANGE, [settingKey], undefined, settingKey, "Zeit pro Kampf (in Sekunden):", undefined, undefined, undefined);
        rangeInput.setMax(480);
        rangeInput.setMin(15);
        rangeInput.setStep(1);
        rangeInput.setValue(parseInt(currentFightTimeSpan.innerText));
        let ModalWindow = App.ModalModule.confirmModal("Wettkampf-Parameter ändern", rangeInput.inputContainer, function () {
            currentFightTimeSpan.innerHTML = rangeInput.getValue();
        }, undefined, function () {
            if (!App.FormModule.checkInput(rangeInput.inputContainer, true)) {
                return false;
            } else {
                let data = {
                    setting_key: settingKey,
                    setting_value: rangeInput.getValue(),
                };
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, "/settings/1", () => { ModalWindow.closeModal(); currentFightTimeSpan.innerHTML = data.setting_value }, data, true);
            }
        });
    });

})(window, document);
