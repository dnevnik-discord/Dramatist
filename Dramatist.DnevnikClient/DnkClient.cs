using Microsoft.Playwright;


// You cannot have async constructors.
// One alternative is to have async factory methods
public sealed class DnkClient
{
    private IBrowserContext context;

    private DnkClient() {}

    public static async Task<DnkClient> CreateAsync(IBrowser browser)
    {
        var result = new DnkClient();
        await result.InitializeAsync(browser);
        return result;
    }

    private async Task InitializeAsync(IBrowser browser)
    {
        context = await browser.NewContextAsync(new()
        {
            ServiceWorkers = ServiceWorkerPolicy.Block
        });

        await context.AddCookiesAsync(new Cookie[]
        {
            new()
            {
            Name = "cookiesAgreement",
            Value = "1",
            Domain = "www.dnevnik.bg",
            Path = "/"
            },
            new()
            {
                Name = "molang",
                Value = "OFF",
                Domain = "www.dnevnik.bg",
                Path = "/"
            }
        });

        await context.RouteAsync("**", async r =>
        {
            var url = r.Request.Url;
            var res = r.Request.ResourceType;

            if (
                url.Contains("onthe.io") ||
                url.Contains("facebook") ||
                url.Contains("fbcdn") || // correct?
                url.Contains("googletagservices") ||
                url.Contains("googleapis") ||
                url.Contains("googletagmanager") ||
                url.Contains("googletagmanager") ||
                url.Contains("googlesyndication") ||
                url.Contains("google-analytics") ||
                url.Contains("youtube") ||
                url.Contains("play.google") || //not needed?
                url.Contains("pagead") ||
                url.Contains("adservice") ||
                url.Contains("doubleclick") ||
                url.Contains("twitter") ||
                url.Contains("vbox") ||
                url.Contains("hotjar.com") ||
                url.Contains("cloudflare") ||
                url.Contains("gemius") ||
                url.Contains("sendpulse") ||
                url.Contains("onesignal") ||
                url.Contains("vbox")
                )
                await r.AbortAsync();

            else if (res == "font" || res == "image")
                await r.AbortAsync();

            else
                await r.ContinueAsync();
        });
    }

    public async Task LogInAsync(Account account)
    {
        var page = await context.NewPageAsync();

        await page.GotoAsync("https://www.dnevnik.bg/");

        await page.GetByRole(AriaRole.Link, new() { NameString = "Профил" }).ClickAsync();

        await page.GetByPlaceholder("E-mail").ClickAsync();

        await page.GetByPlaceholder("E-mail").FillAsync(account.Email);

        await page.GetByPlaceholder("Парола").ClickAsync();

        await page.GetByPlaceholder("Парола").FillAsync(account.Password);

        await page.GetByRole(AriaRole.Link, new() { NameString = "Вход" }).ClickAsync();
    }
}
