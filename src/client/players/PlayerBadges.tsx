import { Badge } from '@pterodactyl/sdk';
import type { Player } from '../api';

export default function PlayerBadges({ player }: { player: Player }) {
    return (
        <span className='mc:inline-flex mc:flex-wrap mc:gap-1'>
            {player.online && <Badge tone='success'>Online</Badge>}
            {player.operator && <Badge tone='warning'>OP</Badge>}
            {player.whitelisted && <Badge tone='info'>Whitelist</Badge>}
            {player.banned && <Badge tone='danger'>Banned</Badge>}
        </span>
    );
}
