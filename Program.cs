using Microsoft.Playwright;
using CommandLine;


Parser.Default.ParseArguments<VoteOptions, PostOptions>(args)
    .WithParsed<VoteOptions>(opts => Vote(opts))
    .WithParsed<PostOptions>(opts => Post(opts))
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


Environment.Exit(0);


using var playwright = await Playwright.CreateAsync();

await using var browser = await playwright.Chromium.LaunchAsync(new()
{
    Headless = false
});

DnkClient dnkClient = await DnkClient.CreateAsync(browser);

await dnkClient.LogInAsync(AccountManager.GetAccount());

await Task.Delay(60_000);
