#!/usr/bin/env node

`use strict` ;

const colors = require ( `colors` ) ;

const PasswordManager = require ( `./../libraries/PasswordManager` ) ;

const remove =
{
	password ( com )
	{
		try
		{
			const password_manager = new PasswordManager () ;
			if ( com . copy || com . export || com . remove || com . replace || com . show )
			{
				const password_options = [ `copy` , `export` , `remove` , `replace` , `show` ] ;
				const password_names = [ com . copy , com . export , com . remove , com . replace , com . show ] ;
				const iteration_count = password_names . length ;
				for ( let i = 0 ; i < iteration_count ; i ++ )
				{
					let password_option = password_options [ i ] ;
					let password_name = password_names [ i ] ;
					if ( typeof ( password_name ) !== `string` )
					{
						continue ;
					}
					password_manager . remove ( password_option , password_name ) ;
					continue ;
				}
			}
			else
			{
				password_manager . remove ( `remove` , `all` ) ;
			}
			return ;
		}
		catch ( err )
		{
			console . error ( err . message . brightRed ) ;
			return ;
		}
	}
} ;

module . exports = remove ;
