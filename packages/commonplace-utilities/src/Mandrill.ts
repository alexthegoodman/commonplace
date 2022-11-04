const mandrill = require("node-mandrill")(process.env.MANDRILL_KEY);

export default class Mandrill {
  constructor() {}

  sendEmail(toEmail, toName, subject, templateName, templateContent) {
    try {
      return mandrill(
        "/messages/send-template",
        {
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
            subject,
          },
          template_content: templateContent,
          template_name: templateName,
        },
        (err, res) => {
          if (err) {
            console.error(
              "ERROR. sendEmail ",
              toEmail,
              toName,
              subject,
              templateName,
              JSON.stringify(err)
            );
            // TODO: add mixpanel
          } else {
            console.info(
              "SUCCESS. sendEmail ",
              toEmail,
              toName,
              subject,
              templateName,
              res
            );
          }
        }
      );
    } catch (error) {
      console.error("MANDRILL ERROR", error);
      // TODO: add mixpanel
    }
  }
}
