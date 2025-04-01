sap.ui.define([
    "project/practice/utils/HomeService",
    "sap/ui/model/json/JSONModel"
]), function (HomeService, JSONModel) {
    "use strict";

    return {
        init: function () {
            const oModel = this.getOwnerComponent().getModel();
            // Usar el modelo en la vista
            this.getView().setModel(oModel);
        },
        
        loadSuppliers: function() {
            const oTable = this.byId("suppliersTable");
            oTable.bindItems({
                path: "/Suppliers",
            });
        }, 
    }
}