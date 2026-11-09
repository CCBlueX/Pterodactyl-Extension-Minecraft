import type { ReactNode } from 'react';

export default function SectionHeading({ children, first = false }: { children: ReactNode; first?: boolean }) {
    return <h3 className={`${first ? 'mc:mt-6' : 'mc:mt-8'} mc:mb-2 mc:font-header mc:text-sm mc:font-semibold mc:uppercase mc:tracking-wide mc:text-foreground`}>{children}</h3>;
}
