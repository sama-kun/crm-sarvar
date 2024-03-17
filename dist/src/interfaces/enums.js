"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTypeEnum = exports.DiscountTypeEnum = exports.FileTypesEnum = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "user";
    RoleEnum["DELIVERYMAN"] = "deliveryman";
    RoleEnum["CLIENT"] = "client";
    RoleEnum["ROOT"] = "root";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));
var FileTypesEnum;
(function (FileTypesEnum) {
    FileTypesEnum["PDF"] = "pdf";
    FileTypesEnum["IMAGE"] = "image";
})(FileTypesEnum = exports.FileTypesEnum || (exports.FileTypesEnum = {}));
var DiscountTypeEnum;
(function (DiscountTypeEnum) {
    DiscountTypeEnum["standard"] = "standard";
    DiscountTypeEnum["discount1"] = "discount1";
    DiscountTypeEnum["discount2"] = "discount2";
})(DiscountTypeEnum = exports.DiscountTypeEnum || (exports.DiscountTypeEnum = {}));
var PaymentTypeEnum;
(function (PaymentTypeEnum) {
    PaymentTypeEnum["paid"] = "paid";
    PaymentTypeEnum["debt"] = "debt";
})(PaymentTypeEnum = exports.PaymentTypeEnum || (exports.PaymentTypeEnum = {}));
//# sourceMappingURL=enums.js.map