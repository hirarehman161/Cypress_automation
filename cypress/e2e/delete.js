const { MailSlurp } = require("mailslurp-client");

const mailslurp = new MailSlurp({ apiKey: "6aff62e465a1b5ed5b2e09437bac784308c6a03b1a603ab1d054a1289775ef6c" });

async function deleteExpiredInbox() {
  const inboxId = "bbb91820-2a64-43ca-b4a7-d6bee73b6e28"; // replace with actual inbox ID
  await mailslurp.deleteInbox(inboxId);
}

deleteExpiredInbox();
