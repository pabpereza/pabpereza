# 

[[x-frame-options]]


https://cheatsheetseries.owasp.org/cheatsheets/DotNet_Security_Cheat_Sheet.html#a3-sensitive-data-exposure

app.UseHsts(hsts => hsts.MaxAge(365).IncludeSubdomains()); app.UseXContentTypeOptions(); app.UseReferrerPolicy(opts => opts.NoReferrer()); app.UseXXssProtection(options => options.FilterDisabled()); app.UseXfo(options => options.Deny()); app.UseCsp(opts => opts .BlockAllMixedContent() .StyleSources(s => s.Self()) .StyleSources(s => s.UnsafeInline()) .FontSources(s => s.Self()) .FormActions(s => s.Self()) .FrameAncestors(s => s.Self()) .ImageSources(s => s.Self()) .ScriptSources(s => s.Self()) );