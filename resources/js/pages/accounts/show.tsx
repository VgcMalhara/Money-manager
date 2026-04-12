import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Landmark, Wallet, History } from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
}

export default function Show({ account }: { account: Account }) {
    return (
        <>
            <Head title={`Account - ${account.name}`} />
            <div className="max-w-4xl mx-auto p-6 w-full">
                <Link href={route('accounts.index')} className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Accounts
                </Link>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Account Overview Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account Overview</CardTitle>
                            {account.type === 'Bank' ? <Landmark className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{account.name}</div>
                            <p className="text-xs text-muted-foreground uppercase mt-1">{account.type} Account</p>
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">Available Balance</p>
                                <p className="text-3xl font-bold tracking-tight">Rs. {Number(account.balance).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions / Stats Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Link href={route('accounts.edit', account.id)} className="w-full">
                                <Button variant="outline" className="w-full justify-start">
                                    Edit Account Details
                                </Button>
                            </Link>
                            <Button variant="secondary" className="w-full justify-start">
                                <History className="mr-2 h-4 w-4" /> View Transaction History
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Accounts', href: '/accounts' },
        { title: 'Details', href: '#' }
    ],
};
