import { Head, Link, useForm } from '@inertiajs/react';
import {
    Plus, Tag, Pencil, Trash2, Eye, Search, ShoppingCart,
    Utensils, Car, Home, Briefcase, Zap, Gift,
    Coffee, Smartphone, Plane, Dumbbell, Music, Wallet, Star
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// 1. Database eke string ekata adala Icon Component eka mehen select wenawa
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

export default function Index({ categories }: { categories: any[] }) {
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('categories.destroy', id));
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">

                <div className="flex items-center justify-between px-2">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Categories</h2>
                        <p className="text-sm text-muted-foreground">Manage your income and expense categories.</p>
                    </div>
                    <Link href={route('categories.create')}>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">New Category</span>
                        </Button>
                    </Link>
                </div>

                <div className="relative max-w-sm px-2">
                    <Search className="absolute left-5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid gap-2 border rounded-xl bg-card overflow-hidden mx-2">
                    {filteredCategories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/50 transition-colors group"
                        >
                            <div className="flex items-center gap-4">

                                {/* 2. Mehi thama Dynamic Icon eka render wenne */}
                                <div
                                    className="p-2.5 rounded-lg text-white shadow-sm flex items-center justify-center"
                                    style={{ backgroundColor: category.color || '#6366f1' }}
                                >
                                    {(() => {
                                        // Category object eke 'icon' field eka check karanawa
                                        const IconComponent = ICON_MAP[category.icon] || Tag;

                                        return <IconComponent size={18} />;
                                    })()}
                                </div>

                                <div>
                                    <p className="font-medium leading-none">{category.name}</p>
                                    <p className={`text-[10px] mt-1 font-bold uppercase tracking-wider ${category.type === 'income' ? 'text-green-500' : 'text-red-400'}`}>
                                        {category.type}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <Link href={route('categories.show', category.id)}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={route('categories.edit', category.id)}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {filteredCategories.length === 0 && (
                        <div className="p-10 text-center text-muted-foreground">
                            {search ? 'No categories match your search.' : 'No categories found.'}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Categories', href: '/categories' }],
};
