## #1 - Create
REQ
{
	"username":"jb0070072",
	"email":"devjody@gmail.com",
	"password":"password007"
}
RES
{
	"data": {
		"username": "jb0070072",
		"email": "devjody@gmail.com",
		"password": "$2b$10$r2sPohDG0qTT6mBcVS2mu.9c3bvAUpBNlj.NeHrRnbzufwAfD7Wq.",
		"_id": "62344534a5012302a851d0fe",
		"createdAt": "2022-03-18T08:39:16.643Z",
		"updatedAt": "2022-03-18T08:39:16.643Z",
		"__v": 0
	},
	"success": true,
	"loc": "end try sign up"
}
# DB Entry
{"_id":{"$oid":"62344534a5012302a851d0fe"},"username":"jb0070072","email":"devjody@gmail.com","password":"$2b$10$r2sPohDG0qTT6mBcVS2mu.9c3bvAUpBNlj.NeHrRnbzufwAfD7Wq.","createdAt":{"$date":"2022-03-18T08:39:16.643Z"},"updatedAt":{"$date":"2022-03-18T08:39:16.643Z"},"__v":0}

## #2 - Test duplicate sign up
REQ
{
	"username":"jb0070072",
	"email":"devjody@gmail.com",
	"password":"password007"
}
RES
{
	"data": "Username or Password Already Exists", !!!
	"success": false,
	"loc": "dupilcate user if"
}

## #3 - Test body failed validation - email field not valid
REQ
{
	"username":"jb0070072",
	"em":"devjody@gmail.com", !!!
	"password":"password007"
}
RES
{
	"data": "\"email\" is required",
	"success": false,
	"loc": "validatation schema error"
}
## #4 - Test body failed validation - password field not valid
REQ
{
	"username":"jb0070072",
	"email":"devjody@gmail.com",
	"password":"234" !!!
}
RES
{
	"data": "\"password\" length must be at least 6 characters long",
	"success": false,
	"loc": "validatation schema error"
}
## #5 - Test body failed validation - username field not valid
REQ
{
	"username":"0$&..072", !!!
	"email":"devjody@gmail.com",
	"password":"password007"
}
RES
{
	"data": "\"username\" must only contain alpha-numeric characters",
	"success": false,
	"loc": "validatation schema error"
}
## #6 - Final update to output
REQ
{
	"username":"jarrrb8886",
	"email":"devjody6@gmail.com",
	"password":"password007"
}
RES
{
	"data": {
		"id": "62344992249f6f1cc3864566",  * Mongo _id created *
		"username": "jarrrb8886", * username created *
		"success": true, * request response flag *
		"loc": "end try sign up" * location of any issues *
	}
}