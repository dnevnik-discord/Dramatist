using CommandLine;


[Verb("vote", isDefault: true, HelpText = "Vote comments.")]
class VoteOptions
{
    [Option(shortName: 'a', longName: "article", Required = true,
    HelpText = "Articles' comments page Uri", SetName = "vote")]
    public IEnumerable<string> Articles { get; set; }

    [Option(shortName: 'x', longName: "headless", Required = false,
    HelpText = "Run headdless.", Default = false)]
    public bool Headless { get; set; }
}


[Verb("post", HelpText = "Post comments.")]
class PostOptions
{
    [Option(shortName: 'a', longName: "article", Required = true,
    HelpText = "Articles' comments page Uri", SetName = "vote")]
    public IEnumerable<string> Articles { get; set; }

    [Option(shortName: 'x', longName: "headless", Required = false,
    HelpText = "Run headdless.", Default = false)]
    public bool Headless { get; set; }
}
