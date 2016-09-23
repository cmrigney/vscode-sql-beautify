// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var vkbeautify = require('vkbeautify');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sql-beautify" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.beautifySql', function () {
        // The code you place here will be executed every time your command is executed

        var selections = [];
        for (var i = 0; i < vscode.window.activeTextEditor.selections.length; i++) {
            var s = vscode.window.activeTextEditor.selections[i];
            if (!s.start.isEqual(s.end))
                selections.push(new vscode.Range(s.start, s.end));
        }

        if (selections.length === 0) {
            selections.push(new vscode.Range(vscode.window.activeTextEditor.document.positionAt(0), vscode.window.activeTextEditor.document.positionAt(vscode.window.activeTextEditor.document.getText().length)));
        }

        vscode.window.activeTextEditor.edit(function(builder) {
            for (var i = 0; i < selections.length; i++) {
                var range = selections[i];
                var text = vscode.window.activeTextEditor.document.getText(range).toString();
                var bt = vkbeautify.sql(text);
                builder.replace(range, bt);
            }
        });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;