import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Pencil, Trash2, Calendar,
    Wallet, Tag, FileText, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Show({ transaction }: { transaction: any }) {
    const { delete: destroy, processing } = useForm();

    const isIncome = transaction.type === 'income';

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this record? This will also revert the account balance.')) {
            destroy(route('transactions.destroy', transaction.id));
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-white/10">
            <Head title={`Details - ${transaction.category?.name}`} />

            <div className="max-w-xl mx-auto p-6 lg:p-10">

                {/* --- Header --- */}
                <div className="flex items-center justify-between mb-10">
                    <Link
                        href={route('transactions.index')}
                        className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
                    >
                        <ChevronLeft size={24} className="text-zinc-400" />
                    </Link>
                    <div className="flex gap-2">
                        <Link href={route('transactions.edit', transaction.id)}>
                            <Button variant="outline" className="h-11 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
                                <Pencil size={14} className="mr-2" /> Edit
                            </Button>
                        </Link>
                        <Button
                            disabled={processing}
                            onClick={handleDelete}
                            className="h-11 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl px-4 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            <Trash2 size={14} className="mr-2" /> Delete
                        </Button>
                    </div>
                </div>

                {/* --- Main Amount Card --- */}
                <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-[2.5rem] p-10 backdrop-blur-md text-center mb-8 relative overflow-hidden shadow-2xl">
                    {/* Background Glow Effect */}
                    <div className={cn(
                        "absolute -top-20 -left-20 w-40 h-40 blur-[100px] opacity-20 rounded-full",
                        isIncome ? "bg-emerald-500" : "bg-red-500"
                    )} />

                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Total Amount</p>
                    <h2 className={cn(
                        "text-6xl font-black tracking-tighter mb-4",
                        isIncome ? "text-emerald-400" : "text-white"
                    )}>
                        {isIncome ? '+' : '-'} {Number(transaction.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                    </h2>

                    <div className={cn(
                        "inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest",
                        isIncome ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                    )}>
                        {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                        {transaction.type}
                    </div>
                </div>

                {/* --- Detail Grid --- */}
                <div className="grid gap-4">

                    {/* Category */}
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-5 flex items-center justify-between group transition-all hover:bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400 shadow-lg">
                                <Tag size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</p>
                                <p className="font-bold text-zinc-200">{transaction.category?.name || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Account */}
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-5 flex items-center justify-between group transition-all hover:bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400 shadow-lg">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Source Account</p>
                                <p className="font-bold text-zinc-200">{transaction.account?.name || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-5 flex items-center justify-between group transition-all hover:bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400 shadow-lg">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Transaction Date</p>
                                <p className="font-bold text-zinc-200">
                                    {new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description / Note */}
                    {transaction.description && (
                        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6 transition-all hover:bg-zinc-900/50">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={14} className="text-zinc-500" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Reference Note</p>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-zinc-800 pl-4">
                                "{transaction.description}"
                            </p>
                        </div>
                    )}

                </div>

                {/* Bottom Timestamp Info */}
                <div className="mt-10 text-center">
                    <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
                        Recorded on {new Date(transaction.created_at).toLocaleString()}
                    </p>
                </div>

            </div>
        </div>
    );
}
