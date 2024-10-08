using server.Models;

namespace server.Services;

public interface IWalletServices
{
    ICollection<Wallet> GetAll(int tracklistId);

    Wallet GetById(int id);

    void Create(Wallet wallet);

    void Delete(int id);

    void Update(int id, Wallet wallet);

    bool Exists(int id);
}