import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Landmark, Trash2, Eye, Pencil } from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function Index({ accounts }: { accounts: any[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this account?')) {
            destroy(route('accounts.destroy', id));
        }
    };

    return (
        <>
            <Head title="Accounts" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header Section: Mobile වලදීත් ලස්සනට පේන්න හදලා තියෙනවා */}
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-bold tracking-tight">My Accounts</h2>
                    <Link href={route('accounts.create')}>
                        <Button size="sm" className="h-9 px-3 sm:px-4">
                            <Plus className="sm:mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Add Account</span>
                        </Button>
                    </Link>
                </div>

                {/* Grid: Mobile වලදී 1 column, Tablets වලදී 2, Laptops වලදී 3 */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-5 bg-card flex flex-col justify-between aspect-video group sm:aspect-video aspect-auto min-h-[160px]"
                        >
                            {/* Top Section: Name & Icon */}
                            <div className="flex justify-between items-start z-10">
                                <div className="max-w-[80%]">
                                    <h3 className="font-semibold tracking-tight truncate">{account.name}</h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{account.type}</p>
                                </div>
                                <Landmark className="opacity-20 group-hover:opacity-40 transition-opacity shrink-0" size={24} />
                            </div>

                            {/* Middle Section: Balance */}
                            <div className="z-10 mt-4 sm:mt-2">
                                <p className="text-2xl font-bold tracking-tighter">
                                    Rs. {Number(account.balance).toLocaleString()}
                                </p>
                            </div>

                            {/* Bottom Section: Action Buttons */}
                            <div className="flex items-center justify-between gap-2 mt-5 z-10">
                                <div className="flex gap-2">
                                    <Link href={route('accounts.show', account.id)}>
                                        <Button variant="secondary" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={route('accounts.edit', account.id)}>
                                        <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(account.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <PlaceholderPattern className="absolute inset-0 -z-10 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {accounts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center px-4">
                        <Landmark size={48} className="mb-4 opacity-10" />
                        <p>No accounts found. Start by adding your first bank or cash account.</p>
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Accounts', href: '/accounts' }],
};
