#!/usr/bin/env node

`use strict` ;

const commander = require ( `commander` ) ;

const remove = require ( `./../commands/remove` ) ;

commander
. option ( `--copy <name>` , `Specify that this secure password is to be replicated into your clipboard before deleting it from storage.` , false )
. option ( `--export <name>` , `Specify that this secure password is to be written-out before deleting it from storage.` , false )
. option ( `--remove <name>` , `Specify that this secure password is to be immediately deleted from storage.` , false )
. option ( `--replace <name>` , `Specify that this secure password is to be regenerated after deleting it from storage.` , false )
. option ( `--show <name>` , `Specify that this secure password is to be displayed before deleting it from storage.` , false )
. action ( ( com ) =>
		{
			remove . password ( com ) ;
		}
	) ;

commander . parse ( process . argv ) ;

if ( ! process . argv [ 1 ] )
{
	commander . outputHelp () ;
}
