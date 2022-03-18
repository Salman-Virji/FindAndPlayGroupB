## #1 - Attempt Login
REQ

RES

# DB Entry



## #2 - Sign In fail db no user
REQ
{
	"username":"jarrerb888", !!!
	"password":"password007"
}
RES
	"data": "Username or Email does not exist", !!!
	"success": false,
	"loc": "username not found if"
}
## #3 - Sign In fail password field
REQ
{
	"username":"jarrrb888",
	"passwor1d":"password007" !!!
}
RES
{
	"data": {
		"error": "\"password\" is required", !!!
		"success": false,
		"loc": "validatation sign in schema error"
	}
}

## #4 - Sign In fail validation username
REQ
{
	"user":"jarrrb888", !!!
	"password":"password007"
}
RES
{
	"data": {
		"error": "\"username\" is required", !!!
		"success": false,
		"loc": "validatation sign in schema error"
	}
}
## #5 - Sign In fail validation blank space / invalid username
REQ
{
	"username":"ewe  b8", !!!
	"password":"password007"
}
RES
{
	"data": {
		"error": "\"username\" must only contain alpha-numeric characters", !!!
		"success": false,
		"loc": "validatation sign in schema error"
	}
}
## #6 - Sign In fail validation blank space / invalid password
REQ
{
	"username":"jarrrb888",
	"password":"pass" !!!
}
RES
{
	"data": {
		"error": "\"password\" length must be at least 6 characters long", !!!
		"success": false,
		"loc": "validatation sign in schema error"
	}
}
## #7 - Sign In fail multiple validation fail using {abortEarly: false}
REQ
{
	"usernagme":"jarrrb888", !!!
	"password":"pass    " !!!
}
RES
{
	"data": {
		"error": "\"username\" is required. \"password\" length must be at least 6 characters long",
		"success": false,
		"loc": "validatation sign in schema error"
	}
}
## #8 - Sign In fail 
REQ
{
	"usernagme":"jarrrb888", !!!
	"password":"pass    " !!!
}
RES
{
	"data": {
		"error": "username is required. password length must be at least 6 characters long. usernagme is not allowed",
		"location": "CATCH - SignIn",
		"success": false
	}
}

## #6 - Final update to output
REQ

RES
