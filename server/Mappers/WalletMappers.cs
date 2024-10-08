using server.DTOs;
using server.Models;

namespace server.Mappers;

public static class WalletMappers
{
    public static Wallet ToItem(this WalletDTO walletDTO)
    {
        return new Wallet
        {
            Id = walletDTO.Id,
            Nickname = walletDTO.Nickname,
            Address = walletDTO.Address
        };
    }

    public static Wallet ToItemWithTracklistId(this WalletDTO walletDTO, int tracklistId)
    {
        return new Wallet
        {
            Id = walletDTO.Id,
            Nickname = walletDTO.Nickname,
            Address = walletDTO.Address,
            TracklistId = tracklistId
        };
    }

    public static WalletDTO ToDTO(this Wallet wallet)
    {
        return new WalletDTO
        {   
            Id = wallet.Id,
            Nickname = wallet.Nickname,
            Address = wallet.Address
        };
    }

    public static ICollection<WalletDTO> ToListDTO(this ICollection<Wallet> wallets)
    {
        return wallets.Select(w => w.ToDTO()).ToList();
    }
}