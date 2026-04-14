import * as Icons from 'lucide-react';

interface IconProps {
    name: string;
    size?: number;
    className?: string;
}

export const Icon = ({ name, size = 20, className }: IconProps) => {
    // Database eke thiyena string eka PascalCase karanna (e.g., shopping-cart -> ShoppingCart)
    const pascalName = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('') as keyof typeof Icons;

    const LucideIcon = (Icons[pascalName] || Icons.Tag) as any;

    return <LucideIcon size={size} className={className} />;
};
