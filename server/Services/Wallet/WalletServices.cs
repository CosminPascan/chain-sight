using server.Data;
using server.Models;

namespace server.Services;

public class WalletServices : IWalletServices
{
    private readonly AppDbContext _context;

    public WalletServices(AppDbContext context)
    {
        _context = context;
    }

    public ICollection<Wallet> GetAll(int tracklistId)
    {
        var wallets = _context.Wallets
            .Where(w => w.TracklistId == tracklistId)
            .ToList();

        return wallets;
    }

    public Wallet GetById(int id)
    {
        var wallet = _context.Wallets.FirstOrDefault(w => w.Id == id);

        return wallet;
    }

    public void Create(Wallet wallet)
    {
        _context.Wallets.Add(wallet);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var wallet = _context.Wallets.First(w => w.Id == id);

        _context.Wallets.Remove(wallet);

        _context.SaveChanges();
    }

    public void Update(int id, Wallet newWallet)
    {
        var wallet = _context.Wallets.First(w => w.Id == id);

        wallet.Nickname = newWallet.Nickname;
        wallet.Address = newWallet.Address;

        _context.SaveChanges();
    }

    public bool Exists(int id)
    {
        return _context.Wallets.Any(w => w.Id == id);
    }
}