sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], (Controller, UIComponent, MessageToast) => {
    "use strict";

    return Controller.extend("com.bootcamp.fiori.finalproject.controller.Detail", {
        onInit() {
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            let sSupplierID = oEvent.getParameter("arguments").SupplierID;
   
            let oModel = this.getView().getModel();
            console.log("Modelo OData:", oModel);

            let oBinding = this.getView().bindElement({
                path: "/Suppliers(" + sSupplierID + ")",
                parameters: {
                    expand: "Products"
                },
                events: {
                    dataRequested: function() {
                        console.log("Solicitando datos para SupplierID:", sSupplierID);
                    },
                    
                }
            });

            let oContextBinding = this.getView().getElementBinding();
            if (oContextBinding) {
                oContextBinding.refresh(true);
            }
        }
    });
});