#!/usr/bin/env node

`use strict` ;

const commander = require ( `commander` ) ;

const show = require ( `./../commands/show` ) ;

commander
. option ( `--copy <name>` , `Specify that this secure password is to be replicated into your clipboard.` , false )
. option ( `--export <name>` , `Specify that this secure password is to be written-out.` , false )
. option ( `--show <name>` , `Specify that this secure password is to be displayed.` , false )
. action ( ( com ) =>
		{
			show . password ( com ) ;
		}
	) ;

commander . parse ( process . argv ) ;

if ( ! process . argv [ 1 ] )
{
	commander . outputHelp () ;
}
