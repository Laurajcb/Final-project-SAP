sap.ui.define([
], function () {
    "use strict";

    return {
        readProducts: async function (oModel, oFilter) {
            const aRequestPromises = [
                new Promise(function (resolve, reject) {
                    oModel.read('/Suppliers', {
                        filters: oFilters,
                        succes: resolve,
                        error: reject
                    })
                }.bind(this))
            ]
            return Promise.all(aRequestPromises)
        },
    }
});