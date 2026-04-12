import { Head, useForm, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'Bank',
        balance: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('accounts.store'));
    };

    return (
        <>
            <Head title="Add Account" />
            <div className="max-w-2xl mx-auto p-6 w-full">
                <Link href={route('accounts.index')} className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Accounts
                </Link>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold italic tracking-tight">Create New Account</h2>
                        <p className="text-muted-foreground">Add a bank account, wallet or cash to track.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Account Name</Label>
                            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="e.g. HNB Savings" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Account Type</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                            >
                                <option value="Bank">Bank</option>
                                <option value="Cash">Cash</option>
                                <option value="Wallet">Wallet</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="balance">Initial Balance</Label>
                            <Input id="balance" type="number" value={data.balance} onChange={e => setData('balance', e.target.value)} placeholder="0.00" />
                        </div>

                        <Button className="w-full" disabled={processing}>Save Account</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Accounts', href: '/accounts' },
        { title: 'Add New', href: '/accounts/create' }
    ],
};
