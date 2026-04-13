import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Pencil, Trash2, Tag, ShoppingCart,
    Utensils, Car, Wallet, Home, Briefcase, Zap,
    Gift, Coffee, Star, Smartphone, Plane, Dumbbell, Music
} from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Icon Map eka Database eke string eka Component ekakata harawanna
const ICON_MAP: Record<string, any> = {
    'tag': Tag,
    'shopping-cart': ShoppingCart,
    'utensils': Utensils,
    'car': Car,
    'wallet': Wallet,
    'home': Home,
    'briefcase': Briefcase,
    'zap': Zap,
    'gift': Gift,
    'coffee': Coffee,
    'star': Star,
    'smartphone': Smartphone,
    'plane': Plane,
    'dumbbell': Dumbbell,
    'music': Music,
};

export default function Show({ category }: { category: any }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('categories.destroy', category.id));
        }
    };

    const SelectedIcon = ICON_MAP[category.icon] || Tag;

    return (
        <>
            <Head title={`Category: ${category.name}`} />

            <div className="max-w-md mx-auto min-h-screen p-4 sm:p-6 pb-20">

                {/* Header with Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link href={route('categories.index')} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <div className="flex gap-2">
                        <Link href={route('categories.edit', category.id)}>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full text-destructive hover:bg-destructive/10"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-card rounded-[2.5rem] border shadow-sm overflow-hidden">
                    {/* Color Banner */}
                    <div
                        className="h-32 flex items-end justify-center pb-6"
                        style={{ backgroundColor: `${category.color}15` }}
                    >
                        <div
                            className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-lg translate-y-12"
                            style={{
                                backgroundColor: category.color,
                                boxShadow: `0 10px 25px -5px ${category.color}80`
                            }}
                        >
                            <SelectedIcon size={36} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="pt-16 pb-10 px-6 text-center">
                        <h1 className="text-2xl font-black tracking-tight">{category.name}</h1>
                        <div className={cn(
                            "inline-block mt-2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            category.type === 'income' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        )}>
                            {category.type}
                        </div>

                        {/* Stats Placeholder - Oyata Transaction summary ekak pennanna puluwan methana */}
                        <div className="grid grid-cols-2 gap-4 mt-10">
                            <div className="p-4 bg-muted/40 rounded-3xl">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Total Spent</p>
                                <p className="text-lg font-bold">LKR 0.00</p>
                            </div>
                            <div className="p-4 bg-muted/40 rounded-3xl">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Transactions</p>
                                <p className="text-lg font-bold">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent History Section Placeholder */}
                <div className="mt-8 space-y-4 px-2">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Recent Activity</h3>
                    <div className="p-8 border-2 border-dashed rounded-[2rem] text-center text-muted-foreground text-sm italic">
                        No transactions recorded in this category yet.
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Categories', href: '/categories' },
        { title: 'Details', href: '#' }
    ],
};
