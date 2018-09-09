'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.languages.registerDefinitionProvider(
			{ scheme: 'file', pattern: '**/*.pug' }, 
			new DartDefinitionProvider()
		)
	)

	console.log('extension "flutter-view-vscode" started')
}

export function deactivate() {
}

class DartDefinitionProvider implements vscode.DefinitionProvider {
    public async provideDefinition(
		document: vscode.TextDocument, 
		position: vscode.Position, 
		token: vscode.CancellationToken): Promise<vscode.Location | null> {
			// find the text we highlighted
			const range = document.getWordRangeAtPosition(position)
			const selected = document.getText(range)
			console.log('finding definition for', selected, 'at line', position.line + 1)
			// find the matching dart file and text/code
			const relativeFile = document.uri.path.replace('.pug', '.dart')
			const dartDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(relativeFile))
			const dartCode = dartDocument.getText()
			// create a map of pug->dart code relationships
			const locations = this.getPugLocations(dartCode)
			console.log(JSON.stringify(locations, null, 3))
			const pugLine = position.line+1
			let location = locations.find(loc=>loc.pug==pugLine)
			if(location) {
				const dartTextLine = dartDocument.lineAt(location.dart)
				const dartPosition = new vscode.Position(location.dart-1, dartTextLine.firstNonWhitespaceCharacterIndex)
				return new vscode.Location(vscode.Uri.file(relativeFile), dartPosition)
			} else {
				return null
			}
	}
	
	getPugLocations(text: string) : { pug: number, dart: number }[] {
		const locations = []
		const matches = text.match(/\#([0-9]+),([0-9]+)/gi)
		if(matches) {
			for(let match of matches) {
				const location = /\#([0-9]+),([0-9]+)/gi.exec(match)
				if(location) {
					locations.push({
						pug: parseInt(location[1]),
						dart: lineOf(text, match)
					})
				}
			}
		}
		return locations
	}
}

function lineOf(text: string, substring: string) : number {
	let line = 0, matchedChars = 0
  	for(let i = 0; i < text.length; i++) {
	  text[i] === substring[matchedChars] ? matchedChars++ : matchedChars = 0
  	  if(matchedChars === substring.length) return line + 1
	  if(text[i] === '\n') line++
	}
	return -1;
}