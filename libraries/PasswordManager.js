#!/usr/bin/env node

`use strict` ;

const clipboardy = require ( `clipboardy` ) ;

const colors = require ( `colors` ) ;

const Configstore = require ( `configstore` ) ;

const fs = require ( `fs` ) ;

const os = require ( `os` ) ;

const package_json = require ( `./../package.json` ) ;

const path = require ( `path` ) ;

class PasswordManager
{
	constructor ()
	{
		this . configstore = new Configstore ( package_json . name , {} ) ;
		this . letters = `aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ` ;
		this . numbers = `0123456789` ;
		this . symbols = `\`~!@#$%^&*()-_=+[]{}\|;:'",<.>/?` ;
	}

	generate ( password_length , password_name , has_letters , has_numbers , has_symbols , store_password )
	{
		if ( password_name === `all` )
		{
			throw ( new Error ( `"${ password_name }" is a reserved name in pass-manager.` ) ) ;
		}
		if ( ! has_letters && ! has_numbers && ! has_symbols )
		{
			throw ( new Error ( `Secure passwords cannot be generated without letters, numbers, and symbols.` ) ) ;
		}
		let password_body = `` ;
		( has_letters ) ? ( password_body += this . letters ) : ( `` ) ;
		( has_numbers ) ? ( password_body += this . numbers ) : ( `` ) ;
		( has_symbols ) ? ( password_body += this . symbols ) : ( `` ) ;
		let password = `` ;
		for ( let i = 0 ; i < password_length ; i ++ )
		{
			password += password_body . charAt ( Math . floor ( Math . random () * password_body . length ) ) ;
		}
		( store_password ) ? ( this . configstore . set ( `password.${ password_name }` , password ) ) : ( `` ) ;
		return ;
	}

	remove ( password_option , password_name = `all` )
	{
		let password_id = ( password_name === `all` ) ? ( `` ) : ( `.${ password_name }` ) ;
		const password = this . configstore . get ( `password${ password_id }` ) ;
		if ( ! password )
		{
			throw ( new Error ( `No ${ ( password_name !== `all` ) ? ( `such named ` ) : ( `` ) }secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } currently stored.\nNOTE: You can run "pass-manager show" to display all currently stored secure passwords.` ) ) ;
		}
		switch ( password_option )
		{
			case ( `copy` ) :
				this . show ( `copy` , password_name ) ;
				break ;
			case ( `export` ) :
				this . show ( `export` , password_name ) ;
				break ;
			case ( `show` ) :
				this . show ( `show` , password_name ) ;
				break ;
		}
		let password_length = password . length ;
		this . configstore . delete ( `password${ password_id }` ) ;
		if ( password_option === `replace` )
		{
			console . log ( `Secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } deleted from storage.` . brightGreen ) ;
			const password_body = this . letters + this . numbers + this . symbols ;
			if ( password_name === `all` )
			{
				Object . keys ( password ) . forEach ( ( key ) =>
					{
						password_length = password [ key ] . length ;
						let new_password = `` ;
						for ( let i = 0 ; i < password_length ; i ++ )
						{
							new_password += password_body . charAt ( Math . floor ( Math . random () * password_body . length ) ) ;
						}
						this . configstore . set ( `password.${ key }` , new_password ) ;
						return ;
					}
				) ;
			}
			else
			{
				let new_password = `` ;
				for ( let i = 0 ; i < password_length ; i ++ )
				{
					new_password += password_body . charAt ( Math . floor ( Math . random () * password_body . length ) ) ;
				}
				this . configstore . set ( `password${ password_id }` , new_password ) ;
			}
			console . log ( `Secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } generated.` . brightGreen ) ;
		}
		console . log ( `Secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } ${ ( password_option === `replace` ) ? ( `persisted` ) : ( `deleted from storage` ) }.` . brightGreen ) ;
		return ;
	}

	show ( password_option , password_name = `all` )
	{
		let password_id = ( password_name === `all` ) ? ( `` ) : ( `.${ password_name }` ) ;
		const password = this . configstore . get ( `password${ password_id }` ) ;
		if ( ! password )
		{
			throw ( new Error ( `No ${ ( password_name !== `all` ) ? ( `such named ` ) : ( `` ) }secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } currently stored.\nNOTE: You can run "pass-manager show" to display all currently stored secure passwords.` ) ) ;
		}
		switch ( password_option )
		{
			case ( `copy` ) :
				clipboardy . writeSync ( ( typeof ( password ) === `string` ) ? ( password ) : ( JSON . stringify ( password ) ) ) ;
				console . log ( `Secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } replicated into your clipboard.` . brightGreen ) ;
				break ;
			case ( `export` ) :
				fs . open ( path . join ( `./storage/` , `passwords.txt` ) , `w` , 666 , ( err , ref ) =>
					{
						fs . write ( ref , ( typeof ( password ) === `string` ) ? ( ` { ${ password_name } : ` + password + ` } ` ) : ( JSON . stringify ( password ) ) + os . EOL , null , `utf-8` , () =>
							{
								fs . close ( ref ) ;
								return ;
							}
						) ;
						return ;
					}
				) ;
				console . log ( `Secure password${ ( password_name === `all` ) ? ( `s` ) : ( `` ) } written-out to:` . brightBlue , `./storage/passwords.txt` . brightGreen ) ;
				break ;
			default :
				console . log ( ( typeof ( password ) === `string` ) ? ( ( ` { ` + password_name + ` : ` ) . brightBlue + password . brightGreen + ` } ` . brightBlue ) : ( password ) , `\nNOTE: Displaying your currently stored secure passwords is inadvisable in a production environment.` . brightBlue ) ;
				break ;
		}
		return ;
	}
}

module . exports = PasswordManager ;
