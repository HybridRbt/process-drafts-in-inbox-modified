// created by @FlohGro
// modified by @HybridRbt

// process drafts from INBOX

// select from a list of workspace
// code from https://actions.getdrafts.com/a/1SG
let f = () => {
    let workspaces = Workspace.getAll();
    if (workspaces.length == 0) {
        alert("No workspaces defined.");
        return false;
    }

    let p = Prompt.create();
    p.title = "Select Workspace";
    p.message = "Choose workspace to process:";

    let ix = 0;
    for (let ws of workspaces) {
        p.addButton(ws.name, ix);
        ix++;
    }

    if (!p.show()) {
        return false;
    }

    // ----------------------------------------------------
    // START OF USER DEFINITIONS

    // declare "display names" (for the prompt) and "action names" (from your Actions) in an array:
    // the last pair does not need a "," after the [] brackets!s
    let actionArray = [
        ['skip', ''],
        ['✅ 单个任务发到滴答', 'Task in TickTick (Content)'],
        ['❇️ 多个任务发到滴答', 'Task in TickTick (Multi)'],
        ['☑️ Send to todoist', 'Todoist Quick Add V3'],
        ['💎 记录发到 obsidian', '→ Obsidian file dnp'],
        ['⚡️ 想法发到 flomo', 'Send to flomo'],
        ['🗑 删除', 'Trash']
        //   ['', ''],
        //   ['', ''],
        //   ['', ''],
    ];

    // END OF USER DEFINITIONS
    // ----------------------------------------------------
    let selectedIndex = p.buttonPressed;
    let inboxWorkspace = workspaces[selectedIndex];

    let actionMap = new Map(actionArray);
    let inboxDrafts = inboxWorkspace.query("inbox"); // see ref https://scripting.getdrafts.com/classes/workspace#query

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
}

if (!f()) {
	context.cancel();
}