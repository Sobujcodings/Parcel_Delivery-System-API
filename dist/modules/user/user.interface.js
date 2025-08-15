"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActive = exports.Role = void 0;
// enum e nam dilam ata tar value dilam ata
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["SENDER"] = "SENDER";
    Role["RECEIVER"] = "RECEIVER";
})(Role || (exports.Role = Role = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
