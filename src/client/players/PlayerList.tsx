import { Button, Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, NamedIcon } from '@pterodactyl/sdk';
import type { Player } from '../api';
import PlayerHead from '../components/PlayerHead';
import PlayerBadges from './PlayerBadges';

export type Filter = 'all' | 'online' | 'banned' | 'whitelist' | 'operators' | 'banned-ips';

export const FILTERS: { id: Filter; label: string; test: (player: Player) => boolean }[] = [
    { id: 'all', label: 'All', test: () => true },
    { id: 'online', label: 'Online', test: (player) => player.online },
    { id: 'banned', label: 'Banned', test: (player) => player.banned },
    { id: 'whitelist', label: 'Whitelist', test: (player) => player.whitelisted },
    { id: 'operators', label: 'Operators', test: (player) => player.operator },
];

interface Props {
    filter: Filter;
    counts: Record<Filter, number>;
    onFilter: (filter: Filter) => void;
}

export function FilterChips({ filter, counts, onFilter }: Props) {
    const chips = [...FILTERS.map(({ id, label }) => ({ id, label })), { id: 'banned-ips' as const, label: 'Banned IPs' }];

    return (
        <div className='mc:grid mc:grid-cols-2 mc:gap-2'>
            {chips.map((chip) => {
                const Chip = chip.id === filter ? Button : Button.Text;

                return (
                    <Chip key={chip.id} size='small' aria-pressed={chip.id === filter} onClick={() => onFilter(chip.id)} className='mc:justify-start'>
                        {chip.label} ({counts[chip.id]})
                    </Chip>
                );
            })}
        </div>
    );
}

export function PlayerList({ players, selected, onSelect }: { players: Player[]; selected: string | null; onSelect: (player: Player) => void }) {
    if (players.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant='icon'>
                        <NamedIcon name='users' />
                    </EmptyMedia>
                    <EmptyTitle>No players found</EmptyTitle>
                    <EmptyDescription>Players show up here once they join or are added to a list.</EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <ul className='mc:grid mc:gap-2'>
            {players.map((player) => {
                const key = player.uuid ?? player.name;

                return (
                    <li key={key}>
                        <Button.Text
                            onClick={() => onSelect(player)}
                            aria-current={key === selected}
                            className={`mc:h-auto mc:w-full mc:justify-start mc:gap-3 mc:border mc:p-2 mc:text-left ${
                                key === selected ? 'mc:border-primary' : 'mc:border-transparent mc:hover:border-border'
                            }`}
                        >
                            <span className='mc:relative'>
                                <PlayerHead player={player} size={32} />
                                {player.online && <span className='mc:absolute mc:-right-0.5 mc:-bottom-0.5 mc:h-2.5 mc:w-2.5 mc:rounded-full mc:border-2 mc:border-card mc:bg-success' />}
                            </span>
                            <span className='mc:min-w-0'>
                                <span className='mc:block mc:truncate mc:text-sm mc:text-foreground'>{player.name}</span>
                                <PlayerBadges player={player} />
                            </span>
                        </Button.Text>
                    </li>
                );
            })}
        </ul>
    );
}
