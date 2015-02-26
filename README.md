# redactor-autolist
Generates an unordered list on use of '*' or '-' and generates an ordered list on use of '1.'.

Is the automatic generated list not wanted pressing the shortcut CTRL+Z will remove the auto generated list and brings back the typed in character.

A plugin developed for [Redactor](http://imperavi.com/redactor/), a WYSIWYG rich-text editor made by [imperavi](http://imperavi.com/).

The example uses [Angular Redactor](https://github.com/TylerGarlick/angular-redactor).

Feel free to contribute to this repository.

##Installation

Include autolist.js in your markup:

```html
<script src="autolist.js"></script>
```

##Usage
Configuration via HTML markup:

```html
<div id="page-editor-toolbar"></div>
 <textarea ng-model="pageModel.content"
                redactor="{
                            focus: true,
                            linebreaks: false,
                            tabKey: true,
                            plugins: ['autolist'],
                            toolbarExternal: '#page-editor-toolbar',
			  }"></textarea>
 ````
 

