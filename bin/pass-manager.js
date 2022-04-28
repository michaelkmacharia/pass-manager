#!/usr/bin/env node

`use strict` ;

const commander = require ( `commander` ) ;

const package_json = require ( `./../package.json` ) ;

commander
. version ( package_json . version )
. command ( `generate` , `Generate and store a secure password.` )
. command ( `remove` , `Remove all currently stored secure passwords.` )
. command ( `show` , `Show all currently stored secure passwords.` ) ;

commander . parse ( process . argv ) ;

if ( ! process . argv [ 2 ] )
{
	commander . outputHelp () ;
}
