#!/usr/bin/env node

`use strict` ;

const commander = require ( `commander` ) ;

const generate = require ( `./../commands/generate` ) ;

commander
. option ( `--length <number>` , `Specify the secure password length.` , 20 )
. option ( `--name <word>` , `Specify the secure password name.` , 'general' )
. option ( `--export` , `Specify that the secure password is to be written-out.` , false )
. option ( `--show` , `Specify that the secure password is to be displayed.` , false )
. option ( `--no-copy` , `Specify that the secure password is not to be replicated into your clipboard.` , true )
. option ( `--no-letters` , `Specify that no letters are to be included in the secure password.` , true )
. option ( `--no-numbers` , `Specify that no numbers are to be included in the secure password.` , true )
. option ( `--no-storage` , `Specify that the secure password is not to be persisted in storage.` , true )
. option ( `--no-symbols` , `Specify that no symbols are to be included in the secure password.` , true )
. action ( ( com ) =>
		{
			generate . password ( com ) ;
		}
	) ;

commander . parse ( process . argv ) ;

if ( ! process . argv [ 1 ] )
{
	commander . outputHelp () ;
}
