
# oauth-angular-client
OAuth Angular Client Proof of Concept which uses an indirect approach.

What is OAuth 2.0
-----

OAuth 2.0 is the next evolution of the OAuth protocol which was originally created in late 2006. 

OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.

OAuth 2 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service.

It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account.



Roles
-----
OAuth defines four roles:

  * Resource Owner
  * Client
  * Resource Server
  * Authorization Server

The resource owner is the user who authorizes an application to access their account.

The client is the application that wants to access the user's account. Before it may do so, it must be authorized by the user, and the authorization must be validated by the API.

The resource server hosts the protected user accounts.

The authorization server verifies the identity of the user then issues access tokens to the application.

Before using OAuth with your application, you must register your application with the service. This is done through a registration form in the "developer" or "API" portion of the service's website, where you will provide the following information:

  * Application Name
  * Application Website
  * Redirect URI or Callback URL

Once your application is registered, the service will issue "client credentials" in the form of a client identifier and a client secret. 

Client ID, Client Secret and Redirect URI
-----------------------------------------

The Client ID is a publicly exposed string that is used by the service API to identify the application, and is also used to build authorization URLs that are presented to users. 

The Client Secret is used to authenticate the identity of the application to the service API when the application requests to access a user's account, and must be kept private between the application and the API, if a deployed app cannot keep the secret confidential, such as Javascript or native apps, then the secret is not used.

The service will only redirect users to a registered URI, which helps prevent some attacks. Any HTTP redirect URIs must be protected with TLS security, so the service will only redirect to URIs beginning with "https". This prevents tokens from being intercepted during the authorization process.

Obtaining Authorization
-----------------------

To request an access token, the client obtains authorization from the resource owner.  
The authorization is expressed in the form of an authorization grant, which the client uses to request the access token.

Grant Types
-----------

OAuth 2 defines four grant types, each of which is useful in different cases:

  * Authorization Code: used with server-side Applications
  
  * Implicit: used with Mobile Apps or Web Applications 
  
  * Resource Owner Password Credentials: used with trusted Applications, such as those owned by the service itself
  
  * Client Credentials: used with Applications API access

Authorization Code Grant
========================

The authorization code grant type is used to obtain both access tokens and refresh tokens and is optimized for confidential clients.
It is the most commonly used because it is optimized for server-side applications, where source code is not publicly exposed, and Client Secret confidentiality can be maintained.

     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.
 

A - Client Identifier & Redirection URI
---------------------------------------

 
The client constructs the request URI by adding the following parameters to the query component of the authorization endpoint URI:

Example URI: https://accounts.google.com/o/oauth2/auth?

QueryString Parameters:

client_id: the application's client ID

redirect_uri: where the service redirects the user-agent after an authorization code is granted

response_type:code specifies that your application is requesting an authorization code grant

scope: specifies the level of access that the application is requesting

Example URI:
https://accounts.google.com/o/oauth2/auth?client_id=1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com&redirect_uri=http://localhost:9000/&response_type=code&scope=read

A' - User Authorizes Application
--------------------------------

When the user clicks the link, they must first log in to the service, to authenticate their identity. Then they will be prompted by the service to authorize or deny the application access to their account.

B - Authorization Response
--------------------------

If the resource owner grants the access request, the authorization server issues an authorization code and delivers it to the client by adding the following parameters to the query component of the redirection URI

code: The authorization code generated by the authorization server. The authorization code MUST expire shortly after it is issued to mitigate the risk of leaks.

state: (Optional) It is required if the "state" parameter was present in the client authorization request.  
The exact value received from the client.

Example URI:
http://localhost:9000/callback?code=SplxlOBeZQQYbYS6WxSbIA

C - Access Token Request
------------------------

The client makes a request to the API token endpoint passing the authorization code along with authentication details, including the client secret. These are the passed parameters:

Example URL: https://accounts.google.com/o/oauth2/token?

QueryString Parameters:

grant_type: Value MUST be set to "authorization_code".

code: The authorization code received from the authorization server.

client_id: the application's client ID

client_secret: the application's client secret

