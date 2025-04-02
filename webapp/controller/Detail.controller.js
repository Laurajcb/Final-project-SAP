sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, UIComponent, Fragment, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("com.bootcamp.fiori.finalproject.controller.Detail", {
        onInit() {
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

            let oSmartTable = this.getView().byId("ST_ORDER_D");
            oSmartTable.attachEventOnce("dataReceived", () => {
                let oTable = oSmartTable.getTable();
                if (oTable) {
                    oTable.setMode("SingleSelectMaster");
                    oTable.attachSelectionChange(this.onRowSelectionChange, this);
                }
            });

            oSmartTable.attachEvent("beforeRebindTable", this.onBeforeRebindTable);

            let oLocalModel = new JSONModel({
                newMaterial: {}
            });
            this.getView().setModel(oLocalModel, "localModel");
        },

        _onObjectMatched(oEvent) {
            let sSupplierID = oEvent.getParameter("arguments").SupplierID;
            let oModel = this.getView().getModel();

            this.getView().bindElement({
                path: `/Suppliers(${sSupplierID})`,
                parameters: { expand: "Products" }
            });

            let oSmartTable = this.getView().byId("ST_ORDER_D");
            oSmartTable.setTableBindingPath("Products");

            let oContextBinding = this.getView().getElementBinding();
            if (oContextBinding) {
                oContextBinding.refresh(true);
            }
        },

        onBeforeRebindTable(oEvent) {
            let oBindingParams = oEvent.getParameter("bindingParams");
        },

        onRowSelectionChange(oEvent) {
            let oTable = oEvent.getSource();
            let oSelectedItem = oTable.getSelectedItem();

            if (oSelectedItem) {
                let oContext = oSelectedItem.getBindingContext();
                this._openMaterialDetailsDialog(oContext);
            }
        },

        _openMaterialDetailsDialog(oContext) {
            let oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.bootcamp.fiori.finalproject.view.fragments.MaterialDetailsDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oDialog = oDialog;
                    oView.addDependent(this._oDialog);
                    this._oDialog.setBindingContext(oContext);
                    this._oDialog.open();
                });
            } else {
                this._oDialog.setBindingContext(oContext);
                this._oDialog.open();
            }
        },

        onCreateMaterial() {
            let oView = this.getView();
            let oLocalModel = oView.getModel("localModel");
            oLocalModel.setProperty("/newMaterial", {});

            if (!this._oCreateDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.bootcamp.fiori.finalproject.view.fragments.CreateMaterialDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oCreateDialog = oDialog;
                    oView.addDependent(this._oCreateDialog);
                    this._oCreateDialog.open();
                }).catch(() => {
                    MessageToast.show("Error opening the creation form.");
                });
            } else {
                this._oCreateDialog.open();
            }
        },

        onSaveMaterial() {
            let oLocalModel = this.getView().getModel("localModel");
            let oNewMaterial = oLocalModel.getProperty("/newMaterial");

            if (!oNewMaterial.ProductID || !oNewMaterial.ProductName) {
                MessageToast.show("Please complete the required fields: Product ID and Product Name.");
                return;
            }

            console.log("Data of the material created:", oNewMaterial);

            MessageToast.show(`Material ${oNewMaterial.ProductID} - ${oNewMaterial.ProductName} $ ${oNewMaterial.UnitPrice} successfully created .`);
            this._oCreateDialog.close();
        },

        onCloseDialog() {
            if (this._oDialog) {
                this._oDialog.close();
            }
        },

        onCancelDialog() {
            if (this._oCreateDialog) {
                this._oCreateDialog.close();
            }
        },
    });
});