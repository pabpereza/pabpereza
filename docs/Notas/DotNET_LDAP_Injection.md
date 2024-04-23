
# DotNET LDAP Injection
Se podría producir inyecciones en LDAP si se construye una consulta LDAP a partir de una entrada de usuario sin validar. 

## Ejemplo de LDAP Injection

```csharp
using System.DirectoryServices;

public class LdapService
{
    private string ldapPath = "LDAP://your-ldap-url";

    public string GetUserEmail(string userName)
    {
        string email = string.Empty;
        userName = SanitizeLdapInput(userName);
        string ldapQuery = $"(sAMAccountName={userName})";
    
        using (var entry = new DirectoryEntry(ldapPath))
        {
            using (var searcher = new DirectorySearcher(entry))
            {
                searcher.Filter = ldapQuery;
            
                SearchResult result = searcher.FindOne();
                if (result != null)
                {
                    email = (string)result.Properties["mail"][0];
                }
            }
        }

        return email;
    }
}
```

En este caso, se podría inyectar código LDAP en el parámetro `userName`. Por ejemplo, se podría inyectar un `*` para que devuelva todos los usuarios.

```csharp
string userName = "*";
```
