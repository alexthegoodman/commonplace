"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mandrill = require("node-mandrill")(process.env.MANDRILL_KEY);
var Mandrill = /** @class */ (function () {
    function Mandrill() {
    }
    Mandrill.prototype.sendEmail = function (toEmail, toName, subject, templateName, templateContent) {
        try {
            return mandrill("/messages/send-template", {
                message: {
                    to: [
                        {
                            email: toEmail,
                            type: "to",
                            name: toName,
                        },
                    ],
                    from_email: "admin@commonplace.social",
                    from_name: "CommonPlace",
                    subject: subject,
                },
                template_content: templateContent,
                template_name: templateName,
            }, function (err, res) {
                if (err) {
                    console.error("ERROR. sendEmail ", toEmail, toName, subject, templateName, JSON.stringify(err));
                    // TODO: add mixpanel
                }
                else {
                    console.info("SUCCESS. sendEmail ", toEmail, toName, subject, templateName, res);
                }
            });
        }
        catch (error) {
            console.error("MANDRILL ERROR", error);
            // TODO: add mixpanel
        }
    };
    return Mandrill;
}());
exports.default = Mandrill;
//# sourceMappingURL=Mandrill.js.map