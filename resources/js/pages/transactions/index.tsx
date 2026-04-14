import { Head, Link, useForm } from '@inertiajs/react';
import {
    Plus, Search, Trash2, Pencil, Tag, ShoppingCart, Utensils,
    Car, Wallet, Home, Briefcase, Zap, Gift, Coffee, Star,
    Smartphone, Plane, Dumbbell, Music, Filter, Eye // Added Eye icon
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Icon Mapping
const ICON_MAP: Record<string, any> = {
    'tag': Tag, 'shopping-cart': ShoppingCart, 'utensils': Utensils,
    'car': Car, 'wallet': Wallet, 'home': Home, 'briefcase': Briefcase,
    'zap': Zap, 'gift': Gift, 'coffee': Coffee, 'star': Star,
    'smartphone': Smartphone, 'plane': Plane, 'dumbbell': Dumbbell, 'music': Music,
};

export default function Index({ transactions }: { transactions: any[] }) {
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState('');

    const filtered = transactions.filter(t =>
        t.category?.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            <Head title="Activity" />

            <div className="max-w-5xl mx-auto p-6 lg:p-10">
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter italic uppercase text-white">Activity</h1>
                        <p className="text-sm text-zinc-500 font-medium mt-1">Manage and monitor your daily transactions</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Search..."
                                className="w-full bg-zinc-900/50 border-zinc-800 rounded-xl pl-10 h-11 text-sm focus:ring-zinc-700 focus:border-zinc-700"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-11 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl hidden sm:flex">
                            <Filter size={18} className="mr-2" /> Filter
                        </Button>
                        <Link href={route('transactions.create')}>
                            <Button className="h-11 bg-white text-black hover:bg-zinc-200 rounded-xl px-6 font-bold">
                                <Plus size={20} className="mr-2" /> Add New
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* --- Transactions Table/List --- */}
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] overflow-hidden backdrop-blur-sm shadow-2xl">
                    {filtered.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-800/50 bg-zinc-900/50">
                                        <th className="p-5 text-[11px] font-black uppercase tracking-widest text-zinc-500">Category</th>
                                        <th className="p-5 text-[11px] font-black uppercase tracking-widest text-zinc-500 hidden md:table-cell">Account</th>
                                        <th className="p-5 text-[11px] font-black uppercase tracking-widest text-zinc-500">Date</th>
                                        <th className="p-5 text-[11px] font-black uppercase tracking-widest text-zinc-500 text-right">Amount</th>
                                        <th className="p-5 text-[11px] font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/30">
                                    {filtered.map((t) => {
                                        const IconComponent = ICON_MAP[t.category?.icon] || Tag;

                                        return (
                                            <tr key={t.id} className="group hover:bg-zinc-800/20 transition-colors">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg"
                                                            style={{ backgroundColor: t.category?.color || '#27272a' }}
                                                        >
                                                            <IconComponent size={18} />
                                                        </div>
                                                        <span className="font-bold text-sm tracking-tight">{t.category?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-5 hidden md:table-cell">
                                                    <span className="text-sm text-zinc-400 font-medium bg-zinc-800/50 px-3 py-1 rounded-lg">
                                                        {t.account?.name}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-sm text-zinc-500 font-medium">
                                                    {new Date(t.date).toLocaleDateString('en-GB')}
                                                </td>
                                                <td className="p-5 text-right font-black tracking-tighter">
                                                    <span className={t.type === 'income' ? 'text-emerald-400' : 'text-white'}>
                                                        {t.type === 'income' ? '+' : '-'} {Number(t.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-right">
                                                    <div className="flex items-center justify-end gap-1 md:gap-2">
                                                        {/* View Details Button */}
                                                        <Link
                                                            href={route('transactions.show', t.id)}
                                                            className="p-2.5 hover:bg-zinc-800 rounded-xl text-zinc-500 hover:text-emerald-400 transition-all active:scale-90"
                                                            title="View"
                                                        >
                                                            <Eye size={18} />
                                                        </Link>

                                                        {/* Edit Button */}
                                                        <Link
                                                            href={route('transactions.edit', t.id)}
                                                            className="p-2.5 hover:bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all active:scale-90"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => confirm('Are you sure you want to delete this?') && destroy(route('transactions.destroy', t.id))}
                                                            className="p-2.5 hover:bg-red-950/30 rounded-xl text-zinc-500 hover:text-red-500 transition-all active:scale-90"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-32 text-center">
                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                <Search className="text-zinc-700" size={32} />
                            </div>
                            <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No transactions recorded</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page: any) => ({
    breadcrumbs: [{ title: 'Activity', href: '/transactions' }],
    children: page
});
