using Microsoft.Playwright;
using CommandLine;


Parser.Default.ParseArguments<VoteOptions, PostOptions, EditOptions>(args)
    .WithParsed<VoteOptions>(opts => Vote(opts))
    .WithParsed<PostOptions>(opts => Post(opts))
    .WithParsed<EditOptions>(opts => Edit(opts))
    .WithNotParsed(HandleParseError);

static void HandleParseError(IEnumerable<Error> errs)
{
    if (errs.IsVersion())
    {
        Console.WriteLine("Version Request");
        return;
    }

    if (errs.IsHelp())
    {
        Console.WriteLine("Help Request");
        return;
    }

    Console.WriteLine("Parser Fail");
}

static void Vote(VoteOptions opts)
{
    Console.WriteLine("Voting...");
    Console.WriteLine($"Headless: {opts.Headless}");
    Console.WriteLine("Articles:");
    foreach (var article in opts.Articles)
    {
        Console.WriteLine(article);
    }
}

static void Post(PostOptions opts)
{
    Console.WriteLine("Posting...");
    Console.WriteLine($"Headless: {opts.Headless}");
    Console.WriteLine("Articles:");
    foreach (var article in opts.Articles)
    {
        Console.WriteLine(article);
    }
}

static void Edit(EditOptions opts)
{
    Console.WriteLine("Editing...");
    Console.WriteLine($"Headless: {opts.Headless}");
    Console.WriteLine("Articles:");
    foreach (var article in opts.Articles)
    {
        Console.WriteLine(article);
    }
}


/////////////////////


using var playwright = await Playwright.CreateAsync();

await using var browser = await playwright.Chromium.LaunchAsync(new()
{
    Headless = false
});

DnkClient dnkClient = await DnkClient.CreateAsync(browser);

await dnkClient.LogInAsync(AccountManager.GetAccount());

var uri = new Uri("https://www.dnevnik.bg/sviat/voinata_v_ukraina/2023/01/12/4437521_prestij_i_sol_zashto_rusiia_i_prigojin_shturmuvaha/comments");

await dnkClient.NavigateAsync(uri);

await dnkClient.GetCommentsAsync();

await Task.Delay(60_000);
