sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.bootcamp.fiori.finalproject.controller.Home", {
        onInit: function () {
            const oModel = this.getOwnerComponent().getModel();
            this.getView().setModel(oModel);
            this.loadSuppliers();
            this.oRouter = this.getOwnerComponent().getRouter()
        },
        loadSuppliers: function () {
            const oTable = this.byId("suppliersTable");
            oTable.bindRows({
                path: "/Suppliers"
            });
        },
        onApplyFilters: function () {
            const oTable = this.byId("suppliersTable");
            const oBinding = oTable.getBinding("rows");
            const sSupplierInputValue = this.byId("supplierFilter").getValue().trim();
        
            let aFilters = [];
            let oFilterId = null;
        
            if (!sSupplierInputValue) {
                oBinding.filter([]);
                return;
            }
        
            if (!isNaN(sSupplierInputValue)) {
                oFilterId = new Filter("SupplierID", FilterOperator.EQ, parseInt(sSupplierInputValue, 10));
                aFilters.push(oFilterId);
            }

            let oFilterName = new Filter("CompanyName", FilterOperator.Contains, sSupplierInputValue);
            aFilters.push(oFilterName);
        
            if (aFilters.length > 0) {
                let oCombinedFilter = new Filter({
                    filters: aFilters,
                    and: false
                });
        
                console.log("Filtros aplicados:", oCombinedFilter);
                oBinding.filter(oCombinedFilter);
            }
        },
        
        onRowActionPress: function (oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext();
            var oData = oContext.getObject();

            var sId = oData.SupplierID;

            console.log("fila:", oData);
            console.log("ID:", sId);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", { SupplierID: sId });

        },
    });

});