redirect_uri: where the service redirects the user-agent after an authorization code is granted

Example URI: https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&client_id=1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com&client_secret=secret&redirect_uri=http://localhost:9000/

D - Access Token Response
-------------------------

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token.

An example successful response is:

{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "token_type":"bearer",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
}

Implicit Grant
==============

An implicit authorization grant is similar to an authorization code grant, except the access token is returned to the client application already after the user has finished the authorization. The access token is thus returned when the user agent is redirected to the redirect URI (it does not support the issuance of refresh tokens).

This of course means that the access token is accessible in the user agent, or native application participating in the implicit authorization grant. The access token is not stored securely on a web server.

Furthermore, the client application can only send its client ID to the authorization server. If the client were to send its client secret too, the client secret would have to be stored in the user agent or native application too. That would make it vulnerable to hacking.

The implicit grant type is used for mobile apps and web applications, where the client secret confidentiality is not guaranteed.

The implicit grant type does not include client authentication, and relies on the presence of the resource owner and the registration of the redirection URI.  Because the access token is encoded into the redirection URI, it may be exposed to the resource owner and other applications residing on the same device.

     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier     +---------------+
     |         -+----(A)-- & Redirection URI --->|               |
     |  User-   |                                | Authorization |
     |  Agent  -|----(B)-- User authenticates -->|     Server    |
     |          |                                |               |
     |          |<---(C)--- Redirection URI ----<|               |
     |          |          with Access Token     +---------------+
     |          |            in Fragment
     |          |                                +---------------+
     |          |----(D)--- Redirection URI ---->|   Web-Hosted  |
     |          |          without Fragment      |     Client    |
     |          |                                |    Resource   |
     |     (F)  |<---(E)------- Script ---------<|               |
     |          |                                +---------------+
     +-|--------+
       |    |
      (A)  (G) Access Token
       |    |
       ^    v
     +---------+
     |         |
     |  Client |
     |         |
     +---------+

   Note: The lines illustrating steps (A) and (B) are broken into two
   parts as they pass through the user-agent.

The implicit grant flow basically works as follows: the user is asked to authorize the application, then the authorization server passes the access token back to the user-agent, which passes it to the application

A - Authorization Request
-------------------------

The client constructs the request URI by adding the following parameters to the query component of the authorization endpoint URI, just like in the authorization code grant above, except it is now requesting a token instead of a code :

Example URI: https://accounts.google.com/o/oauth2/auth?

QueryString Parameters:

client_id: the application's client ID

redirect_uri: where the service redirects the user-agent after an authorization code is granted

response_type:token specifies that your application is requesting an authorization code grant

scope: specifies the level of access that the application is requesting

Example URI:
https://accounts.google.com/o/oauth2/auth?client_id=1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com&redirect_uri=http://localhost:9000/&response_type=token&scope=read

A' - User Authorizes Application
--------------------------------

When the user clicks the link, they must first log in to the service, to authenticate their identity. Then they will be prompted by the service to authorize or deny the application access to their account.

B - Access Token Response
-------------------------

If the resource owner grants the access request, the authorization server issues an access token and delivers it to the client by adding the following parameters to the fragment component of the redirection URI:

access_token: The access token issued by the authorization server.

token_type: The type of the token issued. Value is case insensitive.

expires_in: The lifetime in seconds of the access token.

scope: Optinal if identical to the scope requested by the client

state (Optional): It is required if the "state" parameter was present in the client authorization request.  

C - Redirection URI with Access Token in Fragment
-------------------------------------------------

The service redirects the user-agent to the application redirect URI to a redirect URI like this one:

http://localhost:9000/callback#token=2YotnFZFEjr1zCsicMWpAA

D - Redirection URI without fragment
------------------------------------

The user-agent follows the redirect URI but retains the access token.

E - Script
----------

The application returns a webpage that contains a script that can extract the access token from the full redirect URI that the user-agent has retained.

G - Access Token passed to Client
----------

The user-agent executes the provided script and passes the extracted access token to the application.

Now the application is authorized! It may use the token to access the user's account via the service API

