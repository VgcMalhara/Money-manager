import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Plus, Calendar as CalendarIcon,
    DollarSign, Tag, Wallet, FileText, Check
} from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function Create({ categories, accounts }: { categories: any[], accounts: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        account_id: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('transactions.store'));
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-white/10">
            <Head title="Add Transaction" />

            <div className="max-w-xl mx-auto p-6 lg:p-10">
                {/* --- Header --- */}
                <div className="flex items-center gap-4 mb-10">
                    <Link
                        href={route('transactions.index')}
                        className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
                    >
                        <ChevronLeft size={24} className="text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tighter italic uppercase">Add Record</h1>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">New Entry</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">

                    {/* --- Type Selector --- */}
                    <div className="grid grid-cols-2 p-1.5 bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] backdrop-blur-md shadow-inner">
                        <button
                            type="button"
                            onClick={() => setData('type', 'expense')}
                            className={cn(
                                "py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                                data.type === 'expense' ? "bg-zinc-800 text-white shadow-xl border border-zinc-700/50" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('type', 'income')}
                            className={cn(
                                "py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                                data.type === 'income' ? "bg-emerald-500/20 text-emerald-400 shadow-xl border border-emerald-500/30" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            Income
                        </button>
                    </div>

                    {/* --- Amount Card (Fixed Overlapping) --- */}
                    <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-[2rem] p-8 backdrop-blur-md">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block mb-4 ml-1">Total Amount</Label>
                        <div className="relative flex items-center">
                            <span className="text-4xl font-black text-zinc-700 mr-4 select-none">Rs.</span>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full bg-transparent border-none text-5xl font-black tracking-tighter focus:ring-0 p-0 placeholder:text-zinc-800 text-white"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                            />
                        </div>
                        {errors.amount && <p className="text-red-500 text-[10px] font-bold mt-4 uppercase tracking-wider italic">! {errors.amount}</p>}
                    </div>

                    {/* --- Inputs Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3 group">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Category</Label>
                            <select
                                className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 text-sm font-bold text-zinc-300 focus:border-zinc-600 transition-all outline-none appearance-none cursor-pointer"
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                            >
                                <option value="" className="bg-zinc-950">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id} className="bg-zinc-950">{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Account</Label>
                            <select
                                className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 text-sm font-bold text-zinc-300 focus:border-zinc-600 transition-all outline-none appearance-none cursor-pointer"
                                value={data.account_id}
                                onChange={e => setData('account_id', e.target.value)}
                            >
                                <option value="" className="bg-zinc-950">Select Account</option>
                                {accounts.map(acc => (
                                    <option key={acc.id} value={acc.id} className="bg-zinc-950">{acc.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Date</Label>
                            <input
                                type="date"
                                className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 text-sm font-bold text-zinc-300 focus:border-zinc-600 transition-all outline-none"
                                value={data.date}
                                onChange={e => setData('date', e.target.value)}
                                style={{ colorScheme: 'dark' }} // Date picker eka dark mode hadanna
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Reference (Optional)</Label>
                            <Input
                                placeholder="Note..."
                                className="h-14 bg-zinc-900/50 border-zinc-800 rounded-2xl px-4 text-sm font-bold text-zinc-300 focus-visible:ring-zinc-600 transition-all"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- Submit Button --- */}
                    <div className="pt-6">
                        <Button
                            disabled={processing}
                            className="w-full h-16 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-sm shadow-2xl shadow-white/5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <div className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check size={20} strokeWidth={3} />
                                    Confirm Transaction
                                </>
                            )}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
