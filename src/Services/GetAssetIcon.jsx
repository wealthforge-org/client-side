import { Coins } from "lucide-react";
import { CryptoIcons } from "../data/CryptoIcons";

export const getAssetIcon = (symbol) => {

    const asset = CryptoIcons.find(
        (c) => c.asset_symbol.toUpperCase() === symbol.toUpperCase()
    );

    if (asset) {
        return (
            <img
                src={asset.image}
                alt={asset.asset_symbol}
                className="h-6 w-6 object-contain"
            />
        );
    }

    return <Coins className="h-6 w-6 text-blue-500" />;
    
};