Resource Owner Password Credentials Grant
=========================================

The resource owner password credentials grant type is suitable in cases where the resource owner has a trust relationship with the client, such as the device operating system or a highly privileged application.  

The authorization server should take special care when enabling this grant type and only allow it when other flows are not viable.

This grant type is suitable for clients capable of obtaining the resource owner's credentials (username and password, typically using an interactive form).  It is also used to migrate existing clients using direct authentication schemes such as HTTP Basic or Digest authentication to OAuth by converting the stored credentials to an access token.

The user provides their service credentials (username and password) directly to the application, which uses the credentials to obtain an access token from the service.

     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          v
          |    Resource Owner
         (A) Password Credentials
          |
          v
     +---------+                                  +---------------+
     |         |>--(B)---- Resource Owner ------->|               |
     |         |         Password Credentials     | Authorization |
     | Client  |                                  |     Server    |
     |         |<--(C)---- Access Token ---------<|               |
     |         |    (w/ Optional Refresh Token)   |               |
     +---------+                                  +---------------+


After the user gives their credentials to the application, the application will then request an access token from the authorization server.

Authorization Request and Response
----------------------------------

The client obtains the credentials by some method. 
The client MUST discard the credentials once an access token has been obtained.

Access Token Request
--------------------

The client makes a request to the token endpoint by adding the following parameters:

grant_type: "password"

scope:

username: The resource owner username.

password: The resource owner password.

client_id:

Example URI: https://accounts.google.com/o/oauth2/auth?grant_type=password&username=johndoe&password=A3ddj3w&client_id= 1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com

Access Token Response
---------------------

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token.

access_token: The access token issued by the authorization server.

refresh_token: The refresh token issued by the authorization server.

token_type: The type of the token issued. Value is case insensitive.

expires_in: The lifetime in seconds of the access token.


{
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "example_parameter":"example_value"
     }

Client Credentials Grant
========================

The client credentials grant type provides an application a way to access its own service account. 

The client can request an access token using only its client credentials (or other supported means of authentication) when the client is requesting access to the protected resources under its control, or those of another resource owner that have been previously arranged with the authorization server.

The client credentials grant type MUST only be used by confidential
   clients.

     +---------+                                  +---------------+
     |         |                                  |               |
     |         |>--(A)- Client Authentication --->| Authorization |
     | Client  |                                  |     Server    |
     |         |<--(B)---- Access Token ---------<|               |
     |         |                                  |               |
     +---------+                                  +---------------+

Authorization Request and Response
----------------------------------

Since the client authentication is used as the authorization grant, no additional authorization request is needed.

Access Token Request
--------------------

The client makes a request to the token endpoint by adding the following parameters:

grant_type: "client_credentials"

scope:

Access Token Response
---------------------

If the access token request is valid and authorized, the authorization server issues an access token.

{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "token_type":"example",
  "expires_in":3600,
  "example_parameter":"example_value"
}


Using Implicit Grant with AngularJS
===================================

First, we have to add authentication redirection to the resource owner:

 angular.module('app')
   .controller('MainCtrl', function ($$scope) {
     $scope.login=function() {
     	var client_id="your client id";
     	var scope="email";
      	var redirect_uri="http://localhost:9000";
      	var response_type="token";
      	var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
      	"&response_type="+response_type;
     	window.location.replace(url);
    };
});

When the authentication is succesful, we have to add route configuration in order to get and parse the authentication token:

     angular
       .module('app', [
       ])
       .config(function ($routeProvider) {
         $routeProvider
           .when('/access_token=:accessToken', {
             template: '',
             controller: function ($location,$rootScope) {
               var hash = $location.path().substr(1);
                          var splitted = hash.split('&');
               var params = {};
 
           for (var i = 0; i < splitted.length; i++) {
             var param  = splitted[i].split('=');
             var key    = param[0];
             var value  = param[1];
             params[key] = value;
             $rootScope.accesstoken=params;
           }
           $location.path("/about");
         }
       })
     });
     
The redirect url will look like http://localhost:9000#access_token=….
