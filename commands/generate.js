#!/usr/bin/env node

`use strict` ;

const colors = require ( `colors` ) ;

const PasswordManager = require ( `./../libraries/PasswordManager` ) ;

const show = require ( `./show` ) ;

const generate =
{
	password ( com )
	{
		try
		{
			const password_manager = new PasswordManager () ;
			password_manager . generate ( com . length , com . name , com . letters , com . numbers , com . symbols , com . storage ) ;
			console . log ( `Secure password generated.` . brightGreen ) ;
			( com . storage ) ? ( console . log ( `Secure password persisted.` . brightGreen ) ) : ( `` ) ;
			if ( com . copy || com . export || com . show )
			{
				com . copy = ( com . copy === true ) ? ( com . name ) : ( false ) ;
				com . export = ( com . export === false ) ? ( false ) : ( com . name ) ;
				com . show = ( com . show === false ) ? ( false ) : ( com . name ) ;
				show . password ( com ) ;
			}
			console . log ( `NOTE: You can run "pass-manager show" to display all currently stored secure passwords.` . brightBlue ) ;
			return ;
		}
		catch ( err )
		{
			console . error ( err . message . brightRed ) ;
			return ;
		}
	}
} ;

module . exports = generate ;
