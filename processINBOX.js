// created by @FlohGro

// process drafts from INBOX
// ----------------------------------------------------
// START OF USER DEFINITIONS

// define the name of your inbox workspace
let inboxWorkspaceName = "INBOX";

// declare "display names" (for the prompt) and "action names" (from your Actions) in an array:
// the last pair does not need a "," after the [] brackets!s
let actionArray = [
  ['skip', ''],
  ['✅ Todoist inbox lines', 'INBOX line’s'],
  ['🔗 Todoist URL Task', 'Draft URL Task'],
  ['🗂 Bookmark to DEVONthink', 'bookmark to DEVONthink'],
  ['⌨️ Markdown to DEVONthink', 'Markdown to DEVONthink CB'],
  ['🏷 add tags from category', 'add tag from category'],
  ['🗑 trash', 'trash']
  //   ['', ''],
  //   ['', ''],
  //   ['', ''],
];

// END OF USER DEFINITIONS
// ----------------------------------------------------

let actionMap = new Map(actionArray);
// - get drafts from INBOX Workspace
let inboxWorkspace = Workspace.find(inboxWorkspaceName);
let inboxDrafts = inboxWorkspace.query("all");

// loop through every draft (show title and prompt for action on it)

for (inboxDraft of inboxDrafts) {
  let actionPrompt = new Prompt();
  actionPrompt.title = "process draft"
  actionPrompt.message = "draft: " + inboxDraft.displayTitle;

  // add button for all elements in the actionMap

  actionMap.forEach(function(value, key) {
    actionPrompt.addButton(key, value);
  })
  actionPrompt.isCancellable = false;
  actionPrompt.show();

  let selectedAction = actionPrompt.buttonPressed;

  if (selectedAction == '') {
    // no action for the given name
  } else {
    let action = Action.find(selectedAction);
    app.queueAction(action, inboxDraft);
  }

}