public static class AccountManager
{
    private static int accountIndex = 0;

    private static Account[] accounts = {
        new Account("""tfvt~efmuu@start.bg""", """HO-=iV*G?(0f~&C]A*wfQ@e]"""),
        new Account("""nuq^eloe@gmail.com""", """/BZn"=a-k@`dSA~b:rm$%a!_""")
    };

    public static Account GetAccount() => accounts[accountIndex++];
}
