import { Head, useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Save } from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Account eke structure eka define karamu
interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
}

export default function Edit({ account }: { account: Account }) {
    // Form eka hadaddi thiyena account data default values widiyata denawa
    const { data, setData, patch, processing, errors } = useForm({
        name: account.name,
        type: account.type,
        balance: account.balance.toString(),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('accounts.update', account.id));
    };

    return (
        <>
            <Head title={`Edit Account - ${account.name}`} />

            <div className="max-w-2xl mx-auto p-6 w-full">
                {/* Back Link */}
                <Link
                    href={route('accounts.index')}
                    className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Accounts
                </Link>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight italic">Edit Account</h2>
                        <p className="text-muted-foreground text-sm">Update your account information below.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Account Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Account Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="e.g. Commercial Bank"
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                        </div>

                        {/* Account Type */}
                        <div className="grid gap-2">
                            <Label htmlFor="type">Account Type</Label>
                            <select
                                id="type"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                            >
                                <option value="Bank">Bank</option>
                                <option value="Cash">Cash</option>
                                <option value="Wallet">Wallet</option>
                                <option value="Card">Card</option>
                            </select>
                            {errors.type && <p className="text-destructive text-xs">{errors.type}</p>}
                        </div>

                        {/* Balance */}
                        <div className="grid gap-2">
                            <Label htmlFor="balance">Current Balance (Rs.)</Label>
                            <Input
                                id="balance"
                                type="number"
                                step="0.01"
                                value={data.balance}
                                onChange={e => setData('balance', e.target.value)}
                                placeholder="0.00"
                                className={errors.balance ? 'border-destructive' : ''}
                            />
                            {errors.balance && <p className="text-destructive text-xs">{errors.balance}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-2">
                            <Button className="flex-1" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Account'}
                            </Button>

                            <Link href={route('accounts.index')} className="flex-1">
                                <Button variant="outline" className="w-full" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// Layout Breadcrumbs
Edit.layout = {
    breadcrumbs: [
        { title: 'Accounts', href: '/accounts' },
        { title: 'Edit Account', href: '#' }
    ],
};
