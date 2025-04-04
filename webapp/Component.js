sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/bootcamp/fiori/finalproject/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.bootcamp.fiori.finalproject.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "data");

            // enable routing
            this.getRouter().initialize();
        },
        setInitModel: function () {
            HomeHelper.init(this.getModel());
        } 
    });
});