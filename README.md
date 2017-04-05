#AngularJS

Angular:
	- Et framework for dynamiske apps.
	- Lader en burge HTML som templating sprog og udvider HTMLs syntax.

Module:
	- Er en container for forskellige dele af applikationen.


Controller:
	- Javascript constructor.
	- Tilføjer adfærd til $scope objektet.
	- Kontrollere data.


Scope:
	- Scope er et object der refererer til applikationenes model.
	- De indeholder modellens data, som skal vidergives til viewet.
	- Linker Controller og View sammen.


RootScope:
	- Alle applikationer har en enkelt rootScope.
	- Alle andre scopes er efterkommere af rootScopet.


Directive:
	- Markører på DOM elementer (kan være attributer, element navne, kommentarer eller CSS klasser), der fortæller Angulars HTML compiler, at elementet skal gøre noget bestemt (ved hjælp af eventlisteners).
	- Indbygget directives: ngBind, ngModel, ngClass, ng-repeat osv.


Data-binding:
	- Automatisk synkronisering af data imellem modellen og viewets komponenter.
	- Viewet er en konstant projektering af modellen.
	- Når modellen ændre sig, afspejles det i viewet og vice versa.


Service:
	- Returnerer funktionen.


Factory:
	- returnerer en funktions returnerings værdi.


Dependency Injection:
	- Et software design mønster, der beskæftiger sig med, hvordan komponenter får fat i deres dependencies.
	- Angular injector subsytem, er ansvarlig for at oprette komponenter, løse deres dependencies og give dem til andre komponenter.



--------------------------------------------------------------------------
#Backend
----------

Node.js:
	- Server-side Javascript environment.
	- Eventdriven, venter aldrig på svar fra API, kan tage mange Requests og Responde instant. 
	- Cross-platform.

Express.js:
	- Et framework til Node.js som gør det nemmere at lave det som man kan lave med Node.js i en pændere indpakning.

	- Middleware : logik der fortæller express hvordan den skal håndtere et request når det er lavet hos klienten og inden den havner ved routerne.


HTTP:
	- Post
		- Create
	- Get
		- Retrieve
	- Delete
		- Delete
	- Put
		- Update resource completely
	- Patch
		- Update partial resources


--------------------------------------------------------------------------
#Database
----------

MongoDB:
	- Open source database.
	- Document orienteret data.


NoSql:
	- Tabeller/collections er ikke relationel.
	- Skalerbar, hurtig og er god til at behandle store mængder data der ændres ofte.
	- Json data.

	- Kan dog blive meget uoverskueligt.

Sql:
	- Relationel.
	- Umuligt t tilføje data der ikke er defineret i tabellerne.



Models:
	- For at sikre en "data consistency".



--------------------------------------------------------------------------
#Package managers og build tools
----------

NPM:
	- Node Package Manager.
	- Nemt for udviklere at dele og genbruge kode.


Bower:
	- En package manager.
	- Front-end stuff.


Gulp:
	- Et build tool.
	- Man bygger selv et buildtool der f.eks kan minify css og js og meget mere.


