

- Always use [HTTPS](http://support.microsoft.com/kb/324069).
- Enable [requireSSL](https://docs.microsoft.com/en-us/dotnet/api/system.web.configuration.httpcookiessection.requiressl) on cookies and form elements and [HttpOnly](https://docs.microsoft.com/en-us/dotnet/api/system.web.configuration.httpcookiessection.httponlycookies) on cookies in the web.config.

- While viewstate isn't always appropriate for web development, using it can provide CSRF mitigation. To make the ViewState protect against CSRF attacks you need to set the [ViewStateUserKey](https://docs.microsoft.com/en-us/dotnet/api/system.web.ui.page.viewstateuserkey):

`protected override OnInit(EventArgs e) {     base.OnInit(e);     ViewStateUserKey = Session.SessionID; }`

If you don't use Viewstate, then look to the default master page of the ASP.NET Web Forms default template for a manual anti-CSRF token using a double-submit cookie.
```csharp
private const string AntiXsrfTokenKey = "__AntiXsrfToken"; private const string AntiXsrfUserNameKey = "__AntiXsrfUserName"; private string _antiXsrfTokenValue; protected void Page_Init(object sender, EventArgs e) {     // The code below helps to protect against XSRF attacks     var requestCookie = Request.Cookies[AntiXsrfTokenKey];     Guid requestCookieGuidValue;     if (requestCookie != null && Guid.TryParse(requestCookie.Value, out requestCookieGuidValue))     {        // Use the Anti-XSRF token from the cookie        _antiXsrfTokenValue = requestCookie.Value;        Page.ViewStateUserKey = _antiXsrfTokenValue;     }     else     {        // Generate a new Anti-XSRF token and save to the cookie        _antiXsrfTokenValue = Guid.NewGuid().ToString("N");        Page.ViewStateUserKey = _antiXsrfTokenValue;        var responseCookie = new HttpCookie(AntiXsrfTokenKey)        {           HttpOnly = true,           Value = _antiXsrfTokenValue        };        if (FormsAuthentication.RequireSSL && Request.IsSecureConnection)        {           responseCookie.Secure = true;        }        Response.Cookies.Set(responseCookie);     }     Page.PreLoad += master_Page_PreLoad; } protected void master_Page_PreLoad(object sender, EventArgs e) {     if (!IsPostBack)     {        // Set Anti-XSRF token        ViewState[AntiXsrfTokenKey] = Page.ViewStateUserKey;        ViewState[AntiXsrfUserNameKey] = Context.User.Identity.Name ?? String.Empty;     }     else     {        // Validate the Anti-XSRF token if ((string)ViewState[AntiXsrfTokenKey] != _antiXsrfTokenValue ||           (string)ViewState[AntiXsrfUserNameKey] != (Context.User.Identity.Name ?? String.Empty))        {           throw new InvalidOperationException("Validation of Anti-XSRF token failed.");        }     } }
```

- Consider [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) in IIS. See [here](https://support.microsoft.com/en-us/help/954002/how-to-add-a-custom-http-response-header-to-a-web-site-that-is-hosted) for the procedure.
- This is a recommended `web.config` setup that handles HSTS among other things.

`<?xml version="1.0" encoding="UTF-8"?>  <configuration>    <system.web>      <httpRuntime enableVersionHeader="false"/>    </system.web>    <system.webServer>      <security>        <requestFiltering removeServerHeader="true" />      </security>      <staticContent>        <clientCache cacheControlCustom="public"             cacheControlMode="UseMaxAge"             cacheControlMaxAge="1.00:00:00"             setEtag="true" />      </staticContent>      <httpProtocol>        <customHeaders>          <add name="Content-Security-Policy"             value="default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'" />          <add name="X-Content-Type-Options" value="NOSNIFF" />          <add name="X-Frame-Options" value="DENY" />          <add name="X-Permitted-Cross-Domain-Policies" value="master-only"/>          <add name="X-XSS-Protection" value="0"/>          <remove name="X-Powered-By"/>        </customHeaders>      </httpProtocol>      <rewrite>        <rules>          <rule name="Redirect to https">            <match url="(.*)"/>            <conditions>              <add input="{HTTPS}" pattern="Off"/>              <add input="{REQUEST_METHOD}" pattern="^get$|^head$" />            </conditions>            <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent"/>          </rule>        </rules>        <outboundRules>          <rule name="Add HSTS Header" enabled="true">            <match serverVariable="RESPONSE_Strict_Transport_Security" pattern=".*" />            <conditions>              <add input="{HTTPS}" pattern="on" ignoreCase="true" />            </conditions>            <action type="Rewrite" value="max-age=15768000" />          </rule>        </outboundRules>      </rewrite>    </system.webServer>  </configuration>`
```

- Remove the version header by adding the following line in `Machine.config` file:

`<httpRuntime enableVersionHeader="false" />`

- Also remove the Server header using the HttpContext Class in your code.

`HttpContext.Current.Response.Headers.Remove("Server");`

### HTTP validation and encoding[¶](https://cheatsheetseries.owasp.org/cheatsheets/DotNet_Security_Cheat_Sheet.html#http-validation-and-encoding "Permanent link")

- Do not disable [validateRequest](https://www.asp.net/whitepapers/request-validation) in the `web.config` or the page setup. This value enables limited XSS protection in ASP.NET and should be left intact as it provides partial prevention of Cross Site Scripting. Complete request validation is recommended in addition to the built-in protections.
- The 4.5 version of the .NET Frameworks includes the [AntiXssEncoder](https://docs.microsoft.com/en-us/dotnet/api/system.web.security.antixss.antixssencoder?view=netframework-4.7.2) library, which has a comprehensive input encoding library for the prevention of XSS. Use it.
- List allowable values anytime user input is accepted.
- Validate the URI format using [Uri.IsWellFormedUriString](https://docs.microsoft.com/en-us/dotnet/api/system.uri.iswellformeduristring).

### Forms authentication[¶](https://cheatsheetseries.owasp.org/cheatsheets/DotNet_Security_Cheat_Sheet.html#forms-authentication "Permanent link")

- Use cookies for persistence when possible. `Cookieless` auth will default to [UseDeviceProfile](https://docs.microsoft.com/en-us/dotnet/api/system.web.httpcookiemode?view=netframework-4.7.2).
- Don't trust the URI of the request for persistence of the session or authorization. It can be easily faked.
- Reduce the forms authentication timeout from the default of _20 minutes_ to the shortest period appropriate for your application. If [slidingExpiration](https://docs.microsoft.com/en-us/dotnet/api/system.web.security.formsauthentication.slidingexpiration?view=netframework-4.7.2) is used this timeout resets after each request, so active users won't be affected.
- If HTTPS is not used, [slidingExpiration](https://docs.microsoft.com/en-us/dotnet/api/system.web.security.formsauthentication.slidingexpiration?view=netframework-4.7.2) should be disabled. Consider disabling [slidingExpiration](https://docs.microsoft.com/en-us/dotnet/api/system.web.security.formsauthentication.slidingexpiration?view=netframework-4.7.2) even with HTTPS.
- Always implement proper access controls.
    - Compare user provided username with `User.Identity.Name`.
    - Check roles against `User.Identity.IsInRole`.
- Use the [ASP.NET Membership provider and role provider](https://docs.microsoft.com/en-us/dotnet/framework/wcf/samples/membership-and-role-provider), but review the password storage. The default storage hashes the password with a single iteration of SHA-1 which is rather weak. The ASP.NET MVC4 template uses [ASP.NET Identity](https://www.asp.net/identity/overview/getting-started/introduction-to-aspnet-identity) instead of ASP.NET Membership, and ASP.NET Identity uses PBKDF2 by default which is better. Review the OWASP [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) for more information.
- Explicitly authorize resource requests.
- Leverage role based authorization using `User.Identity.IsInRole`.